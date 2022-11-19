import { styled } from "@mui/material";

import { useSideMenuContext } from "../../context/SideMenu";
import { BurgerMenuButton } from "./BurgerMenuButton";

export function AppBar() {
  const { isSideMenuActive, toggleSideMenu } = useSideMenuContext();

  return (
    <Wrapper>
      <BurgerMenuButton isActive={isSideMenuActive} onClick={() => toggleSideMenu()} />
    </Wrapper>
  );
}

const Wrapper = styled("div")(({ theme }) => ({
  gridArea: "app-bar",
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(1, 2),
  backgroundColor: "#222222",

  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    padding: theme.spacing(1, 4),
  },
}));
