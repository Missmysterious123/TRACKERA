import Link from 'next/link';
import { PageHeader } from '@/components/app/page-header';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlusSquare, CalendarPlus, ListOrdered } from 'lucide-react';

const actions = [
  {
    title: 'Add Order',
    description: 'Create a new order for a customer.',
    icon: PlusSquare,
    href: '/staff/orders/new',
    color: 'text-primary',
  },
  {
    title: 'Book Table',
    description: 'Reserve a table for upcoming guests.',
    icon: CalendarPlus,
    href: '#', // Will trigger a dialog in a future implementation
    color: 'text-emerald-500',
  },
  {
    title: 'View Orders',
    description: 'See all active and recent orders.',
    icon: ListOrdered,
    href: '/staff/orders',
    color: 'text-amber-500',
  },
];

export default function StaffDashboard() {
  return (
    <>
      <PageHeader
        title="Staff Dashboard"
        description="Welcome! Select an action to get started."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action) => (
          <Link href={action.href} key={action.title}>
            <Card className="h-full flex flex-col justify-center items-center text-center p-6 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:border-primary">
              <action.icon className={`h-16 w-16 mb-4 ${action.color}`} />
              <CardHeader className="p-0">
                <CardTitle className="text-2xl font-headline">
                  {action.title}
                </CardTitle>
                <CardDescription className="mt-2">
                  {action.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
