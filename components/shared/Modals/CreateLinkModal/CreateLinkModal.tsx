import gs from "../modals.module.scss";
import s from "./CreateLinkModal.module.scss";
import { Button } from "@components/shared/Button/Button";
import { Input } from "@components/shared/Input/Input";
import { Modal } from "@components/shared/Modal/Modal";
import { createLinkInputs } from "@constants/inputs";
import { createLinkSchema } from "@constants/validationSchemes";
import { ModalProps } from "@customTypes/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateLink } from "@services/apiService/endpoints/linksApi";
import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface CreateLinkModalProps extends ModalProps {
  onCreate: (data: Omit<CreateLink, "createdAt">) => void;
}

export const CreateLinkModal: FC<CreateLinkModalProps> = ({
  onClose,
  onCreate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    //@ts-ignore

    resolver: yupResolver(createLinkSchema),
  });

  return (
    <Modal title="Create new link" onClose={onClose}>
      <form onSubmit={handleSubmit(onCreate)} noValidate={true}>
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
        <Button kind="primary" type="submit" className={s.button}>
          create
        </Button>
      </form>
    </Modal>
  );
};
