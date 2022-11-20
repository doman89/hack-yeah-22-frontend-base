import { yupResolver } from "@hookform/resolvers/yup";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Input,
  Paper,
  Typography,
} from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import { FormInput } from "../../common/components/FormInput";
import { Header } from "../../common/components/Header/Header";
import { usePostAdvertisementMutation } from "../api/advertisements";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../common/store";

const validationSchema = yup.object().shape({
  description: yup.string().min(8, "Opis minimum 8 znaków"),
});

type FoodType = {
  name: string;
  description: string;
  image: string;
  dueDate: string;
  _id: string;
};

type AdvertisementForm = {
  lat: number;
  lng: number;
  image: string;
  description: string;
  food: FoodType[];
};

type RepeatableFormProps = {
  form: UseFormReturn<AdvertisementForm>;
  base64: React.MutableRefObject<Record<string, string>>;
};

const EMPTY_FOOD: FoodType = { description: "", dueDate: "", image: "", name: "", _id: "" };

function RepeatableForm({ form, base64 }: RepeatableFormProps) {
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
      Dodaj kolejną pozycje do oddania
    </Button>
  );
  const handleFileRead = async (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = event?.target?.files?.[0];
    if (file) {
      Object.assign(base64.current, { [id]: await convertBase64(file) });
    }
  };
  const convertBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = error => {
        reject(error);
      };
    });
  };

  // @ts-ignore
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
                width={300}
              />
              <FormInput<FoodType>
                key={`desc.${field.id}`}
                label="Opis"
                width={300}
                formValueName={`food.${index}.description` as any}
              />

              <FormInput<FoodType>
                key={`due.${field.id}`}
                type="date"
                formValueName={`food.${index}.dueDate` as any}
                label="Termin ważności"
                width={300}
              />
              <div style={{ display: "none" }}>
                <FormInput<FoodType>
                  key={`image.${field.id}`}
                  type="text"
                  formValueName={`food.${index}.image` as any}
                  label="obraz"
                  width={300}
                />
                <FormInput<FoodType>
                  key={`_id.${field.id}`}
                  type="hidden"
                  defaultValue={`${field.id}`}
                  formValueName={`food.${index}._id` as any}
                />
              </div>

              <Input
                id="originalFileName"
                type="file"
                inputProps={{ accept: "image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt" }}
                required
                name="originalFileName"
                onChange={(e: any) => handleFileRead(e, field.id)}
                size="small"
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
  const bearerToken = useSelector((state: RootState) => state.authReducer.authUser.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!bearerToken) {
      navigate("/login");
    }
  }, [bearerToken]);

  const form = useForm<AdvertisementForm>({
    defaultValues: {
      lat: 51,
      lng: 21,
      description: "",
      food: [EMPTY_FOOD],
    },
    resolver: yupResolver(validationSchema),
  });

  const history = useNavigate();
  const base64 = useRef<Record<string, string>>({});
  const { handleSubmit } = form;
  const handleFormSubmit = async (data: AdvertisementForm) => {
    data.food.forEach(function (food: FoodType) {
      food.image = base64.current[food._id];
    });
    const result = await postAdvertisement(data);
    if (isApiResponse(result)) {
      toast.success("Oferta dodana.");
      history("/map");
      return;
    }

    toast.error("Błąd podczas dodawania oferty.");
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
            <FormInput<AdvertisementForm>
              formValueName="description"
              label="description"
              width={300}
            />
            <FormInput<AdvertisementForm> formValueName="lat" label="Lat" width={300} />
            <FormInput<AdvertisementForm> formValueName="lng" label="Lng" width="100%" />
            <RepeatableForm form={form} base64={base64} />

            <Button sx={{ marginTop: "10px" }} disabled={isLoading} color="primary" type="submit">
              Wyślij formularz
            </Button>
          </form>
        </Paper>
      </FormProvider>
    </Box>
  );
}

function isApiResponse(response: any): response is { data: { lng: number } } {
  return Boolean(response?.data?.lng);
}
