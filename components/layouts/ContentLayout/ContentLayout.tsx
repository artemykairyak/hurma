import { Loader } from '@components/shared/Loader/Loader';
import clsx from 'clsx';
import React, { FC, PropsWithChildren } from 'react';

import s from './ContentLayout.module.scss';

interface ContentLayoutProps extends PropsWithChildren {
  loading?: boolean;
  className?: string;
}

export const ContentLayout: FC<ContentLayoutProps> = ({
  children,
  loading,
  className,
}) => {
  return (
    <div className={clsx(s.contentWrapper, className)}>
      {loading ? (
        <Loader fullSize={true} color="#fff" />
      ) : (
        <div className={s.content}>{children}</div>
      )}
    </div>
  );
};
