import { type TimelineEventRecord } from '../components';

export const MOCK_TIMELINE_EVENTS: TimelineEventRecord[] = [
  {
    id: '1',
    title: 'System Initialization',
    description: 'Core services and database connections established successfully.',
    timestamp: '2026-05-12T08:00:00Z',
    category: 'info',
  },
  {
    id: '2',
    title: 'Security Patch Applied',
    description: 'Critical vulnerability fix #4829 deployed to production servers.',
    timestamp: '2026-05-12T14:30:00Z',
    category: 'success',
  },
  {
    id: '3',
    title: 'High Memory Usage',
    description: 'Node cluster #3 reported memory consumption exceeding 85% capacity.',
    timestamp: '2026-05-11T22:15:00Z',
    category: 'warning',
  },
  {
    id: '4',
    title: 'API Gateway Failure',
    description: 'Upstream timeout encountered while routing requests to authentication service.',
    timestamp: '2026-05-10T09:05:00Z',
    category: 'error',
  },
  {
    id: '5',
    title: 'User Sync Completed',
    description: 'Batch synchronization of 4,500 active directories finalized.',
    timestamp: '2026-05-10T16:20:00Z',
    category: 'success',
  },
];
