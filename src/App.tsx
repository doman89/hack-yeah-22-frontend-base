import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Provider as ReduxProvider } from "react-redux";
import { toast, ToastContainer, ToastContainerProps } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material/styles";

import { store } from "./modules/common/store";

import "./App.css";
import LoginPage from "./modules/auth/pages/Login";

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
        <div className="layout">
          <Routes>
            <Route element={<LoginPage />} path="/" />
          </Routes>
        </div>
      </ReduxProvider>
    </ThemeProvider>
  </BrowserRouter>
);

const theme = createTheme();
