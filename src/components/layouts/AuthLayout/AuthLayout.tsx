import Logo from '@assets/images/logo.svg';
import { AuthIcons } from '@components/shared/AuthIcons/AuthIcons';
import { FC, ReactNode } from 'react';
import { ReactSVG } from 'react-svg';

import s from './styles.module.scss';

export const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={s.auth}>
      <div className={s.content}>
        <div className={s.contentWrapper}>
          {children}
          <AuthIcons className={s.icons} />
        </div>
      </div>
      <div className={s.logo}>
        <div className={s.logoWrapper}>
          <ReactSVG src={Logo.src} />
        </div>
        <p className={s.logoText}>
          Web-service for URL shortening and conversion statistics
        </p>
      </div>
    </div>
  );
};
