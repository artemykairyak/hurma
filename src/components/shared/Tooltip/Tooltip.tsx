import clsx from 'clsx';
import React, { FC, ReactNode, useEffect, useState } from 'react';

import s from './Tooltip.module.scss';

interface TooltipProps {
  text: string;
  children: ReactNode;
  position: 'top' | 'left';
  className?: string;
}

export const Tooltip: FC<TooltipProps> = ({
  text,
  children,
  className,
  position,
}) => {
  const [isTooltipShowed, setIsTooltipShowed] = useState(false);

  useEffect(() => {
    if (isTooltipShowed) {
      setTimeout(() => {
        setIsTooltipShowed(false);
      }, 3000);
    }
  }, [isTooltipShowed]);

  return (
    <div className={s.tooltipWrapper} onClick={() => setIsTooltipShowed(true)}>
      {isTooltipShowed && (
        <span
          className={clsx(
            s.tooltip,
            { [s.top]: position == 'top', [s.left]: position === 'left' },
            className,
          )}
        >
          {text}
        </span>
      )}
      {children}
    </div>
  );
};
