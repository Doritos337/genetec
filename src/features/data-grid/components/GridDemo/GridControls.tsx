import { Button, MultiSelect, Group } from 'ui';
import styles from './GridControls.module.css';

interface GridControlsProps {
  setIsLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
  error: string | null;
  setError: (value: string | null) => void;
  visibleColumnIds: string[];
  setVisibleColumnIds: (ids: string[]) => void;
  isFiltered: boolean;
  clearFilters: () => void;
  columnOptions: { value: string; label: string }[];
}

export const GridControls = ({
  setIsLoading,
  error,
  setError,
  visibleColumnIds,
  setVisibleColumnIds,
  isFiltered,
  clearFilters,
  columnOptions,
}: GridControlsProps) => {
  return (
    <div className={styles.controlsContainer}>
      <Group gap="xs">
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
      </Group>

      <Group gap="xs">
        <MultiSelect
          className={styles.columnSelector}
          size="xs"
          placeholder="Configure columns"
          data={columnOptions}
          value={visibleColumnIds}
          onChange={setVisibleColumnIds}
        />

        {isFiltered && (
          <Button size="xs" variant="light" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </Group>
    </div>
  );
};
