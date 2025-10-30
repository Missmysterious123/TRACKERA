import { PageHeader } from '@/components/app/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart } from 'lucide-react';

export default function RevenuePage() {
  return (
    <>
      <PageHeader
        title="Revenue Analytics"
        description="Detailed insights into your sales and revenue."
      />
      <Card className="flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
        <CardHeader>
          <div className="mx-auto bg-muted p-4 rounded-full">
            <AreaChart className="w-12 h-12 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">Advanced Analytics Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section is under construction. Soon you'll be able to see detailed
            revenue breakdowns, trend analysis, and performance reports.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
