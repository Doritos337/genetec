export interface GridColumn<T> {
  accessor: Extract<keyof T, string>;
  label: string;
  hidden?: boolean;
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
}
