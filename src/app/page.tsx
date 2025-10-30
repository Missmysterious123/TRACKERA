'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building, ChefHat, UserCog } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { branches } from '@/lib/data';

export default function Home() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0].id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="flex items-center gap-4 mb-8">
        <ChefHat className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold font-headline text-foreground">
          Trackera POS
        </h1>
      </div>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-center">
            Select your restaurant and branch to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="restaurant">Restaurant</Label>
            <Select defaultValue="shivraj">
              <SelectTrigger id="restaurant">
                <SelectValue placeholder="Select restaurant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shivraj">Shivraj Restaurant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="branch">Branch</Label>
            <Select
              value={selectedBranch}
              onValueChange={setSelectedBranch}
            >
              <SelectTrigger id="branch">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button asChild size="lg" className="w-full">
            <Link href={`/manager/login?branch=${selectedBranch}`}>
              <UserCog className="mr-2 h-5 w-5" /> Manager Login
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="w-full">
            <Link href={`/staff/login?branch=${selectedBranch}`}>
              <Building className="mr-2 h-5 w-5" /> Staff Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <p className="mt-8 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Trackera. All rights reserved.
      </p>
    </main>
  );
}
