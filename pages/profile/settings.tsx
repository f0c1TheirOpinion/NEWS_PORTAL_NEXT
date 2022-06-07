import {
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { MainLayout } from "../../layouts/MainLayout";
import { GetServerSideProps, NextPage } from "next";
import { CreateUserDto, ResponseUser } from "../../utils/api/types";
import { Api } from "../../utils/api";
import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "nookies";
import { setUserData } from "../../redux/slices/users";
import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";
import { Email } from "@material-ui/icons";
import { RegisterFormSchema } from "../../utils/validations";

interface setPropsUser {
  user: ResponseUser;
}

const Settings: NextPage<setPropsUser> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async () => {
    console.log("fdsfsd");
    try {
      const obj = {
        email: email,
        fullName: fullName,
      };
      const data = await Api().user.update(obj);

      //  dispatch(setUserData(data));
    } catch (err) {
      console.warn("При обновлении данных", err);
    }
  };

  return (
    <MainLayout hideComments>
      <Paper className="p-20" elevation={0}>
        <Typography variant="h6">Основные настройки</Typography>
        <Divider className="mt-20 mb-30" />
        <FormProvider {...form}>
          <TextField
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mb-20"
            size="small"
            name="fullName"
            label="Имя"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-20"
            size="small"
            label="Эл. почта"
            variant="outlined"
            name="email"
            fullWidth
            required
          />

          <Divider className="mt-30 mb-20" />

          <Button onClick={onSubmit} color="primary" variant="contained">
            Сохранить изменения
          </Button>
        </FormProvider>
      </Paper>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const user = await Api(ctx).user.getMe();

    return {
      props: {
        user,
      },
    };
  } catch (err) {
    console.log("Fulll post page", err);
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
export default Settings;
