import type { ReactNode } from 'react';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
} from '@/components/ui/sidebar';
import { ManagerSidebar } from '@/components/app/manager-sidebar';

export default function ManagerLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <ManagerSidebar />
      <SidebarRail />
      <SidebarInset>
        <header className="flex items-center gap-2 p-4 border-b md:p-2">
          <SidebarTrigger className="md:hidden" />
          <h2 className="text-lg font-semibold font-headline">Manager Portal</h2>
        </header>
        <main className="flex-1 p-6 bg-background">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
