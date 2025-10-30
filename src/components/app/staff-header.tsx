'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChefHat, LogOut, Clock, ListOrdered } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function StaffHeader() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    // Set initial time
    setTime(new Date().toLocaleTimeString());
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-card border-b">
      <div className="flex items-center gap-3">
        <Link href="/staff/dashboard" className="flex items-center gap-3">
          <ChefHat className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold font-headline text-foreground">
            Trackera — Staff Dashboard
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
          <Clock className="h-5 w-5" />
          <span className="font-mono text-lg">{time}</span>
        </div>
        <Button variant="outline" asChild>
           <Link href="/staff/orders">
            <ListOrdered className="mr-2 h-4 w-4" /> View Active Orders
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Link>
        </Button>
      </div>
    </header>
  );
}
