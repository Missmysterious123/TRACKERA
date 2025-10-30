import { PageHeader } from '@/components/app/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export default function BranchesPage() {
  return (
    <>
      <PageHeader
        title="Branches"
        description="Manage your restaurant's branches here."
      />
      <Card className="flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
        <CardHeader>
          <div className="mx-auto bg-muted p-4 rounded-full">
            <Building2 className="w-12 h-12 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">Branch Management Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section is under construction. Soon you'll be able to add,
            edit, and view details for all your branches.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
