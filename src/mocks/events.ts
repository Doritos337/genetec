import { type AppEvent, type EventCategory } from 'lib/store';

const FIRST_NAMES = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace'];
const LAST_NAMES = ['Doe', 'Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore'];
const ROLES = ['Software Engineer', 'Product Manager', 'UI/UX Designer', 'QA Engineer', 'DevOps'];
const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Quality Assurance', 'Infrastructure'];
const OPERATIONS = [
  'Access Logs Export',
  'Firmware Update',
  'Health Check',
  'Sensor Calibration',
  'Archive Backup',
];
const NODES = ['Zone-A', 'Main-Server', 'Entry-Point', 'Storage-Unit', 'Edge-Node'];
const CATEGORIES: EventCategory[] = ['info', 'success', 'warning', 'error'];

const HIGHLIGHTED_EVENTS: ReadonlyArray<Pick<AppEvent, 'title' | 'description' | 'category'>> = [
  {
    title: 'System Initialization',
    description: 'Core services and database connections established successfully.',
    category: 'info',
  },
  {
    title: 'Security Patch Applied',
    description: 'Critical vulnerability fix #4829 deployed to production servers.',
    category: 'success',
  },
  {
    title: 'High Memory Usage',
    description: 'Node cluster #3 reported memory consumption exceeding 85% capacity.',
    category: 'warning',
  },
  {
    title: 'API Gateway Failure',
    description: 'Upstream timeout encountered while routing requests to authentication service.',
    category: 'error',
  },
  {
    title: 'User Sync Completed',
    description: 'Batch synchronization of 4,500 active directories finalized.',
    category: 'success',
  },
];

const pick = <T>(list: readonly T[], index: number): T => list[index % list.length];

const buildTimestamp = (index: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - (index % 10));
  date.setHours(9 + (index % 8), index % 60, 0, 0);
  return date.toISOString();
};

const buildPerson = (index: number) => {
  const firstName = pick(FIRST_NAMES, index);
  const lastName = pick(LAST_NAMES, index + Math.floor(index / FIRST_NAMES.length));
  return {
    name: `${firstName} ${lastName}`,
    role: pick(ROLES, index),
    department: pick(DEPARTMENTS, index),
  };
};

export const generateMockEvents = (count: number): AppEvent[] => {
  return Array.from({ length: count }, (_, index) => {
    const person = buildPerson(index);
    const highlight = HIGHLIGHTED_EVENTS[index];

    if (highlight) {
      return {
        id: crypto.randomUUID(),
        title: highlight.title,
        description: highlight.description,
        category: highlight.category,
        timestamp: buildTimestamp(index),
        ...person,
      };
    }

    const operation = pick(OPERATIONS, index);
    const node = pick(NODES, index);

    return {
      id: crypto.randomUUID(),
      title: `${operation}: ${node}`,
      description: `System operation ${operation} performed by ${person.role} on ${node}.`,
      category: pick(CATEGORIES, index),
      timestamp: buildTimestamp(index),
      ...person,
    };
  });
};

export const INITIAL_EVENTS: AppEvent[] = generateMockEvents(180);
