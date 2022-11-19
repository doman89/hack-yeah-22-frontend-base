import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Provider as ReduxProvider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material/styles";
import styled from "styled-components";

import { store } from "./modules/common/store";

import "./App.css";
import LoginPage from "./modules/auth/pages/Login";
import { AppBar } from "./modules/common/components/AppBar/AppBar";
import { SideMenuProvider } from "./modules/common/context/SideMenu";
import { SideMenu } from "./modules/common/components/SideMenu/SideMenu";
import MapPage from "./modules/map/pages/MapPage";

export const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Helmet
        defaultTitle="Course about everything for everyone"
        titleTemplate="%s - Coursopedia"
      />
      <ReduxProvider store={store}>
        <ToastContainer
          autoClose={5000}
          className="toast-container"
          closeButton={false}
          closeOnClick={false}
          draggable={false}
          limit={5}
          position={toast.POSITION.BOTTOM_RIGHT}
          hideProgressBar
          newestOnTop
          pauseOnFocusLoss
          pauseOnHover
        />
        <Layout>
          <SideMenuProvider>
            <AppBar />
            <SideMenu />
          </SideMenuProvider>
          <Content>
            <Routes>
              <Route element={<LoginPage />} path="/login" />
              <Route element={<MapPage />} path="/map" />
            </Routes>
          </Content>
        </Layout>
      </ReduxProvider>
    </ThemeProvider>
  </BrowserRouter>
);

const theme = createTheme();

const Content = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gridArea: "content",
  padding: theme.spacing(4),
  overflowY: "auto",
}));

const Layout = styled("div")(({ theme }) => ({
  display: "grid",
  flexDirection: "column",
  gridTemplateColumns: "1fr",
  gridAutoRows: "1fr 50px",
  gridTemplateAreas: `
    "content content"
    "app-bar app-bar"
  `,
  maxWidth: "100%",
  minHeight: "100vh",
  overflow: "hidden",

  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "1fr",
    gridAutoRows: "70px 1fr",
    gridTemplateAreas: `
    "app-bar app-bar"
    "content content"
  `,
  },
}));
