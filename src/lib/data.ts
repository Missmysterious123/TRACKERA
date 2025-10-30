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
  category: 'Starters' | 'Main Course' | 'Breads' | 'Desserts' | 'Beverages';
};

export const menuItems: MenuItem[] = [
  // Starters
  { id: 'starter-1', name: 'Masala Papad', price: 50, category: 'Starters' },
  { id: 'starter-2', name: 'Papad', price: 30, category: 'Starters' },

  // Main Course
  { id: 'main-1', name: 'Akha Masur (Garlic)', price: 180, category: 'Main Course' },
  { id: 'main-2', name: 'Akha Masur (Jeera)', price: 180, category: 'Main Course' },
  { id: 'main-3', name: 'Akha Masur (Green Chilli)', price: 180, category: 'Main Course' },

  // Breads
  { id: 'bread-1', name: 'Roti', price: 20, category: 'Breads' },
  { id: 'bread-2', name: 'Chapati', price: 15, category: 'Breads' },
  { id: 'bread-3', name: 'Tandoori Roti', price: 25, category: 'Breads' },

  // Desserts
  { id: 'dessert-1', name: 'Gulab Jamun', price: 60, category: 'Desserts' },

  // Beverages
  { id: 'bev-1', name: 'Water Bottle', price: 20, category: 'Beverages' },
  { id: 'bev-2', name: 'Sprite', price: 40, category: 'Beverages' },
  { id: 'bev-3', name: 'Coca-Cola', price: 40, category: 'Beverages' },
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
  { id: 'STF004', name: 'Sunita Sharma', branchId: 'kolhapur' },
  { id: 'STF005', name: 'Vijay Verma', branchId: 'katraj' },
  { id: 'STF006', name: 'Geeta Yadav', branchId: 'wai' },
  { id: 'STF007', name: 'Sanjay Reddy', branchId: 'shirwal' },
  { id: 'STF008', name: 'Meena Desai', branchId: 'islampur' },
  { id: 'STF009', name: 'Rajesh Mishra', branchId: 'wagholi' },
  { id: 'STF010', name: 'Kavita Chavan', branchId: 'vidyanagar' },
  { id: 'STF011', name: 'Anil More', branchId: 'satara' },
  { id: 'STF012', name: 'Deepika Joshi', branchId: 'karad' },
  { id: 'STF013', name: 'Manoj Tiwari', branchId: 'kolhapur' },
  { id: 'STF014', name: 'Pooja Agarwal', branchId: 'katraj' },
  { id: 'STF015', name: 'Arun Gaikwad', branchId: 'wai' },
  { id: 'STF016', name: 'Neha Gupta', branchId: 'shirwal' },
  { id: 'STF017', name: 'Alok Nath', branchId: 'islampur' },
  { id: 'STF018', name: 'Sneha Patil', branchId: 'wagholi' },
  { id: 'STF019', name: 'Gopal Krishna', branchId: 'vidyanagar' },
  { id: 'STF020', name: 'Lata Mangeshkar', branchId: 'satara' },
  { id: 'STF021', name: 'Sachin Tendulkar', branchId: 'karad' },
  { id: 'STF022', name: 'Virat Kohli', branchId: 'kolhapur' },
  { id: 'STF023', name: 'Rohit Sharma', branchId: 'katraj' },
  { id: 'STF024', name: 'MS Dhoni', branchId: 'wai' },
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
