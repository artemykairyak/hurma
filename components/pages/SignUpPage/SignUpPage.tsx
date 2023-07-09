import { AuthLayout } from "@components/layouts/AuthLayout/AuthLayout";
import { AuthForm } from "@components/shared/AuthForm/AuthForm";
import { HeadingWithOption } from "@components/shared/HeadingWithOption/HeadingWithOption";
import { signUpInputs } from "@constants/inputs";
import { signUpSchema } from "@constants/validationSchemes";
import { signUp } from "@services/apiService/endpoints/authApi";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export const SignUpPage = () => {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data;

    setLoading(true);

    const [_, error] = await signUp(email, password);

    if (error) {
      setErrors(error.message);
    }

    setLoading(false);
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
