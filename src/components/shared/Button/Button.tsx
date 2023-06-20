import { Loader } from '@components/shared/Loader/Loader';
import clsx from 'clsx';
import { ReactNode, forwardRef } from 'react';
import { ReactSVG } from 'react-svg';

import s from './styles.module.scss';

export interface ButtonProps {
  type: 'primary' | 'secondary';
  children?: ReactNode | string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: VoidFunction;
  icon?: { src: string };
  className?: string;
  iconClassName?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      icon,
      className,
      onClick,
      disabled,
      loading,
      type,
      iconClassName,
    } = props;

    return (
      <button
        className={clsx(
          s.button,
          type === 'primary' ? s.primaryButton : s.secondaryButton,
          className,
        )}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
      >
        {icon && (
          <ReactSVG className={clsx(s.icon, iconClassName)} src={icon.src} />
        )}
        {loading ? <Loader /> : children}
      </button>
    );
  },
);

Button.displayName = 'Button';
