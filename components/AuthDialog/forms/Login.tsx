import React from "react";
import { Button } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormSchema } from "../../../utils/validations";
import { FormField } from "../../FormField";
import { LoginDto } from "../../../utils/api/types";
import { UserApi } from "../../../utils/api/users";
import { setCookie } from "nookies";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useAppDispatch } from "../../../redux/hooks";
import { setUserData } from "../../../redux/slices/users";
import { Api } from "../../../utils/api";

interface LoginFormProps {
  onOpenRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onOpenRegister }) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = React.useState("");

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (dto: LoginDto) => {
    try {
      const data = await Api().user.login(dto);
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

  console.log(form.formState.errors);

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="email" label="Почта" />
          <FormField name="password" label="Пароль" />
          {errorMessage && (
            <Alert variant="filled" className="mb-20" severity="error">
              {errorMessage}
            </Alert>
          )}
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              type="submit"
              color="primary"
              variant="contained"
            >
              Войти
            </Button>
            <Button onClick={onOpenRegister} color="primary" variant="text">
              Регистрация
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
