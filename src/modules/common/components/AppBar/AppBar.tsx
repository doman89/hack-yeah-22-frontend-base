import { styled } from "@mui/material";
import { useMatch } from "react-router-dom";
import { useMapSwitcherContext } from "../../context/MapSwitcher";
import { Button } from "@mui/material";

import { useSideMenuContext } from "../../context/SideMenu";
import { BurgerMenuButton } from "./BurgerMenuButton";

export function AppBar() {
  const { isSideMenuActive, toggleSideMenu } = useSideMenuContext();
  const { isMapActive, toggleMap } = useMapSwitcherContext();
  const matchPath = useMatch("/map");

  return (
    <Wrapper>
      <BurgerMenuButton isActive={isSideMenuActive} onClick={() => toggleSideMenu()} />
      {Boolean(matchPath) && (
        <Button sx={{ color: "#ffffff" }} type="button" onClick={() => toggleMap()}>
          {isMapActive ? "Pokaż listę" : "Pokaż mapę"}
        </Button>
      )}
    </Wrapper>
  );
}

const Wrapper = styled("div")(({ theme }) => ({
  position: "relative",
  zIndex: 1000,
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
