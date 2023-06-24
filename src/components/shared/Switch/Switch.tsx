import clsx from 'clsx';
import { ChangeEvent, FC } from 'react';

import s from './Switch.module.scss';

interface SwitchProps {
  name: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  className?: string;
}

export const Switch: FC<SwitchProps> = ({
  name,
  checked,
  onChange,
  className,
}) => {
  return (
    <div className={clsx(s.switch, className)}>
      <input
        className={s.checkbox}
        name={name}
        id={name}
        type="checkbox"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked)
        }
        checked={checked}
      />
      <label className={s.label} htmlFor={name}>
        <span className={s.button} />
      </label>
    </div>
  );
};
