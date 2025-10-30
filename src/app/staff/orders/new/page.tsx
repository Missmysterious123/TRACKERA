'use client';

import { useState } from 'react';
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
import { Plus, Minus, CheckCircle, CircleDollarSign, NotebookPen } from 'lucide-react';
import { menuItems, type MenuItem as MenuItemType } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

type TableOrder = {
  items: OrderItem[];
};

const GST_RATE = 0.05;
const tableCount = 10;
const tables = Array.from({ length: tableCount }, (_, i) => `Table ${i + 1}`);

export default function NewOrderPage() {
  const [orders, setOrders] = useState<Record<string, TableOrder>>({});
  const [activeTable, setActiveTable] = useState<string>(tables[0]);
  const { toast } = useToast();

  const getOrderForTable = (table: string) => {
    return orders[table] || { items: [] };
  };

  const updateOrderForTable = (table: string, order: TableOrder) => {
    setOrders((prevOrders) => ({
      ...prevOrders,
      [table]: order,
    }));
  };

  const handleAddItem = (item: MenuItemType) => {
    const tableOrder = getOrderForTable(activeTable);
    const existingItem = tableOrder.items.find((oi) => oi.item.id === item.id);

    let newItems;
    if (existingItem) {
      newItems = tableOrder.items.map((oi) =>
        oi.item.id === item.id ? { ...oi, quantity: oi.quantity + 1 } : oi
      );
    } else {
      newItems = [...tableOrder.items, { item, quantity: 1 }];
    }
    updateOrderForTable(activeTable, { items: newItems });
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    const tableOrder = getOrderForTable(activeTable);
    let newItems;
    if (newQuantity <= 0) {
      newItems = tableOrder.items.filter((oi) => oi.item.id !== itemId);
    } else {
      newItems = tableOrder.items.map((oi) =>
        oi.item.id === itemId ? { ...oi, quantity: newQuantity } : oi
      );
    }
    updateOrderForTable(activeTable, { items: newItems });
  };
  
  const calculateTotals = (orderItems: OrderItem[]) => {
    const subtotal = orderItems.reduce(
      (acc, curr) => acc + curr.item.price * curr.quantity,
      0
    );
    const gst = subtotal * GST_RATE;
    const total = subtotal + gst;
    return { subtotal, gst, total };
  };

  const handlePay = () => {
    const tableOrder = getOrderForTable(activeTable);
    if (tableOrder.items.length === 0) {
      toast({
        title: 'Empty Order',
        description: 'Please add items to the order before paying.',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Payment Complete!',
      description: `Order for ${activeTable} has been paid and is now complete. The bill has been sent to the manager.`,
      action: <CheckCircle className="text-green-500" />,
    });

    // Reset order for the paid table
    updateOrderForTable(activeTable, { items: [] });
  };

  const currentOrder = getOrderForTable(activeTable);
  const { subtotal, gst, total } = calculateTotals(currentOrder.items);

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <PageHeader
        title="Add New Order"
        description="Select a table, browse the menu, and add items to the order."
      >
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Table:</span>
            <Select value={activeTable} onValueChange={setActiveTable}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select Table" />
              </SelectTrigger>
              <SelectContent>
                {tables.map(table => (
                  <SelectItem key={table} value={table}>{table}</SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
      </PageHeader>
      <div className="flex-1 grid lg:grid-cols-3 gap-8 overflow-hidden">
        <div className="lg:col-span-2 flex flex-col overflow-hidden">
          <Tabs defaultValue={categories[0]} className="w-full flex-1 flex flex-col">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-1">
                    {menuItems
                      .filter(item => item.category === category)
                      .map((item) => (
                        <Card
                          key={item.id}
                          className="flex flex-col p-3 gap-2 cursor-pointer hover:bg-muted transition-colors"
                          onClick={() => handleAddItem(item)}
                        >
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-primary font-bold mt-auto">INR {item.price}</p>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </ScrollArea>
          </Tabs>
        </div>

        <div className="lg:col-span-1 flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle>Current Order: {activeTable}</CardTitle>
                <CardDescription>Items added will appear here.</CardDescription>
              </CardHeader>
              <ScrollArea className="flex-1">
                <CardContent>
                  {currentOrder.items.length > 0 ? (
                    <div className="space-y-4">
                      {currentOrder.items.map(({ item, quantity }) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">INR {item.price.toFixed(2)}</p>
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
                          <p className="w-20 text-right font-semibold">INR {(item.price * quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-10 flex flex-col items-center justify-center">
                      <NotebookPen className="w-16 h-16 text-gray-300 mb-4" />
                      <p>No items in order for {activeTable}.</p>
                      <p className="text-sm">Click on menu items to add them.</p>
                    </div>
                  )}
                </CardContent>
              </ScrollArea>
              {currentOrder.items.length > 0 && (
                <CardFooter className="flex flex-col gap-2 mt-auto p-4 border-t">
                  <div className="w-full flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>INR {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="w-full flex justify-between text-sm text-muted-foreground">
                    <span>GST (5%)</span>
                    <span>INR {gst.toFixed(2)}</span>
                  </div>
                  <Separator className="my-1"/>
                  <div className="w-full flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>INR {total.toFixed(2)}</span>
                  </div>
                  <Separator className="my-1" />
                  <Button size="lg" className="w-full" onClick={handlePay}>
                    <CircleDollarSign className="mr-2 h-5 w-5"/> Pay Bill
                  </Button>
                </CardFooter>
              )}
            </Card>
        </div>
      </div>
    </div>
  );
}
