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
import { EditLink } from "@services/apiService/endpoints/linksApi";
import clsx from "clsx";
import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface EditLinkModalProps extends ModalProps {
  link: ILink;
  onEdit: (id: string, data: EditLink) => void;
  onDelete: (id: string) => void;
  error: string;
}

export const EditLinkModal: FC<EditLinkModalProps> = ({
  onClose,
  link,
  onEdit,
  onDelete,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: link.title,
      expires: link.expiresAt,
    },
    //@ts-ignore

    resolver: yupResolver(editLinkSchema),
  });

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
      <span className={gs.error}>{error}</span>
      <div className={s.buttons}>
        <Button
          kind="primary"
          className={s.button}
          onClick={handleSubmit((data: EditLink) => onEdit(link.id, data))}
        >
          edit
        </Button>
        <Button
          kind="primary"
          className={clsx(s.button, s.deleteBtn)}
          icon={DeleteIcon}
          onClick={() => onDelete(link.id)}
        />
      </div>
    </Modal>
  );
};
