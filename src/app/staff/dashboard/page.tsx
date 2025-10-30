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
import { cn } from '@/lib/utils';
import { menuItems as simpleMenu, MenuItem } from '@/lib/data';

type OrderItem = {
  item: MenuItem;
  quantity: number;
};

type TableOrder = {
  [tableNumber: string]: OrderItem[];
};

const tables = Array.from({ length: 10 }, (_, i) => i + 1);
const GST_RATE = 0.05;

export default function StaffDashboard() {
  const [selectedTable, setSelectedTable] = useState<number>(1);
  const [orders, setOrders] = useState<TableOrder>({});

  // Load orders from LocalStorage on initial render
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('tableOrders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error("Failed to parse orders from LocalStorage", error);
    }
  }, []);

  // Save orders to LocalStorage whenever they change
  useEffect(() => {
    if (Object.keys(orders).length > 0) {
      localStorage.setItem('tableOrders', JSON.stringify(orders));
    } else {
      localStorage.removeItem('tableOrders');
    }
  }, [orders]);
  
  const currentOrderItems = orders[selectedTable] || [];

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    setOrders((prevOrders) => {
      const currentTableOrder = prevOrders[selectedTable] || [];
      let updatedItems;

      if (newQuantity <= 0) {
        updatedItems = currentTableOrder.filter((oi) => oi.item.id !== itemId);
      } else {
         const existingItem = currentTableOrder.find((oi) => oi.item.id === itemId);
         if (existingItem) {
            updatedItems = currentTableOrder.map((oi) =>
                oi.item.id === itemId ? { ...oi, quantity: newQuantity } : oi
            );
         } else {
            const itemToAdd = simpleMenu.find(item => item.id === itemId);
            if(itemToAdd) {
              updatedItems = [...currentTableOrder, { item: itemToAdd, quantity: 1}];
            } else {
              updatedItems = currentTableOrder;
            }
         }
      }
      
      const newOrders = { ...prevOrders, [selectedTable]: updatedItems };
      if (updatedItems.length === 0) {
        delete newOrders[selectedTable];
      }

      return newOrders;
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
    setOrders(prevOrders => {
      const newOrders = {...prevOrders};
      delete newOrders[selectedTable];
      return newOrders;
    });
  };

  return (
    <>
      <PageHeader
        title="POS Dashboard"
        description="Select a table to manage or create an order."
      />
      <div className="mb-6">
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
            <Card>
                <CardHeader>
                    <CardTitle>Menu</CardTitle>
                    <CardDescription>Click to add items to the order for Table {selectedTable}.</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {simpleMenu.map((item) => (
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
                                      onClick={() => handleUpdateQuantity(item.id, (currentOrderItems.find(oi => oi.item.id === item.id)?.quantity || 0) - 1)}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="flex-1 text-center font-bold">{currentOrderItems.find(oi => oi.item.id === item.id)?.quantity || 0}</span>
                                     <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleUpdateQuantity(item.id, (currentOrderItems.find(oi => oi.item.id === item.id)?.quantity || 1))}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>
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
                            onClick={() => handleUpdateQuantity(item.id, 0)}
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
                    <Button size="lg" className="w-full" onClick={() => alert('Order Paid!')}>
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
    </>
  );
}
