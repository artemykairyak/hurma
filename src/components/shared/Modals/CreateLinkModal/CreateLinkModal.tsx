import { Button } from '@components/shared/Button/Button';
import { Input } from '@components/shared/Input/Input';
import { Modal } from '@components/shared/Modal/Modal';
import { createLinkInputs } from '@constants/inputs';
import { createLinkSchema } from '@constants/validationSchemes';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModalProps } from '@types/types';
import { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import gs from '../modals.module.scss';
import s from './CreateLinkModal.module.scss';

export const CreateLinkModal: FC<ModalProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(createLinkSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Modal title="Create new link" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        {createLinkInputs.map((item) => {
          return (
            <Input
              key={item.name}
              {...item}
              register={register}
              className={gs.input}
              errors={errors}
            />
          );
        })}
        <Button type="primary" className={s.button}>
          create
        </Button>
      </form>
    </Modal>
  );
};
