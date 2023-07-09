import s from "./InputWithButton.module.scss";
import { Button, ButtonProps } from "@components/shared/Button/Button";
import { Input, InputProps } from "@components/shared/Input/Input";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface InputWithButton {
  inputProps: Omit<InputProps, "register">;
  buttonProps: Omit<ButtonProps, "kind"> & { icon: { src: string } };
  onSubmit: (data: any) => void;
}

export const InputWithButton: FC<InputWithButton> = ({
  inputProps,
  buttonProps,
  onSubmit,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <Input {...inputProps} register={register} errors={errors} />
      <Button kind="primary" icon={buttonProps.icon} {...buttonProps} />
    </form>
  );
};
