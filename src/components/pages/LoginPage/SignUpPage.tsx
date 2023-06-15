import { AuthLayout } from '@components/layouts/AuthLayout/AuthLayout';
import { HeadingWithOption } from '@components/shared/HeadingWithOption/HeadingWithOption';

export const SignUpPage = () => {
  return (
    <AuthLayout>
      <HeadingWithOption title="Sign Up" optionText="login" link="/login" />
    </AuthLayout>
  );
};
