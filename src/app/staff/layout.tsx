import type { ReactNode } from 'react';
import { StaffHeader } from '@/components/app/staff-header';

export default function StaffLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StaffHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
