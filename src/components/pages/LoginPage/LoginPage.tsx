'use client';

import { AuthLayout } from '@components/layouts/AuthLayout/AuthLayout';
import { AuthForm } from '@components/shared/AuthForm/AuthForm';
import { HeadingWithOption } from '@components/shared/HeadingWithOption/HeadingWithOption';
import { signInInputs } from '@constants/inputs';
import { signInSchema } from '@constants/validationSchemes';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export const LoginPage = () => {
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { username, email, password } = data;

    console.log(data);

    //
    // if (await login(username, password)) {
    //   if (backLink) {
    //     await router.replace(backLink);
    //     return;
    //   }
    //
    //   await router.replace(`/user/${username}`);
    // }
  };

  return (
    <AuthLayout>
      <HeadingWithOption title="Login" optionText="sign up" link="/sign-up" />
      <AuthForm
        inputs={signInInputs}
        validationSchema={signInSchema}
        onSubmit={onSubmit}
        authErrors={errors}
        loading={loading}
      />
    </AuthLayout>
  );
};
