import { HTMLInputTypeAttribute } from 'react';

export interface IInput {
  name: string;
  type: HTMLInputTypeAttribute;
  label: string;
  required?: boolean;
  placeholder?: string;
}

export interface ModalProps {
  onClose: VoidFunction;
}
