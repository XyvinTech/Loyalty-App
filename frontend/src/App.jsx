import React from "react";
import theme from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import RouteRenderer from "./core/routes/routeRender";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastContainer autoClose={3000} position="bottom-right"/>
        <RouteRenderer />
      </LocalizationProvider>
    </ThemeProvider>
  );
}