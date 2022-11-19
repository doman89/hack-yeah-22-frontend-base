import { Button as MuiButton } from "@mui/material";
import styled from "styled-components";

type BurgerMenuButtonProps = {
  controlledElementId?: string;
  isActive: boolean;
  onClick: () => void;
};

export function BurgerMenuButton({
  controlledElementId,
  isActive,
  onClick,
}: BurgerMenuButtonProps) {
  return (
    <Button
      aria-controls={controlledElementId}
      aria-expanded={isActive}
      aria-label="show navigation menu"
      className={isActive ? "active" : undefined}
      type="button"
      onClick={onClick}
      disableRipple
    >
      <Line aria-hidden="true" />
      <Line aria-hidden="true" />
      <Line aria-hidden="true" />
    </Button>
  );
}

const Button = styled(MuiButton)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: 40,
  height: 40,
  marginLeft: theme.spacing(2),
  padding: theme.spacing(1.25, 0.625),
  border: 0,
  borderRadius: 16,
  outline: 0,
  opacity: 1,
  backgroundColor: "transparent",
  cursor: "pointer",

  [theme.breakpoints.up("sm")]: {
    marginLeft: "unset",
    marginRight: theme.spacing(2),
  },
}));

const Line = styled("span")(({ theme }) => ({
  width: 30,
  height: 3,
  transition: ".3s ease-in",
  backgroundColor: "#ffffff",

  ".active &:not(:nth-of-type(2))": {
    width: 42,
  },

  ".active &:nth-of-type(1)": {
    transform: "translateY(-6px) rotate(45deg)",
    transformOrigin: "center left",
  },

  ".active &:nth-of-type(2)": {
    opacity: 0,
  },

  ".active &:nth-of-type(3)": {
    transform: "translateY(7px) rotate(-45deg)",
    transformOrigin: "center left",
  },
}));
