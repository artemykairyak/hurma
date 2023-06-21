import CloseIcon from '@assets/icons/close.svg';
import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';
import { ReactSVG } from 'react-svg';

import s from './Modal.module.scss';

interface ModalProps extends PropsWithChildren {
  title: string;
  onClose: VoidFunction;
  hideOverlay?: boolean;
}

export const Modal: FC<ModalProps> = ({
  title,
  onClose,
  hideOverlay,
  children,
}) => {
  return (
    <div className={clsx(s.overlay, { [s.transparentOverlay]: hideOverlay })}>
      <div className={s.modal}>
        <button className={s.close} onClick={onClose}>
          <ReactSVG src={CloseIcon.src} />
        </button>
        <span className={s.title}>{title}</span>
        {children}
      </div>
    </div>
  );
};
