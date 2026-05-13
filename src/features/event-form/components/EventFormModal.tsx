import { Modal } from 'ui';
import { EventForm, type EventFormValues } from 'components';
import { useEventsStore } from 'lib/store';
import { notify } from 'lib/notify';

interface EventFormModalProps {
  opened: boolean;
  onClose: () => void;
}

const toSlug = (value: string) => value.toLowerCase().trim().replace(/\s+/g, '-');

export const EventFormModal = ({ opened, onClose }: EventFormModalProps) => {
  const addEvent = useEventsStore((state) => state.addEvent);

  const handleSubmit = (values: EventFormValues) => {
    addEvent({
      title: values.title,
      name: toSlug(values.title),
      description: values.description,
      timestamp: values.timestamp,
      category: values.category,
      department: 'Engineering',
      role: 'System Event',
    });

    notify.success(`"${values.title}" has been added to the timeline and grid.`, 'Event created');
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add New Event" size="lg" centered>
      <EventForm onSubmit={handleSubmit} onCancel={onClose} />
    </Modal>
  );
};
