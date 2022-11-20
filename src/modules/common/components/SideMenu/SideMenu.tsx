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
        Mapa
      </SideMenuButton>
      <SideMenuButton component={Link} to="/advertisement">
        Advertisement
      </SideMenuButton>
    </SideBar>
  );
}

const SideBar = styled(
  "div",
  {},
)<{ isActive: boolean }>(({ isActive, theme }) => ({
  zIndex: 500000,
  display: "none",
  flexDirection: "column",
  justifyContent: "flex-end",
  position: "absolute",
  top: 0,
  bottom: 50,
  left: 0,
  width: "calc(100vw - 40px)",
  maxWidth: 300,
  backgroundColor: "#222222",
  transition: "ease-in-out 0.3s",
  transform: "translateX(calc(-100%))",

  ...(isActive && {
    display: "flex",
    transform: "translateX(0)",
    boxShadow: "0 1px 4px rgb(0 0 0 / 16%), -3px 0px 3px 1px rgb(163 38 123 / 50%)",
  }),

  [theme.breakpoints.up("sm")]: {
    bottom: 0,
    left: "unset",
    top: 70,
    visibility: "visible",
    justifyContent: "flex-start",
  },
}));
