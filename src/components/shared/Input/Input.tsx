import { montserrat } from '@app/layout';
import { Label } from '@components/shared/Label/Label';
import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import { FC, HTMLInputTypeAttribute } from 'react';
import {
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import s from './Input.module.scss';

export interface InputProps {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  validationOptions?: RegisterOptions;
  placeholder?: string;
  required?: boolean;
  errors?: Partial<FieldErrorsImpl<DeepRequired<FieldValues>>>;
  className?: string;
  type?: HTMLInputTypeAttribute;
}

export const Input: FC<InputProps> = ({
  name,
  label,
  placeholder,
  required,
  className,
  type = 'text',
  errors,
  validationOptions,
  register,
}) => {
  return (
    <div className={clsx(s.wrapper, className)}>
      <Label label={label} required={!!required} inputName={name} />
      <input
        id={name}
        type={type}
        className={clsx(s.input, className, montserrat.className, {
          [s.error]: !!errors ? errors[name] : false,
          [s.label]: label,
        })}
        placeholder={placeholder}
        {...register(name, { ...validationOptions })}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={(data) => <span className={s.errorText}>{data.message}</span>}
      />
    </div>
  );
};
