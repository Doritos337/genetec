export interface MockRecord {
  id: string;
  name: string;
  role: string;
  department: string;
}

const ROLES = ['Software Engineer', 'Product Manager', 'UI/UX Designer', 'QA Engineer', 'DevOps'];
const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Quality Assurance', 'Infrastructure'];
const FIRST_NAMES = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace'];
const LAST_NAMES = ['Doe', 'Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore'];

export const generateMockRecords = (count: number): MockRecord[] => {
  return Array.from({ length: count }, (_, index) => {
    const id = String(index + 1);
    const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
    const lastName =
      LAST_NAMES[(index + Math.floor(index / FIRST_NAMES.length)) % LAST_NAMES.length];
    const role = ROLES[index % ROLES.length];
    const department = DEPARTMENTS[index % DEPARTMENTS.length];

    return {
      id,
      name: `${firstName} ${lastName}`,
      role,
      department,
    };
  });
};

export const MOCK_RECORDS = generateMockRecords(200);
