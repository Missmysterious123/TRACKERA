'use client';

import { PageHeader } from '@/components/app/page-header';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useCollection, useFirebase, updateDocumentNonBlocking } from '@/firebase';
import { useMemo } from 'react';
import { collection, doc, query, where } from 'firebase/firestore';

type OrderStatus = 'Active' | 'Served' | 'Cancelled';

interface Order {
  id: string;
  table_no: number;
  subtotal: number;
  gst_amount: number;
  total: number;
  status: OrderStatus;
}

const getStatusBadgeVariant = (
  status: OrderStatus
): 'default' | 'secondary' | 'destructive' => {
  switch (status) {
    case 'Served':
      return 'default';
    case 'Active':
      return 'secondary';
    case 'Cancelled':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export default function ViewOrdersPage() {
  const { firestore } = useFirebase();

  const ordersQuery = useMemo(() => {
    if (!firestore) return null;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    return query(collection(firestore, 'orders'), where('date', '>=', startOfDay));
  }, [firestore]);

  const { data: orders, isLoading } = useCollection<Order>(ordersQuery);

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    if (!firestore) return;
    const orderRef = doc(firestore, 'orders', orderId);
    updateDocumentNonBlocking(orderRef, { status });
  };

  return (
    <>
      <PageHeader
        title="Active Orders"
        description="A list of all orders from the current day."
      >
        <Button asChild>
          <Link href="/staff/dashboard">
            <PlusCircle className="mr-2 h-4 w-4" /> New Order
          </Link>
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Today's Orders</CardTitle>
          <CardDescription>
            Manage and track customer orders here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Table No</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>GST (₹)</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading orders...
                  </TableCell>
                </TableRow>
              )}
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className={cn(
                      order.status === 'Active' && 'bg-yellow-500/10'
                    )}
                  >
                    <TableCell className="font-medium">{order.table_no}</TableCell>
                    <TableCell>₹{order.subtotal.toFixed(2)}</TableCell>
                    <TableCell>₹{order.gst_amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleUpdateStatus(order.id, 'Served')}
                            >
                              ✅ Mark as Served
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleUpdateStatus(order.id, 'Cancelled')}
                            >
                              ❌ Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                !isLoading && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No active orders for today.
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
