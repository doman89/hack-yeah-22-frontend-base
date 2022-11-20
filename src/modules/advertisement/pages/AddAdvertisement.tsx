import { yupResolver } from "@hookform/resolvers/yup";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import * as yup from "yup";

import { FormInput } from "../../common/components/FormInput";
import { Header } from "../../common/components/Header/Header";
import { usePostAdvertisementMutation } from "../api/advertisements";

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
  food: FoodType[];
};

const EMPTY_FOOD: FoodType = { description: "", dueDate: "", image: "", name: "" };

function RepeatableForm(form: UseFormReturn<AdvertisementForm>) {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "food", // unique name for your Field Array
  });
  const [selected, setSelected] = useState(0);

  const handleNewRow = () => {
    append(EMPTY_FOOD);
    setSelected(fields.length);
  };

  const handleRowDelete = (index: number) => {
    remove(index);
    setSelected(index - 1);
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const AddButton = () => (
    <Button sx={{ marginTop: "10px" }} onClick={() => handleNewRow()}>
      Dodaj kolejne żarcie do oddania
    </Button>
  );

  return (
    <>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Accordion expanded={selected === index} onChange={() => setSelected(index)}>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {field.name || "(brak tytułu)"}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {field.description || "(brak opisu)"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormInput<FoodType>
                key={`name.${field.id}`}
                formValueName={`food.${index}.name` as any}
                label="Nazwa"
                width={600}
              />
              <FormInput<FoodType>
                key={`desc.${field.id}`}
                label="Opis"
                width={600}
                formValueName={`food.${index}.description` as any}
              />
              <FormInput<FoodType>
                key={`due.${field.id}`}
                formValueName={`food.${index}.dueDate` as any}
                label="Termin ważności"
                width={600}
              />
              <FormInput<FoodType>
                key={`image.${field.id}`}
                formValueName={`food.${index}.image` as any}
                label="Grafika w BASE64"
                width={600}
              />
            </AccordionDetails>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}>
              <Button
                sx={{ marginTop: "10px" }}
                color="error"
                onClick={() => handleRowDelete(index)}
              >
                usun
              </Button>
              <AddButton />
            </Box>
          </Accordion>

          {fields.length === 0 && <AddButton />}
        </React.Fragment>
      ))}
    </>
  );
}

export default function AddAdvertisementPage() {
  const [postAdvertisement, { isLoading, isError }] = usePostAdvertisementMutation();

  const form = useForm<AdvertisementForm>({
    defaultValues: {
      lat: 51,
      lng: 21,
      image: "",
      description: "",
      food: [EMPTY_FOOD],
    },
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = form;

  const handleFormSubmit = async (data: AdvertisementForm) => {
    const result = await postAdvertisement(data);
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
          <Header label="Advertisement" />
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput<AdvertisementForm> formValueName="lat" label="Lat" width={600} />
            <FormInput<AdvertisementForm> formValueName="lng" label="Lng" width="100%" />
            <RepeatableForm {...form} />

            <Button sx={{ marginTop: "10px" }} color="primary" type="submit">
              Wyślij formularz
            </Button>
          </form>
        </Paper>
      </FormProvider>
    </Box>
  );
}
