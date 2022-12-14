import { Box, Button, Paper } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "../../common/components/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useAuthenticateUserMutation } from "../api/Token";
import { Header } from "../../common/components/Header/Header";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "../../common/store";
import { useDispatch } from "react-redux";
import { setToken } from "../../../reducers/authReducer";
import { boolean } from "yup/lib/locale";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  email: yup.string().max(255).nullable().required().email(),
  password: yup.string().max(15).nullable().required(),
});

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [loginUser, { isLoading, isError }] = useAuthenticateUserMutation();
  const dispatch = useDispatch();
  const form = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = form;
  const history = useNavigate();

  const handleFormSubmit = async (data: LoginForm) => {
    const result = await loginUser(data);
    if (isApiResponse(result)) {
        toast.success("Zalogowano pomyślnie.");
        dispatch(setToken(result.data));
        history("/map");
        return;
    }
    toast.error("Błędne dane logowania.");

    console.log(result);
  };

  return (
    <Box
      sx={{
        padding: 3,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormProvider {...form}>
        <Paper
          sx={{
            p: 3,
          }}
        >
          <Header label={"Logowanie"}></Header>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput<LoginForm> formValueName="email" width={300} label="Email" />
            <FormInput<LoginForm>
              formValueName="password"
              width={300}
              label="Password"
              type="password"
            />

            <Box sx={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}>
              <Button type="submit" sx={{ marginTop: "10px" }}>
                Zaloguj
              </Button>
            </Box>
          </form>
        </Paper>
      </FormProvider>
    </Box>
  );
}

function isApiResponse(response:any):response is {data:{token: string}} {
  return Boolean(response?.data?.token);
}
