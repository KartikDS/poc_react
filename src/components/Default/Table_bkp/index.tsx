import Image from 'next/image';
import React, { memo, useCallback, useEffect, useReducer } from 'react';
import { Form, Table } from 'react-bootstrap';

import { useLoading, useRequest } from '@/components/App';
import { useContainerContext } from '@/Layout/Container/context';
import { KEYPAIR } from '@/types/interfaces';

import { initialState, reducer } from './reducer';

const Pagination = React.lazy(() => import('./Components/Pagination'));

interface column {
  dataField: string;
  text: string | JSX.Element;
  hidden?: boolean;
  sort?: boolean;
  value?: string;
  search?: boolean;
}
interface data {
  [field: string]: JSX.Element | JSX.Element[] | string | number | boolean;
}
interface Props {
  columns: Array<column>;
  data: Array<data>;
  api?: {
    model?: string;
    url: string;
    body?: {
      [key: string]: unknown;
    };
    isAPILoading?: (loading: boolean) => void;
  };
  title: string;
  placeholder?: string;
  page?: number;
  url?: string;
  loading?: boolean;
  pagination?: boolean;
  dataShowModal?: JSX.Element;
  search?: boolean;
  stopApiCall?: boolean;
  options?: {
    expandRow?: {
      renderer: () => JSX.Element;
    };
  };
}
interface RESPONSE_DATATABLE {
  [key: string]: unknown;
  result?: data[];
  total?: number | string;
  limit?: number | string;
  page?: number | string;
  pages?: number | string;
  skip?: number | string;
}
function Index(props: Props) {
  const { request, loading } = useRequest();
  const { dispatch: globalDispatch } = useContainerContext();
  const { SimpleLoader } = useLoading();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { columns, data } = props;

  const NoDataIndication = () => {
    const isLoading = loading?.[`${props?.api?.url}_LOADING`];
    return (
      <tr>
        <td className="text-center" colSpan={columns?.length || 1}>
          {isLoading === false ? 'No Data Found' : <SimpleLoader />}
        </td>
      </tr>
    );
  };

  const filterDatatable = useCallback(() => {
    const filterData = data;
    if (!props?.api?.url) {
      const start = state.currentPage * state.limit - state.limit;
      const end = start + state.limit;
      const paginatedData = filterData?.slice(start, end);
      return paginatedData;
    }
    return filterData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, state]);

  useEffect(() => {
    filterDatatable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDatatable]);

  const fetchAPIResult = useCallback(async () => {
    if (props?.api?.url) {
      // Don't call API is this params is true
      if (props?.stopApiCall) return;
      if (props?.loading) return;
      const payload = {
        page: state.currentPage,
        limit: state.limit,
        sort: state.sortBy,
        keyword: state.searchKeyword,
        pathname: props.api.url,
      } as KEYPAIR;

      if (state.searchKeyword) {
        payload['keyword'] = state.searchKeyword;
        payload['regex'] = state.searchRegex;
      }
      if (props?.api?.body) {
        payload['filter'] = props?.api?.body;
      }

      const { data: res } = (await request(props?.api?.url, payload)) as { data: RESPONSE_DATATABLE };

      if (res?.result && res.result !== undefined) {
        const total = Number(res?.total);
        const lastPage: number = +Math.ceil(total / state.limit);

        const paginationSize = 4;
        dispatch({
          type: 'SET_DATA',
          data: {
            ...state,
            endPage:
              state.endPage && state.endPage > 1
                ? state.endPage
                : (lastPage > paginationSize ? paginationSize : lastPage) || 1,
            totalSize: total,
            result: data,
          },
        });
        globalDispatch({
          [payload.pathname as string]: res,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.currentPage,
    state.limit,
    props?.loading,
    state.searchKeyword,
    state.sortBy,
    props?.stopApiCall,
    props?.api?.body,
  ]);

  const searchDatatable = useCallback((event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    let searchFields = columns;
    searchFields = searchFields
      .map(col => {
        if (col.dataField !== 'action' && !col.hidden && col.search !== false) {
          const regex = {
            [col.dataField]: { $regex: value, $options: 'sig' },
          };
          return regex;
        }
      })
      .filter(col => col !== undefined) as unknown as column[];
    dispatch({
      type: 'SET_DATA',
      data: {
        ...state,
        searchKeyword: value,
        searchRegex: (value ? searchFields : null) as any,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortBy = useCallback(
    (sortField: string) => {
      dispatch({
        type: 'SET_DATA',
        data: {
          ...state,
          sortBy: state.sortBy === sortField + '_desc' ? sortField + '_asc' : sortField + '_desc',
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.sortBy],
  );

  useEffect(() => {
    if (!props?.api?.url) {
      const lastPage = Math.ceil(data?.length / state.limit);
      const paginationSize = 4;
      dispatch({
        type: 'SET_DATA',
        data: {
          ...state,
          result: data,
          endPage: lastPage > paginationSize ? paginationSize : lastPage,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.searchKeyword) {
      const timer = setTimeout(() => {
        fetchAPIResult();
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    } else {
      if (!props.loading && props?.api?.url) {
        const timer = setTimeout(() => {
          fetchAPIResult();
        }, 500);

        return () => {
          clearTimeout(timer);
        };
      } else {
        fetchAPIResult();
      }
    }
  }, [fetchAPIResult, props?.api?.url, props.loading, state.searchKeyword]);

  useEffect(() => {
    if (props?.api?.isAPILoading) {
      props?.api?.isAPILoading(loading?.[`${props?.api?.url}_LOADING`] as boolean);
    }
  }, [loading, props?.api]);

  return (
    <div className="WhtBox mt10">
      <div className="TableTop">
        {props.search && (
          <div className="searchArea">
            <div className="searchInput">
              <Image alt="search" height={16} width={16} src="/assets/icons/search.svg" />{' '}
              <Form.Control type="text" onChange={searchDatatable} placeholder={props.placeholder} />
            </div>
          </div>
        )}
        <div className="TopAction">{props?.dataShowModal && props?.dataShowModal}</div>
      </div>
      <div className="table-responsive dataTable">
        <Table responsive hover>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th style={{ display: col.hidden ? 'none' : '' }} key={i}>
                  {col.text}
                  {typeof col.text === 'string' &&
                    col.dataField !== 'action' &&
                    (col?.sort === undefined || col?.sort === true) && (
                      <span role="button" onClick={() => sortBy(col.dataField)} style={{ marginLeft: '2px' }}>
                        <i
                          className={`fa fa-arrow-${state.sortBy === col.dataField + '_desc' ? 'down' : 'up'}`}
                          style={{ color: state.sortBy.includes(col.dataField) ? '#3299cc' : '#a6b1c2' }}
                        ></i>
                      </span>
                    )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length && !loading?.[`${props?.api?.url}_LOADING`] ? (
              filterDatatable().map((row: data, i: number) => (
                <tr key={i}>
                  {columns.map((col, j) => (
                    <td
                      data-label={typeof col.text === 'string' ? col.text : ''}
                      style={{ display: col.hidden ? 'none' : '', textAlign: 'left' }}
                      key={i + '_' + j}
                    >
                      {row[col.dataField]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <NoDataIndication />
            )}
          </tbody>
        </Table>
      </div>
      {(props?.pagination === undefined || props?.pagination) && (
        <Pagination records={data} state={state} dispatch={dispatch} onPageChange={filterDatatable} />
      )}
    </div>
  );
}

export default memo(Index);
