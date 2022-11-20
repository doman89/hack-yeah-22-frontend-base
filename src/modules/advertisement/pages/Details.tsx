import { Box, Paper } from "@mui/material";

import { useParams } from "react-router-dom";

import { useGetAdvertisementQuery } from "../api/advertisements";

export default function DetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetAdvertisementQuery({ id: id?.toString() ?? "" });

  if (isLoading || !data) {
    return <p>"Kolejne fancy ładowanie..."</p>;
  }

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
      <Paper
        sx={{
          p: 3,
        }}
      >
        What
      </Paper>
    </Box>
  );
}
