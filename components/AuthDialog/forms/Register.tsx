import React from "react";
import { Button } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormSchema } from "../../../utils/validations";
import { FormField } from "../../FormField";
import { CreateUserDto, LoginDto } from "../../../utils/api/types";
import { Api } from "../../../utils/api";
import { setCookie } from "nookies";
import { Alert } from "@material-ui/lab";
import { setUserData } from "../../../redux/slices/users";
import { useAppDispatch } from "../../../redux/hooks";

interface LoginFormProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

export const RegisterForm: React.FC<LoginFormProps> = ({
  onOpenRegister,
  onOpenLogin,
}) => {
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = React.useState("");

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      const data = await Api().user.register(dto);

      console.log(data);
      setCookie(null, "rtoken0", data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      dispatch(setUserData(data));

      setErrorMessage("");
    } catch (err) {
      console.warn("При регистрации", err);
      if (err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <FormField name="fullName" label="Имя и фамилия" />
        <FormField name="email" label="Почта" />
        <FormField name="password" label="Пароль" />
        {errorMessage && (
          <Alert variant="filled" className="mb-20" severity="error">
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              onClick={onOpenRegister}
              type="submit"
              color="primary"
              variant="contained"
            >
              Зарегистрироваться
            </Button>
            <Button onClick={onOpenLogin} color="primary" variant="text">
              Войти
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
