import { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc' | 'unsorted';

export interface SortState<T> {
  columnAccessor: keyof T | null;
  direction: SortDirection;
}

export const useSorting = <T>(
  initialRecords: T[],
  initialState: SortState<T> = { columnAccessor: null, direction: 'unsorted' },
) => {
  const [sortState, setSortState] = useState<SortState<T>>(initialState);

  const handleSort = (accessor: keyof T) => {
    setSortState((prev) => {
      if (prev.columnAccessor !== accessor) {
        return { columnAccessor: accessor, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { columnAccessor: accessor, direction: 'desc' };
      }
      return { columnAccessor: null, direction: 'unsorted' };
    });
  };

  const sortedRecords = useMemo(() => {
    if (!sortState.columnAccessor || sortState.direction === 'unsorted') {
      return initialRecords;
    }

    const { columnAccessor, direction } = sortState;

    return [...initialRecords].sort((a, b) => {
      const valueA = a[columnAccessor];
      const valueB = b[columnAccessor];

      if (valueA === valueB) {
        return 0;
      }

      const comparison = String(valueA).localeCompare(String(valueB), undefined, {
        numeric: true,
        sensitivity: 'base',
      });

      return direction === 'asc' ? comparison : -comparison;
    });
  }, [initialRecords, sortState]);

  return {
    sortedRecords,
    sortState,
    handleSort,
  };
};
