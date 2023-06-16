'use client';

import { AuthLayout } from '@components/layouts/AuthLayout/AuthLayout';
import { AuthForm } from '@components/shared/AuthForm/AuthForm';
import { HeadingWithOption } from '@components/shared/HeadingWithOption/HeadingWithOption';
import { signUpInputs } from '@constants/inputs';
import { signUpSchema } from '@constants/validationSchemes';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export const SignUpPage = () => {
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
      <HeadingWithOption title="Sign Up" optionText="login" link="/login" />
      <AuthForm
        inputs={signUpInputs}
        validationSchema={signUpSchema}
        onSubmit={onSubmit}
        authErrors={errors}
        loading={loading}
      />
    </AuthLayout>
  );
};
