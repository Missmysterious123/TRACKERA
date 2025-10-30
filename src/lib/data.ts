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
  category: 'Starters' | 'Main Course' | 'Desserts' | 'Beverages';
  price: number;
  imageId: string;
};

export const menuItems: MenuItem[] = [
  { id: 's1', name: 'Paneer Tikka', category: 'Starters', price: 250, imageId: 'starter-1' },
  { id: 's2', name: 'Spring Rolls', category: 'Starters', price: 180, imageId: 'starter-2' },
  { id: 'm1', name: 'Dal Makhani', category: 'Main Course', price: 300, imageId: 'main-1' },
  { id: 'm2', name: 'Shahi Paneer', category: 'Main Course', price: 350, imageId: 'main-2' },
  { id: 'd1', name: 'Gulab Jamun', category: 'Desserts', price: 120, imageId: 'dessert-1' },
  { id: 'd2', name: 'Brownie', category: 'Desserts', price: 150, imageId: 'dessert-2' },
  { id: 'b1', name: 'Lime Soda', category: 'Beverages', price: 80, imageId: 'beverage-1' },
  { id: 'b2', name: 'Iced Tea', category: 'Beverages', price: 100, imageId: 'beverage-2' },
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

export type Order = {
  id: string;
  tableNumber: string;
  items: { menuItem: MenuItem; quantity: number }[];
  total: number;
  status: 'Pending' | 'Served' | 'Cancelled';
  timestamp: Date;
};

export const orders: Order[] = [
  {
    id: 'ORD001',
    tableNumber: '5',
    items: [
      { menuItem: menuItems[2], quantity: 2 },
      { menuItem: menuItems[3], quantity: 1 },
    ],
    total: 950,
    status: 'Pending',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: 'ORD002',
    tableNumber: '2',
    items: [
      { menuItem: menuItems[0], quantity: 1 },
      { menuItem: menuItems[6], quantity: 2 },
    ],
    total: 410,
    status: 'Served',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: 'ORD003',
    tableNumber: '8',
    items: [
      { menuItem: menuItems[4], quantity: 2 },
      { menuItem: menuItems[5], quantity: 1 },
    ],
    total: 390,
    status: 'Pending',
    timestamp: new Date(),
  },
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
