import { useForm } from '@mantine/form';
import { Button, Paper, Select, TextInput, Title } from 'ui';
import styles from './EventForm.module.css';
import { type EventFormProps, type EventFormValues } from './EventForm.types';

const CATEGORY_OPTIONS = [
  { value: 'info', label: 'Info' },
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Error' },
];

const buildInitialValues = (initial?: Partial<EventFormValues>): EventFormValues => ({
  title: initial?.title ?? '',
  description: initial?.description ?? '',
  timestamp: initial?.timestamp ?? new Date().toISOString().slice(0, 16),
  category: initial?.category ?? 'info',
});

export const EventForm = ({ initialValues, onSubmit, onCancel, submitLabel }: EventFormProps) => {
  const isEditing = Boolean(initialValues);

  const form = useForm<EventFormValues>({
    initialValues: buildInitialValues(initialValues),
    validate: {
      title: (value) => (value.trim().length < 3 ? 'Title must be at least 3 characters' : null),
      description: (value) =>
        value.trim().length < 5 ? 'Description must be at least 5 characters' : null,
      timestamp: (value) => (!value ? 'Date and time are required' : null),
      category: (value) => (!value ? 'Category is required' : null),
    },
  });

  const handleError = (errors: typeof form.errors) => {
    const firstInvalidPath = Object.keys(errors)[0];
    if (!firstInvalidPath) return;

    const node = form.getInputNode(firstInvalidPath);
    node?.focus();
  };

  return (
    <Paper p="md" withBorder className={styles.formWrapper}>
      <Title order={4} mb="md">
        {isEditing ? 'Edit Event' : 'Create New Event'}
      </Title>

      <form onSubmit={form.onSubmit(onSubmit, handleError)} noValidate>
        <TextInput
          label="Event Title"
          placeholder="e.g. Server Restart"
          withAsterisk
          {...form.getInputProps('title')}
        />

        <TextInput
          label="Description"
          placeholder="Provide brief details..."
          withAsterisk
          mt="md"
          {...form.getInputProps('description')}
        />

        <TextInput
          type="datetime-local"
          label="Date & Time"
          withAsterisk
          mt="md"
          {...form.getInputProps('timestamp')}
        />

        <Select
          label="Category"
          data={CATEGORY_OPTIONS}
          withAsterisk
          mt="md"
          {...form.getInputProps('category')}
        />

        <div className={styles.buttonGroup}>
          {onCancel && (
            <Button variant="default" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="filled">
            {submitLabel ?? (isEditing ? 'Save Changes' : 'Create Event')}
          </Button>
        </div>
      </form>
    </Paper>
  );
};
