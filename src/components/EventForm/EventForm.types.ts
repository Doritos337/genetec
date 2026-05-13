import { type EventCategory } from 'components/Timeline/Timeline.types';

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
}
