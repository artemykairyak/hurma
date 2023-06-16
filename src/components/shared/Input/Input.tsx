import clsx from 'clsx';
import { FC, HTMLInputTypeAttribute } from 'react';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

import { montserrat } from '../../../app/layout';
import s from './styles.module.scss';

interface InputProps {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  validationOptions?: RegisterOptions;
  placeholder?: string;
  required?: boolean;
  isError?: boolean;
  className?: string;
  type?: HTMLInputTypeAttribute;
}

export const Input: FC<InputProps> = ({
  name,
  label,
  placeholder,
  required,
  className,
  type,
  isError,
  validationOptions,
  register,
}) => {
  return (
    <div className={clsx(s.wrapper, className)}>
      <label htmlFor={name} className={s.label}>
        {label}
        {required && <span className={s.required}>*</span>}
      </label>
      <input
        id={name}
        type={type}
        className={clsx(s.input, className, montserrat.className, {
          [s.error]: isError,
        })}
        placeholder={placeholder}
        {...register(name, { ...validationOptions })}
      />
    </div>
  );
};
