import { PageHeader } from '@/components/app/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Warehouse } from 'lucide-react';

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        title="Inventory Management"
        description="Track stock levels and manage inventory across branches."
      />
      <Card className="flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
        <CardHeader>
          <div className="mx-auto bg-muted p-4 rounded-full">
            <Warehouse className="w-12 h-12 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">Inventory System Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section is under construction. Soon you'll be able to manage
            stock, set reorder points, and track inventory usage in real-time.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
