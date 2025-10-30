'use client';

import { useState } from 'react';
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
import { orders as mockOrders, type Order } from '@/lib/data';

type OrderStatus = 'Active' | 'Served' | 'Cancelled';

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
  const [orders, setOrders] = useState<Order[]>(
    // @ts-ignore
    mockOrders.map(o => ({
      ...o,
      table_no: o.tableNumber,
      subtotal: o.total / 1.05, // Approximate subtotal
      gst_amount: o.total - (o.total / 1.05), // Approximate GST
    }))
  );

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const isLoading = false; // Mock loading state

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
                <TableHead>GST (INR)</TableHead>
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
                    <TableCell>INR {order.subtotal.toFixed(2)}</TableCell>
                    <TableCell>INR {order.gst_amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">
                      INR {order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status as OrderStatus)}>
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
