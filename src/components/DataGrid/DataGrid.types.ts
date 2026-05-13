import { type ReactNode } from 'react';

export interface GridColumn<T> {
  accessor: Extract<keyof T, string>;
  label: string;
  hidden?: boolean;
  sortable?: boolean;
  filter?: ReactNode;
  filtering?: boolean;
}

export interface DataGridProps<T> {
  records: T[];
  columns: GridColumn<T>[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  totalRecords?: number;
  page?: number;
  recordsPerPage?: number;
  recordsPerPageOptions?: number[];
  onPageChange?: (page: number) => void;
  onRecordsPerPageChange?: (recordsPerPage: number) => void;
  sortStatus?: {
    columnAccessor: string;
    direction: 'asc' | 'desc';
  } | null;
  onSortStatusChange?: (status: { columnAccessor: string; direction: 'asc' | 'desc' }) => void;
}
