import { IInput } from '@types/types';

export const signUpInputs: IInput[] = [
  {
    name: 'email',
    type: 'email',
    label: 'email',
  },
  {
    name: 'password',
    type: 'password',
    label: 'password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'confirm password',
  },
];

export const signInInputs: IInput[] = [
  {
    name: 'email',
    type: 'email',
    label: 'email',
  },
  {
    name: 'password',
    type: 'password',
    label: 'password',
  },
];

export const createLinkInputs: IInput[] = [
  {
    name: 'title',
    type: 'text',
    label: 'title',
    required: true,
  },
  {
    name: 'url',
    type: 'text',
    label: 'URL',
    required: true,
  },
  {
    name: 'expires',
    type: 'text',
    label: 'expires',
  },
];

export const editLinkInputs: IInput[] = [
  {
    name: 'title',
    type: 'text',
    label: 'title',
    required: true,
  },
  {
    name: 'expires',
    type: 'text',
    label: 'expires',
  },
];
