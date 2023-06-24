import Logo from '@assets/images/logo.svg';
import { AuthIcons } from '@components/shared/AuthIcons/AuthIcons';
import { Loader } from '@components/shared/Loader/Loader';
import { Routes } from '@enums/routes';
import { useAppSession } from '@hooks/useAppSession';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import { ReactSVG } from 'react-svg';

import s from './styles.module.scss';

export const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { loading } = useAppSession();
  const session = useSession();

  useEffect(() => {
    if (session.data?.user.token) {
      router.replace(Routes.Links);
    }
  }, [session]);

  if (loading) {
    return <Loader fullSize={true} color="#fff" />;
  }

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
