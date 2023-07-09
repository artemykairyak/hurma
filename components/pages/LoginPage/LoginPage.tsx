import { AuthLayout } from "@components/layouts/AuthLayout/AuthLayout";
import { AuthForm } from "@components/shared/AuthForm/AuthForm";
import { HeadingWithOption } from "@components/shared/HeadingWithOption/HeadingWithOption";
import { signInInputs } from "@constants/inputs";
import { signInSchema } from "@constants/validationSchemes";
import { login } from "@services/apiService/endpoints/authApi";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export const LoginPage = () => {
  const router = useRouter();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data;

    setErrors("");
    setLoading(true);

    const [resData, error] = await login(email, password);

    if (resData?.code === 200) {
      document.cookie = `hurmaLogged=true; Path=/; Expires=${dayjs().add(
        1,
        "hour"
      )};`;
      await router.push("/links");
    } else {
      setErrors(error.message);
    }

    setLoading(false);
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
