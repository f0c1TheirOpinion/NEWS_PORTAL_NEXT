import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
  email: yup.string().email("Неверная почта").required("Почта обязательна"),
  password: yup
    .string()
    .min(6, "Более 6 символов")
    .required("Пароль обязателен"),
});
export const RegisterFormSchema = yup
  .object()
  .shape({
    fullName: yup
      .string()
      .required("Обязательное поля")
      .min(3, "Более 3 символов"),
  })
  .concat(LoginFormSchema);
