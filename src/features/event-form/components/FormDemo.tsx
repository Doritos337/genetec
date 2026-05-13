import { useState } from 'react';
import { Button } from 'ui';
import { EventForm, type EventFormValues } from 'components';
import { useEventsStore } from 'lib/store';
import { notify } from 'lib/notify';
import styles from './FormDemo.module.css';

const SAMPLE_EDIT_DATA: Partial<EventFormValues> = {
  title: 'Database Migration',
  description: 'Schema v2 applied to main cluster',
  category: 'warning',
};

const toSlug = (value: string) => value.toLowerCase().trim().replace(/\s+/g, '-');

export const FormDemo = () => {
  const [submittedData, setSubmittedData] = useState<EventFormValues | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const addEvent = useEventsStore((state) => state.addEvent);

  const handleSubmit = (values: EventFormValues) => {
    setSubmittedData(values);
    addEvent({
      title: values.title,
      name: toSlug(values.title),
      description: values.description,
      timestamp: values.timestamp,
      category: values.category,
      department: 'Quality Assurance',
      role: 'Manual Entry',
    });
    notify.success('Form submitted successfully.');
  };

  return (
    <div className={styles.demoWrapper}>
      <div className={styles.modeToggleGroup} role="tablist" aria-label="Form mode">
        <Button
          role="tab"
          aria-selected={!isEditingMode}
          variant={!isEditingMode ? 'filled' : 'light'}
          onClick={() => setIsEditingMode(false)}
        >
          Create Form
        </Button>
        <Button
          role="tab"
          aria-selected={isEditingMode}
          variant={isEditingMode ? 'filled' : 'light'}
          onClick={() => setIsEditingMode(true)}
        >
          Load Edit Form
        </Button>
      </div>

      <EventForm
        key={isEditingMode ? 'edit' : 'create'}
        initialValues={isEditingMode ? SAMPLE_EDIT_DATA : undefined}
        onSubmit={handleSubmit}
        onCancel={() => notify.info('Action canceled.')}
      />

      {submittedData && (
        <section
          className={styles.successRegion}
          role="status"
          aria-live="polite"
          aria-label="Last submitted form payload"
        >
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </section>
      )}
    </div>
  );
};
