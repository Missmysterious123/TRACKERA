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
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { menuItems as initialMenuItems, type MenuItem as MenuItemType } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const categories: MenuItemType['category'][] = [
  'Starters',
  'Main Course',
  'Breads',
  'Desserts',
  'Beverages',
];

function MenuItemCard({ item, onDelete }: { item: MenuItemType, onDelete: (id: string) => void }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-primary font-bold mt-2 text-xl">INR {item.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)}>
          <Trash2 className="h-4 w-4 text-destructive" />
          <span className="sr-only">Delete</span>
        </Button>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function MenuPage() {
  const [currentMenuItems, setCurrentMenuItems] = useState<MenuItemType[]>(initialMenuItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const initialNewItemState = {
    name: '',
    price: '',
    category: 'Starters' as MenuItemType['category'],
  };
  const [newItem, setNewItem] = useState(initialNewItemState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleCategoryChange = (value: MenuItemType['category']) => {
    setNewItem({ ...newItem, category: value });
  };

  const handleAddItem = () => {
    const { name, price, category } = newItem;
    if (!name.trim() || !price.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill out all fields.',
      });
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a valid price.',
      });
      return;
    }

    const newItemData: MenuItemType = {
      id: `item-${Date.now()}`,
      name,
      price: priceValue,
      category,
    };

    setCurrentMenuItems([...currentMenuItems, newItemData]);
    setIsDialogOpen(false);
    setNewItem(initialNewItemState); // Reset form
    toast({
      title: 'Success!',
      description: `"${name}" has been added to the menu.`,
    });
  };

  const handleDeleteItem = (id: string) => {
    setCurrentMenuItems(currentMenuItems.filter(item => item.id !== id));
    toast({
      title: 'Success!',
      description: 'Menu item has been deleted.',
    });
  };


  return (
    <>
      <PageHeader
        title="Menu Management"
        description="Add, update, and manage your restaurant's menu items."
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>
                Enter the details for the new item to add it to your menu.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="e.g., Veg Biryani"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price (INR)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={newItem.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="e.g., 250"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={newItem.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddItem}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>
      <Tabs defaultValue="Starters" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {currentMenuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItemCard key={item.id} item={item} onDelete={handleDeleteItem} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
