import { ValidationMessages } from "@enums/validationMessages";
import * as yup from "yup";

export const signUpSchema = yup
  .object({
    email: yup
      .string()
      .email(ValidationMessages.EMAIL)
      .required(ValidationMessages.REQUIRED),
    password: yup
      .string()
      .min(6, ValidationMessages.MIN_PASSWORD)
      .required(ValidationMessages.REQUIRED),
    confirmPassword: yup
      .string()
      .min(6, ValidationMessages.MIN_PASSWORD)
      .oneOf([yup.ref("password")], ValidationMessages.EQUALS_PASSWORDS)
      .required(ValidationMessages.REQUIRED),
  })
  .required();

export const signInSchema = yup
  .object({
    email: yup
      .string()
      .email(ValidationMessages.EMAIL)
      .required(ValidationMessages.REQUIRED),
    password: yup
      .string()
      .min(6, ValidationMessages.MIN_PASSWORD)
      .required(ValidationMessages.REQUIRED),
  })
  .required();

export const createLinkSchema = yup
  .object({
    title: yup.string().required(ValidationMessages.REQUIRED),
    fullUrl: yup.string().required(ValidationMessages.REQUIRED),
  })
  .required();

export const editLinkSchema = yup
  .object({
    title: yup.string().required(ValidationMessages.REQUIRED),
  })
  .required();
