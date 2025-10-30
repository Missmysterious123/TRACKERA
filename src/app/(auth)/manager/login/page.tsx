import { LoginForm } from '@/components/app/login-form';
import { authenticateManager } from '@/lib/actions';

export default function ManagerLoginPage() {
  return (
    <LoginForm
      userType="manager"
      formAction={authenticateManager}
    />
  );
}
