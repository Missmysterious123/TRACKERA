import { Suspense } from 'react';
import { LoginForm } from '@/components/app/login-form';
import { authenticateStaff } from '@/lib/actions';

function StaffLoginForm() {
  return (
    <LoginForm
      userType="staff"
      formAction={authenticateStaff}
    />
  );
}

export default function StaffLoginPage() {
  return (
    <Suspense>
      <StaffLoginForm />
    </Suspense>
  );
}
