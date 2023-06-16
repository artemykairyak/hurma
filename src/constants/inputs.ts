import { IInput } from '@types/types';

export const signUpInputs: IInput[] = [
  {
    name: 'username',
    type: 'text',
    label: 'username',
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
    name: 'username',
    placeholder: 'Username',
    type: 'text',
    label: 'username',
  },
  {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
    label: 'password',
  },
];
