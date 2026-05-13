import { useState, useMemo } from 'react';

export interface FilterState {
  [key: string]: string;
}

export const useFiltering = <T>(initialRecords: T[], initialFilters: FilterState = {}) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleFilterChange = (columnAccessor: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnAccessor]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const filteredRecords = useMemo(() => {
    return initialRecords.filter((record) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) {
          return true;
        }

        const recordValue = record[key as keyof T];

        if (recordValue === undefined || recordValue === null) {
          return false;
        }

        return String(recordValue).toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [initialRecords, filters]);

  return {
    filteredRecords,
    filters,
    handleFilterChange,
    clearFilters,
  };
};
