import { LoginForm } from '@/components/app/login-form';
import { authenticateStaff } from '@/lib/actions';

export default function StaffLoginPage() {
  return (
    <LoginForm
      userType="staff"
      formAction={authenticateStaff}
    />
  );
}
