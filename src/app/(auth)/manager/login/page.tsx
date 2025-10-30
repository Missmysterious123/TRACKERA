import { Suspense } from 'react';
import { LoginForm } from '@/components/app/login-form';
import { authenticateManager } from '@/lib/actions';

function ManagerLoginForm() {
  return (
    <LoginForm
      userType="manager"
      formAction={authenticateManager}
    />
  );
}

export default function ManagerLoginPage() {
  return (
    <Suspense>
      <ManagerLoginForm />
    </Suspense>
  );
}
