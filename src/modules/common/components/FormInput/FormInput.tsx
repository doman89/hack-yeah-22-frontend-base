import { Box, Input, Typography } from "@mui/material";
import { FieldError, FieldValues, Path, useController, useFormContext } from "react-hook-form";

import { ReactNode, useEffect } from "react";

type FormInputProps<T> = {
  isDisabled?: boolean;
  formValueName: Path<T>;
  label?: ReactNode;
  placeholder?: string;
  width?: number | string;
  type?: string;
  defaultValue?: string;
};

export function FormInput<T extends FieldValues>({
  formValueName,
  isDisabled,
  label,
  placeholder,
  width,
  defaultValue,
  type,
}: FormInputProps<T>) {
  const { control, setValue } = useFormContext<T>();
  const { field, formState } = useController({
    name: formValueName,
    control,
  });

  useEffect(() => {
      if (type === "hidden") {
          // @ts-ignore
          setValue(formValueName, defaultValue ?? "")
      }
  }, [])

  const isError = Boolean(formState.errors[formValueName]);

  const { onChange, value, ...fieldRest } = field;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: width ?? 200,
        padding: 1,
      }}
    >
      {label ? <Typography>{label}</Typography> : null}
      <Input
        sx={{}}
        {...fieldRest}
        disabled={isDisabled}
        error={isError}
        value={field.value}
        placeholder={placeholder}
        type={type}
        onChange={event => {
          const {
            currentTarget: { value },
          } = event;

          if (value === "") {
            onChange(null);
            return;
          }

          onChange(event);
        }}
      />
      {typeof formState.errors[formValueName]?.message === "string" ? (
        <Typography>{(formState.errors[formValueName] as FieldError).message}</Typography>
      ) : null}
    </Box>
  );
}
