import { FC } from 'react';

import s from './Label.module.scss';

interface LabelProps {
  label: string;
  inputName?: string;
  required?: boolean;
}

export const Label: FC<LabelProps> = ({ label, inputName, required }) => {
  return (
    <div className={s.labelWrapper}>
      <label
        htmlFor={inputName}
        className={s.label}
        dangerouslySetInnerHTML={{ __html: label }}
      />
      {required && <span className={s.required}>*</span>}
    </div>
  );
};
