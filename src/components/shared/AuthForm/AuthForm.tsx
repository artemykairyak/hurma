import { Button } from '@components/shared/Button/Button';
import { Input } from '@components/shared/Input/Input';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { IInput } from '@types/types';
import { FC } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ObjectSchema } from 'yup';

import s from './AuthForm.module.scss';

interface AuthFormProps {
  inputs: IInput[];
  onSubmit: SubmitHandler<FieldValues>;
  validationSchema: ObjectSchema<any>;
  authErrors?: string;
  loading?: boolean;
}

export const AuthForm: FC<AuthFormProps> = ({
  inputs,
  onSubmit,
  validationSchema,
  authErrors,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={s.form}
      noValidate={true}
    >
      <di>
        {inputs.map(({ placeholder, type, name, label }, i) => {
          return (
            <div className={s.inputWrapper} key={i}>
              <Input
                label={label}
                name={name}
                type={type}
                register={register}
                isError={!!errors[name]}
              />
              <ErrorMessage
                errors={errors}
                name={name}
                render={(data) => (
                  <span className={s.error}>{data.message}</span>
                )}
              />
            </div>
          );
        })}
      </di>
      <Button
        type="primary"
        className={s.button}
        loading={!!loading}
        disabled={!!loading}
      >
        Confirm
      </Button>
      <span className={s.authError}>{authErrors}</span>
    </form>
  );
};
