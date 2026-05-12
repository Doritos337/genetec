import { Button } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { type ReactNode } from 'react';
import styles from './DataGrid.module.css';
import { type DataGridProps } from './DataGrid.types';

export const DataGrid = <T,>({
  records,
  columns,
  isLoading = false,
  error = null,
  onRetry,
  totalRecords,
  page,
  recordsPerPage,
  recordsPerPageOptions,
  onPageChange,
  onRecordsPerPageChange,
}: DataGridProps<T>): ReactNode => {
  const visibleColumns = columns
    .filter((col) => !col.hidden)
    .map((col) => ({
      accessor: col.accessor,
      title: col.label,
    }));

  if (error) {
    return (
      <div className={styles.stateWrapper}>
        <div className={styles.errorMessage}>{error}</div>
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </div>
    );
  }

  const paginationProps =
    page && recordsPerPage && onPageChange
      ? {
          totalRecords,
          page,
          recordsPerPage,
          recordsPerPageOptions,
          onPageChange,
          onRecordsPerPageChange,
        }
      : {};

  return (
    <DataTable
      withTableBorder
      withColumnBorders
      striped
      highlightOnHover
      borderRadius="sm"
      minHeight={records.length === 0 ? 200 : undefined}
      fetching={isLoading}
      records={records}
      columns={visibleColumns}
      noRecordsText="No records found"
      {...(paginationProps as any)}
    />
  );
};
