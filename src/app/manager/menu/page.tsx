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
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { menuItems, type MenuItem as MenuItemType } from '@/lib/data';

const categories: MenuItemType['category'][] = [
  'Starters',
  'Main Course',
  'Breads',
  'Desserts',
  'Beverages',
];

function MenuItemCard({ item }: { item: MenuItemType }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-primary font-bold mt-2 text-xl">INR {item.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        <Button variant="ghost" size="icon">
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
  return (
    <>
      <PageHeader
        title="Menu Management"
        description="Add, update, and manage your restaurant's menu items."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
        </Button>
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
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
