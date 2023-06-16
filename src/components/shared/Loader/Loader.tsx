import LoaderIcon from '@assets/icons/loader.svg';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

import s from './styles.module.scss';

interface LoaderProps {
  size?: number;
}

export const Loader: FC<LoaderProps> = ({ size }) => {
  const sizes = size ? { width: `${size}px`, height: `${size}px` } : {};
  return <ReactSVG src={LoaderIcon.src} className={s.loader} style={sizes} />;
};
