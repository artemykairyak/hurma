import clsx from 'clsx';
import React, { FC, PropsWithChildren } from 'react';

import s from './styles.module.scss';

interface ContentLayoutProps extends PropsWithChildren {
  className?: string;
}

export const ContentLayout: FC<ContentLayoutProps> = ({
  children,
  className,
}) => {
  return <div className={clsx(s.content, className)}>{children}</div>;
};
