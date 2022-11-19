import { Box, Button, Paper } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "../../common/components/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useRegisterUserMutation } from "../api/Registration";

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

  const handleFormSubmit = async (data: RegisterForm) => {
    const { repeatedPassword, ...restData } = data;

    const result = await registerUser(restData);

    console.log(result);
  };

  return (
    <Box
      sx={{
        padding: 3,
      }}
    >
      <FormProvider {...form}>
        <Paper
          sx={{
            p: 3,
          }}
        >
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput<RegisterForm> formValueName="email" label="Email" />
            <FormInput<RegisterForm> formValueName="password" label="Hasło" />
            <FormInput<RegisterForm> formValueName="repeatedPassword" label="Powtórz hasło" />
            <FormInput<RegisterForm> formValueName="phonenumber" label="Numer telefon" />
            <Button disabled={isLoading} type="submit">
              Zarejestruj
            </Button>
          </form>
        </Paper>
      </FormProvider>
    </Box>
  );
}
