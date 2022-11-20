import { Box, Button, Paper } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "../../common/components/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { Header } from "../../common/components/Header/Header";

const validationSchema = yup.object().shape({
  description: yup.string().min(8, "Opis minimum 8 znaków"),
});

type FoodType = {
  name: string;
  description: string;
  image: string;
  dueDate: string;
};
type AdvertisementForm = {
  lat: number;
  lng: number;
  image: string;
  description: string;
  food?: FoodType[];
};

export default function AddAdvertisementPage() {
  const form = useForm<AdvertisementForm>({
    defaultValues: {
      lat: 51,
      lng: 21,
      image: "",
      description: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = form;

  const handleFormSubmit = async (data: AdvertisementForm) => {
    console.log(data);
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
          <Header label={"Advertisement"}></Header>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput<AdvertisementForm> formValueName="lat" width={600} label="Lat" />
            <FormInput<AdvertisementForm> formValueName="lng" width={"100%"} label="Lng" />
            <FormInput<AdvertisementForm>
              formValueName="image"
              width={"100%"}
              label="Image base64"
            />
            <FormInput<AdvertisementForm> formValueName="description" width={"100%"} label="Opis" />
            <FormInput<AdvertisementForm> formValueName="food" width={"100%"} label="Opis" />

            <Box sx={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}>
              <Button type="submit" sx={{ marginTop: "10px" }}>
                Dodaj
              </Button>
            </Box>
          </form>
        </Paper>
      </FormProvider>
    </Box>
  );
}
