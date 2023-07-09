import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import s from './styles.module.scss';

interface GrayPanelProps {
  title: string;
  children: ReactNode;
  disableWhitePanel?: boolean;
  className?: string;
}

export const GrayPanel: FC<GrayPanelProps> = ({
  title,
  children,
  disableWhitePanel,
  className,
}) => {
  return (
    <div className={clsx(s.panel, className)}>
      <h1 className={s.title}>{title}</h1>
      {disableWhitePanel ? (
        children
      ) : (
        <div className={s.whitePanel}>{children}</div>
      )}
    </div>
  );
};
