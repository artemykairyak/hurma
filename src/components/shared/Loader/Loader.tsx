import LoaderIcon from '@assets/icons/loader.svg';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

import s from './styles.module.scss';

interface LoaderProps {
  fullSize?: boolean;
  size?: number;
}

export const Loader: FC<LoaderProps> = ({ size, fullSize }) => {
  const sizes = size ? { width: `${size}px`, height: `${size}px` } : {};

  if (fullSize) {
    return (
      <div className={s.wrapper}>
        <ReactSVG src={LoaderIcon.src} className={s.loader} style={sizes} />
      </div>
    );
  }

  return <ReactSVG src={LoaderIcon.src} className={s.loader} style={sizes} />;
};
