import { useState, useMemo } from 'react';
import { Button } from 'ui';
import { DataGrid, type GridColumn } from 'components';
import { MOCK_RECORDS, type MockRecord } from 'mocks/gridData';
import styles from './GridDemo.module.css';

const COLUMNS: GridColumn<MockRecord>[] = [
  { accessor: 'id', label: 'ID' },
  { accessor: 'name', label: 'Name' },
  { accessor: 'role', label: 'Role', hidden: false },
  { accessor: 'department', label: 'Department', hidden: false },
];

const PAGE_SIZES = [10, 20, 50];

export const GridDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const paginatedRecords = useMemo(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    return MOCK_RECORDS.slice(from, to);
  }, [page, pageSize]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <Button size="xs" onClick={() => setIsLoading((prev) => !prev)}>
          Toggle Loading
        </Button>
        <Button
          size="xs"
          color={error ? 'red' : 'gray'}
          onClick={() => setError(error ? null : 'Failed to load dataset.')}
        >
          Toggle Error
        </Button>
      </div>

      <DataGrid
        records={error ? [] : paginatedRecords}
        columns={COLUMNS}
        isLoading={isLoading}
        error={error}
        onRetry={() => setError(null)}
        totalRecords={error ? 0 : MOCK_RECORDS.length}
        page={page}
        recordsPerPage={pageSize}
        recordsPerPageOptions={PAGE_SIZES}
        onPageChange={setPage}
        onRecordsPerPageChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </div>
  );
};
