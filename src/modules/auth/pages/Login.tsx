import { Box, Button, Paper } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "../../common/components/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useAuthenticateUserMutation } from "../api/Token";

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
  const form = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = form;

  const handleFormSubmit = async (data: LoginForm) => {
    const result = await loginUser(data);

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
            <FormInput<LoginForm> formValueName="email" label="Email" />
            <FormInput<LoginForm> formValueName="password" label="Password" />
            <Button type="submit">Zaloguj</Button>
          </form>
        </Paper>
      </FormProvider>
    </Box>
  );
}
