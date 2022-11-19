import { Button, Paper } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "../../common/components/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup.string().max(255).nullable().required().email(),
  password: yup.string().max(15).nullable().required(),
});

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const form = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { formState, handleSubmit } = form;

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...form}>
        <Paper>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput<LoginForm> formValueName="email" label="Email" />
            <FormInput<LoginForm> formValueName="password" label="Password" />
            <Button type="submit">Zaloguj</Button>
          </form>
        </Paper>
      </FormProvider>
    </div>
  );
}
