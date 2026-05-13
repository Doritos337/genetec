import { type EventCategory } from 'lib/store';

export interface EventFormValues {
  title: string;
  description: string;
  timestamp: string;
  category: EventCategory;
}

export interface EventFormProps {
  initialValues?: Partial<EventFormValues>;
  onSubmit: (values: EventFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
}
