import Logo from '@assets/images/logo.svg';
import { FC, ReactNode } from 'react';

import s from './styles.module.scss';

export const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={s.auth}>
      <div className={s.content}>{children}</div>
      <div className={s.logo}>
        <div className={s.logoWrapper}>
          <Logo width="278" height="318" viewBox="0 0 278 318" />
        </div>
        <p className={s.logoText}>
          Web-service for URL shortening and conversion statistics
        </p>
      </div>
    </div>
  );
};
