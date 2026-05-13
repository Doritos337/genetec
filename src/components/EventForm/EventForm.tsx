import { useForm } from '@mantine/form';
import { TextInput, Select, Button, Title, Paper } from 'ui';
import styles from './EventForm.module.css';
import { type EventFormProps, type EventFormValues } from './EventForm.types.ts';

const CATEGORY_OPTIONS = [
  { value: 'info', label: 'Info' },
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Error' },
];

export const EventForm = ({ initialValues, onSubmit, onCancel }: EventFormProps) => {
  const form = useForm<EventFormValues>({
    initialValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      timestamp: initialValues?.timestamp || new Date().toISOString().slice(0, 16),
      category: initialValues?.category || 'info',
    },
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
    if (firstInvalidPath) {
      const node = form.getInputNode(firstInvalidPath);
      if (node) {
        node.focus();
      }
    }
  };

  return (
    <Paper p="md" withBorder className={styles.formWrapper}>
      <Title order={4} mb="md">
        {initialValues ? 'Edit Event' : 'Create New Event'}
      </Title>

      <form onSubmit={form.onSubmit(onSubmit, handleError)}>
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
            Save Event
          </Button>
        </div>
      </form>
    </Paper>
  );
};
