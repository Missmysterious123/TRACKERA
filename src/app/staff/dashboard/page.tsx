'use client';

import { useState, useEffect, useMemo } from 'react';
import { Plus, Minus, X, NotebookPen, CircleDollarSign, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PageHeader } from '@/components/app/page-header';
import { menuItems, MenuItem } from '@/lib/data';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

type OrderItem = {
  item: MenuItem;
  quantity: number;
};

type Order = {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: 'active' | 'completed';
  createdAt: number;
  completedAt?: number;
};

const tables = Array.from({ length: 10 }, (_, i) => i + 1);
const GST_RATE = 0.05;

const categories = [...new Set(menuItems.map(item => item.category))];

export default function StaffDashboard() {
  const [selectedTable, setSelectedTable] = useState<number>(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState('take-order');
  
  const currentOrderForTable = useMemo(() => {
    return orders.find(o => o.tableNumber === selectedTable && o.status === 'active');
  }, [orders, selectedTable]);
  
  const currentOrderItems = currentOrderForTable?.items || [];

  useEffect(() => {
    setIsClient(true);
    try {
      const savedOrders = localStorage.getItem('posOrders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error("Failed to parse orders from LocalStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('posOrders', JSON.stringify(orders));
    }
  }, [orders, isClient]);
  
  const handleUpdateQuantity = (itemId: string, change: number) => {
    setOrders((prevOrders) => {
      let orderToUpdate = prevOrders.find(o => o.tableNumber === selectedTable && o.status === 'active');
      let newOrders = [...prevOrders];
      
      if (!orderToUpdate) {
        orderToUpdate = {
          id: `${selectedTable}-${Date.now()}`,
          tableNumber: selectedTable,
          items: [],
          status: 'active',
          createdAt: Date.now(),
        };
        newOrders.push(orderToUpdate);
      }

      const existingItemIndex = orderToUpdate.items.findIndex((oi) => oi.item.id === itemId);
      let newQuantity = change;

      if (existingItemIndex > -1) {
        newQuantity = orderToUpdate.items[existingItemIndex].quantity + change;
      }
      
      let updatedItems;

      if (newQuantity <= 0) {
        updatedItems = orderToUpdate.items.filter((oi) => oi.item.id !== itemId);
      } else {
         if (existingItemIndex > -1) {
            updatedItems = orderToUpdate.items.map((oi) =>
                oi.item.id === itemId ? { ...oi, quantity: newQuantity } : oi
            );
         } else {
            const itemToAdd = menuItems.find(item => item.id === itemId);
            if(itemToAdd) {
              updatedItems = [...orderToUpdate.items, { item: itemToAdd, quantity: 1}];
            } else {
              updatedItems = orderToUpdate.items;
            }
         }
      }

      orderToUpdate.items = updatedItems;
      
      if(orderToUpdate.items.length === 0) {
        return prevOrders.filter(o => o.id !== orderToUpdate?.id);
      }

      return newOrders.map(o => o.id === orderToUpdate?.id ? orderToUpdate : o);
    });
  };
  
  const { subtotal, gstAmount, total } = useMemo(() => {
    const subtotal = currentOrderItems.reduce(
      (acc, curr) => acc + curr.item.price * curr.quantity,
      0
    );
    const gstAmount = subtotal * GST_RATE;
    const total = subtotal + gstAmount;
    return { subtotal, gstAmount, total };
  }, [currentOrderItems]);
  
  const handleResetBill = () => {
    setOrders(prevOrders => prevOrders.filter(o => o.id !== currentOrderForTable?.id));
  };

  const handlePayBill = () => {
    if(!currentOrderForTable) return;
    
    setOrders(prevOrders => prevOrders.map(o => 
      o.id === currentOrderForTable.id 
      ? { ...o, status: 'completed', completedAt: Date.now() } 
      : o
    ));
    alert(`Order for Table ${selectedTable} has been marked as complete! Total: INR ${total.toFixed(2)}`);
  };

  const activeOrders = useMemo(() => orders.filter(o => o.status === 'active'), [orders]);
  const completedOrders = useMemo(() => orders.filter(o => o.status === 'completed'), [orders]);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <>
      <PageHeader
        title="POS Dashboard"
        description="Manage table orders, active bills, and completed payments."
      />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="take-order">Take Order</TabsTrigger>
          <TabsTrigger value="active-orders">Active Orders</TabsTrigger>
          <TabsTrigger value="completed-orders">Completed Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="take-order">
            <div className="mb-6 pt-4">
              <h3 className="text-lg font-semibold mb-3">Select Table</h3>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {tables.map((table) => (
                  <Button
                    key={table}
                    variant={selectedTable === table ? 'default' : 'outline'}
                    className="aspect-square h-auto w-full text-lg"
                    onClick={() => setSelectedTable(table)}
                  >
                    {table}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                  <Tabs defaultValue={categories[0]} className="w-full">
                    <TabsList className={`grid w-full grid-cols-${categories.length}`}>
                      {categories.map((category) => (
                        <TabsTrigger key={category} value={category}>
                          {category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {categories.map((category) => (
                      <TabsContent key={category} value={category}>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                            {menuItems.filter(item => item.category === category).map((item) => {
                                const quantityInOrder = currentOrderItems.find(oi => oi.item.id === item.id)?.quantity || 0;
                                return (
                                  <Card key={item.id} className="flex flex-col">
                                      <CardHeader className="pb-2">
                                          <CardTitle className="text-xl">{item.name}</CardTitle>
                                          <CardDescription>INR {item.price.toFixed(2)}</CardDescription>
                                      </CardHeader>
                                      <CardFooter className="mt-auto">
                                          <div className="flex items-center gap-2 w-full">
                                              <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                                disabled={quantityInOrder === 0}
                                              >
                                                <Minus className="h-4 w-4" />
                                              </Button>
                                              <span className="flex-1 text-center font-bold">{quantityInOrder}</span>
                                               <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                              >
                                                <Plus className="h-4 w-4" />
                                              </Button>
                                          </div>
                                      </CardFooter>
                                  </Card>
                                )
                            })}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
              </div>

              <div className="lg:col-span-1">
                  <Card className="sticky top-20">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                      <CardDescription>Table {selectedTable}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {currentOrderItems.length > 0 ? (
                          <div className="space-y-4">
                            {currentOrderItems.map(({ item, quantity }) => (
                              <div key={item.id} className="flex items-center gap-4 text-sm">
                                <div className="flex-1">
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {quantity} &times; INR {item.price.toFixed(2)}
                                  </p>
                                </div>
                                <p className="w-20 text-right font-semibold">INR {(item.price * quantity).toFixed(2)}</p>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                  onClick={() => handleUpdateQuantity(item.id, -quantity)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center text-muted-foreground py-10 flex flex-col items-center justify-center">
                            <NotebookPen className="w-12 h-12 text-gray-300 mb-4" />
                            <p className="font-medium">No items in order.</p>
                            <p className="text-sm">Add items from the menu.</p>
                          </div>
                        )}
                    </CardContent>
                    {currentOrderItems.length > 0 && (
                      <CardFooter className="flex flex-col gap-2 mt-auto p-4 border-t">
                        <div className="w-full flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>INR {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="w-full flex justify-between text-sm text-muted-foreground">
                          <span>GST (5%)</span>
                          <span>INR {gstAmount.toFixed(2)}</span>
                        </div>
                        <Separator className="my-1"/>
                        <div className="w-full flex justify-between font-bold text-lg">
                          <span>Total Amount</span>
                          <span>INR {total.toFixed(2)}</span>
                        </div>
                        <Separator className="my-1" />
                        <div className="grid grid-cols-2 gap-2 w-full">
                          <Button size="lg" className="w-full" onClick={handlePayBill}>
                            <CircleDollarSign className="mr-2 h-5 w-5"/> Pay Bill
                          </Button>
                          <Button size="lg" variant="destructive" className="w-full" onClick={handleResetBill}>
                            <Trash2 className="mr-2 h-5 w-5"/> Reset
                          </Button>
                        </div>
                      </CardFooter>
                    )}
                  </Card>
              </div>
            </div>
        </TabsContent>
        <TabsContent value="active-orders">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
              <CardDescription>Orders that are currently being served.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeOrders.length > 0 ? (
                    activeOrders.map(order => {
                      const total = order.items.reduce((acc, {item, quantity}) => acc + item.price * quantity, 0) * (1 + GST_RATE);
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-bold">{order.tableNumber}</TableCell>
                          <TableCell>INR {total.toFixed(2)}</TableCell>
                          <TableCell>{order.items.reduce((acc, i) => acc + i.quantity, 0)}</TableCell>
                          <TableCell><Badge variant="outline" className="text-amber-500 border-amber-500">Active</Badge></TableCell>
                          <TableCell>{format(order.createdAt, 'p')}</TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-24">No active orders.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed-orders">
           <Card className="mt-4">
            <CardHeader>
              <CardTitle>Completed Orders</CardTitle>
              <CardDescription>Orders that have been paid and completed today.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Completed At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedOrders.length > 0 ? (
                    completedOrders.map(order => {
                      const total = order.items.reduce((acc, {item, quantity}) => acc + item.price * quantity, 0) * (1 + GST_RATE);
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-bold">{order.tableNumber}</TableCell>
                          <TableCell>INR {total.toFixed(2)}</TableCell>
                          <TableCell>{order.items.reduce((acc, i) => acc + i.quantity, 0)}</TableCell>
                          <TableCell><Badge variant="outline" className="text-emerald-500 border-emerald-500">Completed</Badge></TableCell>
                          <TableCell>{order.completedAt ? format(order.completedAt, 'p') : '-'}</TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                     <TableRow>
                      <TableCell colSpan={5} className="text-center h-24">No completed orders yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
