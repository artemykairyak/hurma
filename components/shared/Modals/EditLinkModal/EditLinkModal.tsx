import gs from "../modals.module.scss";
import s from "./EditLinkModal.module.scss";
import DeleteIcon from "@assets/icons/delete.svg";
import { Button } from "@components/shared/Button/Button";
import { Input } from "@components/shared/Input/Input";
import { Modal } from "@components/shared/Modal/Modal";
import { editLinkInputs } from "@constants/inputs";
import { editLinkSchema } from "@constants/validationSchemes";
import { ModalProps } from "@customTypes/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILink } from "@pages/links";
import clsx from "clsx";
import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface EditLinkModalProps extends ModalProps {
  link: ILink;
}

export const EditLinkModal: FC<EditLinkModalProps> = ({ onClose, link }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: link.title,
      expires: link.expires.expires_at,
    },
    //@ts-ignore

    resolver: yupResolver(editLinkSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onDelete = () => {
    console.log(link.id);
  };

  return (
    <Modal title="Edit link" onClose={onClose}>
      {editLinkInputs.map((item) => {
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
      <div className={s.buttons}>
        <Button
          type="primary"
          className={s.button}
          onClick={handleSubmit(onSubmit)}
        >
          edit
        </Button>
        <Button
          type="primary"
          className={clsx(s.button, s.deleteBtn)}
          icon={DeleteIcon}
          onClick={onDelete}
        />
      </div>
    </Modal>
  );
};
