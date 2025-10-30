'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/app/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, CircleDollarSign, NotebookPen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirebase, addDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';

interface MenuItem {
  name: string;
  price: number;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

type OrderItem = {
  item: MenuItem;
  quantity: number;
};

const GST_RATE = 0.05;

export default function NewOrderPage() {
  const searchParams = useSearchParams();
  const tableNumber = searchParams.get('table');
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const { toast } = useToast();
  const { firestore, user } = useFirebase();

  const menuCollectionRef = useMemoFirebase(
    () => firestore ? collection(firestore, 'menu') : null,
    [firestore]
  );
  
  const { data: menuCategories, isLoading: isMenuLoading } = useCollection<MenuCategory>(menuCollectionRef);

  const handleAddItem = (item: MenuItem) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((oi) => oi.item.name === item.name);
      if (existingItem) {
        return prevItems.map((oi) =>
          oi.item.name === item.name ? { ...oi, quantity: oi.quantity + 1 } : oi
        );
      }
      return [...prevItems, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemName: string, newQuantity: number) => {
    setOrderItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((oi) => oi.item.name !== itemName);
      }
      return prevItems.map((oi) =>
        oi.item.name === itemName ? { ...oi, quantity: newQuantity } : oi
      );
    });
  };
  
  const { subtotal, gstAmount, total } = useMemo(() => {
    const subtotal = orderItems.reduce(
      (acc, curr) => acc + curr.item.price * curr.quantity,
      0
    );
    const gstAmount = subtotal * GST_RATE;
    const total = subtotal + gstAmount;
    return { subtotal, gstAmount, total };
  }, [orderItems]);

  const handleConfirmOrder = () => {
    if (orderItems.length === 0) {
      toast({
        title: 'Empty Order',
        description: 'Please add items to the order before confirming.',
        variant: 'destructive',
      });
      return;
    }
    if (!firestore || !user || !tableNumber) return;

    const ordersCollectionRef = collection(firestore, 'orders');
    const newOrder = {
      table_no: parseInt(tableNumber, 10),
      staff_id: user.uid, // Assuming user.uid is the staff_id
      branch_id: "karad", // This should be dynamic based on staff's branch
      items: orderItems.map(oi => ({ item_name: oi.item.name, quantity: oi.quantity, price: oi.item.price })),
      subtotal,
      gst_rate: GST_RATE * 100,
      gst_amount: gstAmount,
      total,
      date: serverTimestamp(),
      status: "Active",
    };

    addDocumentNonBlocking(ordersCollectionRef, newOrder);

    toast({
      title: 'Order Confirmed!',
      description: `Order for Table ${tableNumber} has been placed.`,
    });

    setOrderItems([]);
  };
  
  if (!tableNumber) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Please select a table from the dashboard first.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <PageHeader
        title={`New Order for Table ${tableNumber}`}
        description="Browse the menu and add items to the order."
      />
      <div className="flex-1 grid lg:grid-cols-3 gap-8 overflow-hidden">
        <div className="lg:col-span-2 flex flex-col overflow-hidden">
          {isMenuLoading ? <p>Loading menu...</p> : (
            <Tabs defaultValue={menuCategories?.[0]?.id} className="w-full flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 shrink-0">
                  {menuCategories?.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
              </TabsList>
              <ScrollArea className="flex-1 mt-4">
                {menuCategories?.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-1">
                      {category.items.map((item) => (
                        <Card
                          key={item.name}
                          className="flex items-center p-3 gap-2"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-primary font-bold">INR {item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                             <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleUpdateQuantity(item.name, (orderItems.find(oi => oi.item.name === item.name)?.quantity || 0) - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-6 text-center">{orderItems.find(oi => oi.item.name === item.name)?.quantity || 0}</span>
                             <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleAddItem(item)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </ScrollArea>
            </Tabs>
          )}
        </div>

        <div className="lg:col-span-1 flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Table {tableNumber}</CardDescription>
              </CardHeader>
              <ScrollArea className="flex-1">
                <CardContent>
                  {orderItems.length > 0 ? (
                    <div className="space-y-4">
                      {orderItems.map(({ item, quantity }) => (
                        <div key={item.name} className="flex items-center gap-4">
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">INR {item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleUpdateQuantity(item.name, quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-6 text-center">{quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleUpdateQuantity(item.name, quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="w-20 text-right font-semibold">INR {(item.price * quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-10 flex flex-col items-center justify-center">
                      <NotebookPen className="w-16 h-16 text-gray-300 mb-4" />
                      <p>No items in order for Table {tableNumber}.</p>
                      <p className="text-sm">Add items from the menu.</p>
                    </div>
                  )}
                </CardContent>
              </ScrollArea>
              {orderItems.length > 0 && (
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
                  <Button size="lg" className="w-full" onClick={handleConfirmOrder}>
                    <CircleDollarSign className="mr-2 h-5 w-5"/> Confirm Order
                  </Button>
                </CardFooter>
              )}
            </Card>
        </div>
      </div>
    </div>
  );
}
