import { debounce } from 'lodash';
import Image from 'next/image';
import React, { memo, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import Table from 'react-bootstrap/Table';

import { useLoading, useRequest } from '@/components/App';
import CustomInput from '@/components/Default/FormControl/CustomInput';
import { useContainerContext } from '@/Layout/Container/context';
import { KEYPAIR } from '@/types/interfaces';
import { jsonToFormData } from '@/utils/helpers';

import FilterSection from './Components/filterSection';
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
  children?: React.ReactNode;
  exportApi?: string;
}
// interface RESPONSE_DATATABLE {
//   [key: string]: unknown;
//   result?: data[];
//   total?: number | string;
//   limit?: number | string;
//   page?: number | string;
//   pages?: number | string;
//   skip?: number | string;
// }
function Index({
  columns,
  data,
  pagination = true,
  search = true,
  children = null,
  placeholder = 'Search',
  exportApi,
  ...props
}: Props) {
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { dispatch: globalDispatch } = useContainerContext();
  const { SimpleLoader } = useLoading();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filterShow, setFilterShow] = useState<boolean>(false);

  const handleFilterModel = () => setFilterShow(perVal => !perVal);
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
        // payload['regex'] = state.searchRegex;
      }
      if (props?.api?.body) {
        payload['filter'] = props?.api?.body;
      }

      const formData = jsonToFormData(payload);
      const res = (await request(props?.api?.url, formData)) as unknown as any;
      if (res?.data) {
        const responseData = res.data;
        const total = Number(responseData?.total);
        const lastPage: number = +Math.ceil(total / state.limit);
        const paginationSize = 5;
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
          [payload.pathname as string]: responseData,
        });
        setFilterShow(false);
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

  const searchDatatable = debounce((event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    dispatch({
      type: 'SET_DATA',
      data: {
        ...state,
        searchKeyword: value,
      },
    });
    // searchRegex: (value ? searchFields : null) as any,
    // let searchFields = [...columns];
    // searchFields = searchFields
    //   .map(col => {
    //     if (col.dataField !== 'action' && !col.hidden && col.search !== false) {
    //       const regex = {
    //         [col.dataField]: { $regex: value, $options: 'sig' },
    //       };
    //       return regex;
    //     }
    //   })
    //   .filter(col => col !== undefined) as unknown as column[];
  }, 300);

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
    [state],
  );

  const filterDatatable = useMemo(() => {
    const filterData = [...data];

    if (!props?.api?.url) {
      const start = state.currentPage * state.limit - state.limit;
      const end = start + state.limit;
      const paginatedData = filterData?.slice(start, end);
      return paginatedData;
    }
    return filterData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, state]);

  const ExportData = useCallback(async () => {
    const payload = {
      page: state.currentPage,
      limit: state.limit,
      sort: state.sortBy,
      keyword: state.searchKeyword,
      pathname: exportApi,
    } as KEYPAIR;
    if (state.searchKeyword) {
      payload['keyword'] = state.searchKeyword;
      // payload['regex'] = state.searchRegex;
    }
    if (props?.api?.body) {
      payload['filter'] = props?.api?.body;
    }

    const res = await request(exportApi ?? '', payload);
    downloadCsv(res.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportApi, props?.api?.body, state]);

  const downloadCsv = (csvData: any) => {
    const blob = new Blob([csvData.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = csvData.title; // Set the desired filename
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAPIResult]);

  useEffect(() => {
    if (props?.api?.isAPILoading) {
      props?.api?.isAPILoading(loading?.[`${props?.api?.url}_LOADING`] as boolean);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading?.[`${props?.api?.url}_LOADING`]]);

  return (
    <div className="WhtBox mt10">
      <div className="hdSearchOuter">
        <h3></h3>
        {search || children || exportApi ? (
          <div className="searchHead justify-content-end">
            {search ? (
              <div className="searchFilter">
                <CustomInput icon="/assets/icons/search.svg" onChange={searchDatatable} placeholder={placeholder} />
              </div>
            ) : null}
            {exportApi ? (
              <button className="ms-2 export-btn" onClick={ExportData} disabled={!!loading?.[`${exportApi}_LOADING`]}>
                {loading?.[`${exportApi}_LOADING`] ? (
                  <ButtonLoader />
                ) : (
                  <Image alt="filter" src={'/assets/icons/export.svg'} width={30} height={30} />
                )}
              </button>
            ) : null}
            {children ? (
              <>
                <div>
                  <Image
                    alt="filter"
                    src={'/assets/icons/filter.svg'}
                    width={30}
                    height={30}
                    onClick={handleFilterModel}
                    role="button"
                  />
                </div>
                <FilterSection show={filterShow} handleClose={handleFilterModel}>
                  {children}
                </FilterSection>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="dataTable">
        <Table responsive hover>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th style={{ display: col.hidden ? 'none' : '' }} key={i}>
                  {typeof col.text === 'string' &&
                  col.dataField !== 'action' &&
                  (col?.sort === undefined || col?.sort === true) ? (
                    <span onClick={() => sortBy(col.dataField)} role="button">
                      {col.text}
                      <span role="button" style={{ marginLeft: '2px' }}>
                        <i
                          className={`fa fa-arrow-${state.sortBy === col.dataField + '_desc' ? 'down' : 'up'}`}
                          style={{ color: state.sortBy.includes(col.dataField) ? '#3299cc' : '#a6b1c2' }}
                        ></i>
                      </span>
                    </span>
                  ) : (
                    col.text
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length && !loading?.[`${props?.api?.url}_LOADING`] ? (
              filterDatatable.map((row: data, i: number) => (
                <tr key={i}>
                  {columns.map((col, j) => (
                    <td
                      data-label={typeof col.text === 'string' ? col.text : ''}
                      style={{ display: col.hidden ? 'none' : '' }}
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
      {pagination ? <Pagination records={data} state={state} dispatch={dispatch} /> : null}
    </div>
  );
}

export default memo(Index);
