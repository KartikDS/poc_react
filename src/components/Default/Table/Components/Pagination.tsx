import React, { memo, useCallback, useMemo } from 'react';
import Pagination from 'react-responsive-pagination';

import LoadStatusList from '@/components/Default/LoadStatusList';
import styles from '@/styles/Components/Default/Pagination.module.scss';

interface data {
  [field: string]: JSX.Element | JSX.Element[] | string | number | boolean;
}
interface Props {
  state: Array<data> | any;
  records: data[];
  dispatch: any;
}
interface SizePerPageList {
  text: string;
  value: number;
}
interface PaginationOption {
  totalSize: number;
  paginationSize: number;
  showTotal: boolean;
  sizePerPage: number;
  hidePageListOnlyOnePage: boolean;
  sizePerPageList: SizePerPageList[];
}

// const range = (min: number, max: number): number[] => Array.from({ length: max - min + 1 }, (_, i) => min + i);

function Index(props: Props) {
  const { state, dispatch, records } = props;
  const sizePerPage = 5;
  const pagination_options: PaginationOption = {
    totalSize: state?.totalSize,
    paginationSize: 4,
    showTotal: true,
    sizePerPage: sizePerPage,
    hidePageListOnlyOnePage: true,
    sizePerPageList: [
      {
        text: '25',
        value: 25,
      },
      {
        text: '50',
        value: 50,
      },
      {
        text: '100',
        value: 100,
      },
    ],
  };
  const lastPage = useMemo(
    () => Math.ceil(state.totalSize ? state.totalSize / state.limit : state.result?.length / state.limit),
    [state],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onPageChange = useCallback(
    (page: number | string) => {
      dispatch({
        type: 'SET_DATA',
        data: {
          ...state,
          currentPage: page,
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, records],
  );

  const onChangeRecordPerPage = useCallback(
    (limit: number) => {
      dispatch({
        type: 'SET_DATA',
        data: {
          ...state,
          limit: limit,
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  );

  const calculatePagination = useMemo(() => {
    const start = (state.currentPage - 1) * state.limit + 1;
    const end = Math.min(state.currentPage * state.limit, state.totalSize);

    return `Showing ${start} to ${end} of ${state.totalSize} entries`;
  }, [state.currentPage, state.limit, state.totalSize]);

  if (!records.length) return <div></div>;
  else
    return (
      <div className="d-flex justify-content-between">
        <div>{calculatePagination}</div>
        <div className="ftPagging">
          <div>
            <Pagination
              maxWidth={100}
              onPageChange={onPageChange}
              total={lastPage ? lastPage : 1}
              current={state.currentPage}
            />
          </div>
          <div>
            {(state.totalSize || state.result) && (
              <LoadStatusList
                label={
                  <div className={styles.pageOptions}>
                    {state.limit} {'per page'}
                    <i className="fa fa-caret-down ms-2"></i>
                  </div>
                }
                position="absolute"
                items={pagination_options.sizePerPageList.map(mp => mp.text)}
                onItemClick={(limit: string) => onChangeRecordPerPage(+limit as number)}
              />
            )}
          </div>
        </div>
        <div style={{ height: 0, overflow: 'hidden' }}>Showing 0 to 0 of 0 entries</div>
      </div>
    );
}

export default memo(Index);
