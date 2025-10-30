'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/app/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Mock data for table statuses. In a real app, this would come from Firestore.
const tables = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  status:
    i % 4 === 1
      ? 'Active Order'
      : i % 4 === 2
      ? 'Served'
      : 'Available',
}));

export default function StaffDashboard() {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 border-green-500 text-green-800';
      case 'Active Order':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'Served':
        return 'bg-blue-100 border-blue-500 text-blue-800';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  const handleTableClick = (tableNumber: number) => {
    router.push(`/staff/orders/new?table=${tableNumber}`);
  };

  return (
    <>
      <PageHeader
        title="Table Summary"
        description="Select a table to start a new order or view an existing one."
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4">
        {tables.map((table) => (
          <Card
            key={table.id}
            className={cn(
              'flex flex-col items-center justify-center aspect-square cursor-pointer transition-transform hover:scale-105',
              getStatusColor(table.status)
            )}
            onClick={() => handleTableClick(table.id)}
          >
            <CardContent className="p-2 flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-bold">T{table.id}</p>
              <p className="text-xs mt-1">{table.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
