import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useSideMenuContext } from "../../context/SideMenu";
import { SideMenuButton } from "../SideMenuButton/SideMenuButton";

export function SideMenu() {
  const { isSideMenuActive } = useSideMenuContext();

  return (
    <SideBar isActive={isSideMenuActive}>
      <SideMenuButton component={Link} to="/register">
        Rejestracja uzytkownika
      </SideMenuButton>
      <SideMenuButton component={Link} to="/login">
        Strona logowania
      </SideMenuButton>
      <SideMenuButton component={Link} to="/map">
        Google Map
      </SideMenuButton>
    </SideBar>
  );
}

const SideBar = styled(
  "div",
  {},
)<{ isActive: boolean }>(({ isActive, theme }) => ({
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  width: "calc(100vw - 40px)",
  maxWidth: 300,
  padding: theme.spacing(1, 0),
  backgroundColor: "#222222",
  transition: "0.3s",
  transform: "translateX(0)",
  ...(isActive && {
    boxShadow: "0 1px 4px rgb(0 0 0 / 16%), -3px 0px 3px 1px rgb(163 38 123 / 50%)",
    transform: "translateX(calc(-100%))",
  }),

  [theme.breakpoints.up("sm")]: {
    right: 0,
    left: "unset",
    top: 60,
    visibility: "visible",
    justifyContent: "flex-start",
    ...(isActive && {
      visibility: "hidden",
      transform: "translateX(100%)",
      boxShadow: "0 1px 4px rgb(0 0 0 / 16%), 3px 0px 3px 1px rgb(163 38 123 / 50%)",
    }),
  },
}));
