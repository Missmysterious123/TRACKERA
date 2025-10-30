
export const branches = [
  { id: 'satara', name: 'Satara' },
  { id: 'karad', name: 'Karad' },
  { id: 'kolhapur', name: 'Kolhapur' },
  { id: 'katraj', name: 'Katraj' },
  { id: 'wai', name: 'Wai' },
  { id: 'shirwal', name: 'Shirwal' },
  { id: 'islampur', name: 'Islampur' },
  { id: 'wagholi', name: 'Wagholi' },
  { id: 'vidyanagar', name: 'Vidyanagar' },
];

export type MenuItem = {
  id: string;
  name: string;
  price: number;
};

export const menuItems: MenuItem[] = [
  { id: 'item-1', name: 'Pizza', price: 200 },
  { id: 'item-2', name: 'Burger', price: 150 },
  { id: 'item-3', name: 'Pasta', price: 180 },
  { id: 'item-4', name: '3 Course Meal', price: 450 },
];

export const managers = [
  { id: 'MGR01', name: 'Suresh Gupta' },
  { id: 'MGR02', name: 'Anjali Sharma' },
];

export type StaffMember = {
  id: string;
  name: string;
  branchId: string;
};

export const staffMembers: StaffMember[] = [
  { id: 'STF001', name: 'Ramesh Kumar', branchId: 'satara' },
  { id: 'STF002', name: 'Priya Singh', branchId: 'satara' },
  { id: 'STF003', name: 'Amit Patel', branchId: 'karad' },
];

export const revenueData = [
  { date: 'Mon', revenue: 4000 },
  { date: 'Tue', revenue: 3000 },
  { date: 'Wed', revenue: 2000 },
  { date: 'Thu', revenue: 2780 },
  { date: 'Fri', revenue: 1890 },
  { date: 'Sat', revenue: 2390 },
  { date: 'Sun', revenue: 3490 },
];
