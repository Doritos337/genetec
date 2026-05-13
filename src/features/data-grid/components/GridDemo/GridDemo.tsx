import { useState, useMemo } from 'react';
import { TextInput, Select } from '@mantine/core';
import { DataGrid, type GridColumn } from 'components';
import { MOCK_RECORDS, type MockRecord } from 'mocks/gridData';
import { useSorting } from '../../hooks/useSorting';
import { useFiltering } from '../../hooks/useFiltering';
import { GridControls } from './GridControls';
import styles from './GridDemo.module.css';

const PAGE_SIZES = [10, 20, 50];
const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Quality Assurance', 'Infrastructure'];
const COLUMN_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Name' },
  { value: 'role', label: 'Role' },
  { value: 'department', label: 'Department' },
];

export const GridDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleColumnIds, setVisibleColumnIds] = useState<string[]>([
    'id',
    'name',
    'role',
    'department',
  ]);

  const { filteredRecords, filters, handleFilterChange, clearFilters } = useFiltering(MOCK_RECORDS);
  const { sortedRecords, sortState, handleSort } = useSorting(filteredRecords);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const paginatedRecords = useMemo(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    return sortedRecords.slice(from, to);
  }, [sortedRecords, page, pageSize]);

  const onFilterApply = (accessor: string, value: string) => {
    handleFilterChange(accessor, value);
    setPage(1);
  };

  const columns = useMemo<GridColumn<MockRecord>[]>(
    () => [
      {
        accessor: 'id',
        label: 'ID',
        sortable: true,
        hidden: !visibleColumnIds.includes('id'),
      },
      {
        accessor: 'name',
        label: 'Name',
        sortable: true,
        hidden: !visibleColumnIds.includes('name'),
        filtering: Boolean(filters.name),
        filter: (
          <TextInput
            label="Filter by name"
            placeholder="Search..."
            size="sm"
            value={filters.name || ''}
            onChange={(e) => onFilterApply('name', e.currentTarget.value)}
          />
        ),
      },
      {
        accessor: 'role',
        label: 'Role',
        sortable: true,
        hidden: !visibleColumnIds.includes('role'),
      },
      {
        accessor: 'department',
        label: 'Department',
        sortable: true,
        hidden: !visibleColumnIds.includes('department'),
        filtering: Boolean(filters.department),
        filter: (
          <Select
            label="Filter by department"
            placeholder="All departments"
            size="sm"
            data={DEPARTMENTS}
            value={filters.department || null}
            onChange={(value) => onFilterApply('department', value || '')}
            clearable
          />
        ),
      },
    ],
    [filters, visibleColumnIds],
  );

  const activeSortStatus =
    sortState.columnAccessor && sortState.direction !== 'unsorted'
      ? {
          columnAccessor: sortState.columnAccessor as string,
          direction: sortState.direction,
        }
      : null;

  return (
    <div className={styles.container}>
      <GridControls
        setIsLoading={setIsLoading}
        error={error}
        setError={setError}
        visibleColumnIds={visibleColumnIds}
        setVisibleColumnIds={setVisibleColumnIds}
        isFiltered={Object.values(filters).some(Boolean)}
        clearFilters={clearFilters}
        columnOptions={COLUMN_OPTIONS}
      />

      <DataGrid
        records={error ? [] : paginatedRecords}
        columns={columns}
        isLoading={isLoading}
        error={error}
        onRetry={() => setError(null)}
        totalRecords={error ? 0 : sortedRecords.length}
        page={page}
        recordsPerPage={pageSize}
        recordsPerPageOptions={PAGE_SIZES}
        onPageChange={setPage}
        onRecordsPerPageChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        sortStatus={activeSortStatus}
        onSortStatusChange={(status) => handleSort(status.columnAccessor as keyof MockRecord)}
      />
    </div>
  );
};
