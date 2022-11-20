import { Box, Button, Popper, styled } from "@mui/material";
import { useState, MouseEvent, ReactNode } from "react";

type MarkerPopperProps = {
  description?: string;
  owner?: string;
  reservation?: string;
  image?: string;
  food?: string[];
};

export function MarkerPopper({ description, owner, reservation, image, food }: MarkerPopperProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <Button type="button" onClick={handleClick}>
        Show details
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: 9999 }}>
        <Box>
          <PopperWrapper>
            <h3>{owner}</h3>
            <img src={image} alt="" />
            <p>{reservation}</p>
            <p>{food}</p>
            <p>{description}</p>
          </PopperWrapper>
        </Box>
      </Popper>
    </>
  );
}

const PopperWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 2),
  backgroundColor: "#FFFFFF",
}));
