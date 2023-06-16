import GoogleLogo from '@assets/icons/google.svg';
import TwitterLogo from '@assets/icons/twitter.svg';
import YandexLogo from '@assets/icons/yandex.svg';
import clsx from 'clsx';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

import s from './styles.module.scss';

export const AuthIcons: FC<{ className?: string }> = ({ className }) => {
  const onClick = (type: 'google' | 'twitter' | 'yandex') => () => {
    console.log(type);
  };

  return (
    <div className={clsx(s.buttons, className)}>
      <button className={s.button} onClick={onClick('google')}>
        <ReactSVG src={GoogleLogo.src} />
      </button>
      <button className={s.button} onClick={onClick('twitter')}>
        <ReactSVG src={TwitterLogo.src} />
      </button>
      <button className={s.button} onClick={onClick('yandex')}>
        <ReactSVG src={YandexLogo.src} />
      </button>
    </div>
  );
};
