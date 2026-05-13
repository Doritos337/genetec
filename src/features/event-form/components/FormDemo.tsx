import { useState } from 'react';
import { Button } from 'ui';
import { EventForm } from 'components/EventForm/EventForm.tsx';
import { type EventFormValues } from 'components/EventForm/EventForm.types.ts';
import styles from './FormDemo.module.css';

export const FormDemo = () => {
  const [submittedData, setSubmittedData] = useState<EventFormValues | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);

  const sampleEditData: Partial<EventFormValues> = {
    title: 'Database Migration',
    description: 'Schema v2 applied to main cluster',
    category: 'warning',
  };

  return (
    <div className={styles.demoWrapper}>
      <div className={styles.modeToggleGroup}>
        <Button
          variant={!isEditingMode ? 'filled' : 'light'}
          onClick={() => setIsEditingMode(false)}
        >
          Create Form
        </Button>
        <Button variant={isEditingMode ? 'filled' : 'light'} onClick={() => setIsEditingMode(true)}>
          Load Edit Form
        </Button>
      </div>

      <EventForm
        key={isEditingMode ? 'edit' : 'create'}
        initialValues={isEditingMode ? sampleEditData : undefined}
        onSubmit={(values) => {
          setSubmittedData(values);
          alert('Form submitted successfully!');
        }}
        onCancel={() => alert('Action canceled')}
      />

      {submittedData && (
        <pre className={styles.successRegion}>{JSON.stringify(submittedData, null, 2)}</pre>
      )}
    </div>
  );
};
