import { Box, Button, Paper, Typography } from "@mui/material";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../common/components/Header/Header";

import { Food, useGetAdvertisementQuery } from "../api/advertisements";
import { useReserveFoodMutation } from "../api/Reservation";
import { Zapierdalacz } from "../../common/components/Zapierdalacz/Zapierdalacz";

export default function DetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetAdvertisementQuery({ id: id?.toString() ?? "" });

  if (isLoading || !data) {
    return <Zapierdalacz/>;
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
        <Header label={data.owner.email} />
        <Typography>{data.description}</Typography>
        <Typography>Posiłki do podzielenia się:</Typography>
        <>
          {data.food.map((meal, id) => (
            <li>
              <Meal key={meal.id} {...meal} />
            </li>
          ))}
        </>
      </Paper>
    </Box>
  );
}

function Meal({ available, name, description, image, reserved, id }: Food) {
  const [reserveFood, { isLoading }] = useReserveFoodMutation();

  const handleClick = async () => {
    const result = await reserveFood({ id: id.toString() });

    if ("error" in result) {
      toast("Oops... coś poszło nie tak");
      return;
    }

    toast("Jedzonko zostało zarezerwowane!");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", border: "solid 1px #cccccc" }}>
      <Typography>Nazwa produktu: {name}</Typography>
      <Typography>Opis produktu: {description}</Typography>
      <img src={image} width={"100%"} style={{maxWidth:"400", margin: "10px 0 10px 0"}} height="auto" />
      <>
        {available && !reserved ? (
          <Button disabled={isLoading} onClick={handleClick}>
            Zarezerwuj
          </Button>
        ) : (
          <Typography>Nie dostępne juz</Typography>
        )}
      </>

    </Box>
  );
}
