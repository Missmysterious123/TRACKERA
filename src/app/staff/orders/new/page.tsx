'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import { Plus, Minus, Trash2, CheckCircle } from 'lucide-react';
import { menuItems, type MenuItem as MenuItemType } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const categories: MenuItemType['category'][] = [
  'Starters',
  'Main Course',
  'Breads',
  'Desserts',
  'Beverages',
];

type OrderItem = {
  item: MenuItemType;
  quantity: number;
};

export default function NewOrderPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [tableNumber, setTableNumber] = useState('');
  const { toast } = useToast();

  const handleAddItem = (item: MenuItemType) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((oi) => oi.item.id === item.id);
      if (existingItem) {
        return prevItems.map((oi) =>
          oi.item.id === item.id ? { ...oi, quantity: oi.quantity + 1 } : oi
        );
      }
      return [...prevItems, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setOrderItems((prevItems) => prevItems.filter((oi) => oi.item.id !== itemId));
    } else {
      setOrderItems((prevItems) =>
        prevItems.map((oi) =>
          oi.item.id === itemId ? { ...oi, quantity: newQuantity } : oi
        )
      );
    }
  };

  const total = orderItems.reduce(
    (acc, curr) => acc + curr.item.price * curr.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (orderItems.length === 0) {
      toast({
        title: 'Empty Order',
        description: 'Please add items to the order before placing.',
        variant: 'destructive',
      });
      return;
    }
    if (!tableNumber) {
        toast({
            title: 'No Table Number',
            description: 'Please enter a table number.',
            variant: 'destructive',
        });
        return;
    }
    toast({
      title: 'Order Placed!',
      description: `Order for table ${tableNumber} has been successfully placed.`,
      action: <CheckCircle className="text-green-500" />,
    });
    setOrderItems([]);
    setTableNumber('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <PageHeader
        title="Add New Order"
        description="Select items from the menu to build a new customer order."
      />
      <div className="flex-1 grid md:grid-cols-3 gap-8 overflow-hidden">
        <div className="md:col-span-2 flex flex-col overflow-hidden">
          <Tabs defaultValue="Starters" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 shrink-0">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollArea className="flex-1 mt-4">
              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {menuItems
                      .filter((item) => item.category === category)
                      .map((item) => {
                        const placeholder = PlaceHolderImages.find((p) => p.id === item.imageId);
                        return (
                          <Card
                            key={item.id}
                            className="flex items-center p-3 gap-4 cursor-pointer hover:bg-muted"
                            onClick={() => handleAddItem(item)}
                          >
                            {placeholder && (
                              <Image
                                src={placeholder.imageUrl}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="rounded-md object-cover h-16 w-16"
                                data-ai-hint={placeholder.imageHint}
                              />
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-primary font-bold">₹{item.price}</p>
                            </div>
                          </Card>
                        );
                      })}
                  </div>
                </TabsContent>
              ))}
            </ScrollArea>
          </Tabs>
        </div>

        <Card className="md:col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>Current Order</CardTitle>
            <CardDescription>Items added will appear here.</CardDescription>
            <div className="pt-4">
              <Label htmlFor="table-number">Table Number</Label>
              <Input 
                id="table-number"
                placeholder="e.g., 5"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>
          </CardHeader>
          <ScrollArea className="flex-1">
            <CardContent>
              {orderItems.length > 0 ? (
                <div className="space-y-4">
                  {orderItems.map(({ item, quantity }) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="w-16 text-right font-semibold">₹{(item.price * quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-10">
                  <p>No items in order.</p>
                </div>
              )}
            </CardContent>
          </ScrollArea>
          <CardFooter className="flex flex-col gap-4 mt-auto p-4 border-t">
            <div className="w-full flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <Separator />
            <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
