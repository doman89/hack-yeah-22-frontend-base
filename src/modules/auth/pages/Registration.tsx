import { Box, Button, Paper } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "../../common/components/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import 'react-toastify/dist/ReactToastify.css';

import * as yup from "yup";
import { useRegisterUserMutation } from "../api/Registration";
import { Header } from "../../common/components/Header/Header";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .max(255)
    .nullable()
    .required("Email jest wymagany")
    .email("Email musi być poprawny"),
  password: yup
    .string()
    .min(8, "Hasło musi zawierać minimum 8 znaków")
    .nullable()
    .required("Hasło jest wymagane"),
  repeatedPassword: yup.string().oneOf([yup.ref("password"), null], "Hasła muszą być identyczne"),
  phonenumber: yup.string().nullable().required("Numer telefonu jest wymagany"),
});

type RegisterForm = {
  email: string;
  phonenumber: string;
  password: string;
  repeatedPassword?: string;
};

export default function RegisterPage() {
  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();
  const form = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      password: "",
      phonenumber: "",
      repeatedPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = form;
  const history = useNavigate();

  const handleFormSubmit = async (data: RegisterForm) => {
    const { repeatedPassword, ...restData } = data;

    const result = await registerUser(restData);
    if (isApiResponse(result)) {
      if(result.data.message === 'OK, created') {
        toast("Rejestracja zakończona pomyślnie.");
        history("/login");
        return;
      }
      toast("Błąd podczas rejestracji.");
    }
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
          <Header label={"Rejestracja"}></Header>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput<RegisterForm> formValueName="email" width={300} label="Email" />
            <FormInput<RegisterForm>
              formValueName="password"
              width={300}
              label="Hasło"
              type="password"
            />
            <FormInput<RegisterForm>
              formValueName="repeatedPassword"
              width={300}
              label="Powtórz hasło"
              type="password"
            />
            <FormInput<RegisterForm>
              formValueName="phonenumber"
              width={300}
              label="Numer telefonu"
            />

            <Box sx={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}>
              <Button disabled={isLoading} type="submit" sx={{ marginTop: "10px" }}>
                Zarejestruj
              </Button>
            </Box>
          </form>
        </Paper>
      </FormProvider>
    </Box>
  );
}

function isApiResponse(response:any):response is {data: {message: string}} {
  return Boolean(response?.data?.message);
}
