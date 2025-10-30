import { PageHeader } from '@/components/app/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck } from 'lucide-react';

export default function AuditPage() {
  return (
    <>
      <PageHeader
        title="Monthly Audit"
        description="Review monthly performance and compliance across all branches."
      />
      <Card className="flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
        <CardHeader>
          <div className="mx-auto bg-muted p-4 rounded-full">
            <ClipboardCheck className="w-12 h-12 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">Audit Features Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section is under construction. You will soon be able to
            conduct and review monthly audits for all your branches right here.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
