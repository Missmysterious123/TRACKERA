'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, KeyRound, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { branches } from '@/lib/data';

type LoginFormProps = {
  userType: 'manager' | 'staff';
  formAction: (
    payload: FormData
  ) => Promise<{ error: string } | undefined>;
};

function SubmitButton({ userType }: { userType: 'manager' | 'staff' }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Authenticating...
        </>
      ) : (
        `Login as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`
      )}
    </Button>
  );
}

export function LoginForm({ userType, formAction }: LoginFormProps) {
  const [state, action] = useFormState(formAction, undefined);
  const searchParams = useSearchParams();
  const branchId = searchParams.get('branch');
  const branchName =
    branches.find((b) => b.id === branchId)?.name || 'Unknown Branch';
  const title = `${userType.charAt(0).toUpperCase() + userType.slice(1)} Login`;
  const description = `Enter your ${userType} ID to access the dashboard for ${branchName}.`;

  return (
    <Card className="w-full max-w-sm">
      <form action={action}>
        <CardHeader>
          <CardTitle className="font-headline">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id-input">
              {userType.charAt(0).toUpperCase() + userType.slice(1)} ID
            </Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="id-input"
                name="id"
                required
                placeholder={`e.g., ${userType === 'manager' ? 'MGR01' : 'STF001'}`}
                className="pl-10"
              />
            </div>
          </div>
          {state?.error && (
            <Alert variant="destructive">
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <SubmitButton userType={userType} />
          <Button variant="link" size="sm" asChild className="text-muted-foreground">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to branch selection
            </Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
