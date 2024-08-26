import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import LoginForm from "../components/login/loginForm";
import logo from "../assets/logo/logo-new.jpeg";
import cbsLogo from "../assets/logo/set.png";
import kedmah from "../assets/logo/Kedmah.jpg";

export default function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#e3f7ca",
      }}
    >
      <Stack direction={"column"} spacing={5}>
        <Box
          sx={{
            borderRadius: "8px",
            p: 4,
            boxShadow: "0 0 6px #5559",
            backgroundColor: "#ffffff",
          }}
        >
          <Box sx={{ mt: 1 }}>
            <img
              width={"100%"}
              height={"200px"}
              style={{ objectFit: "contain"}}
              src={kedmah}
              alt="logo"
            />
          </Box>
          <LoginForm />
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography align="center" marginBottom={1}>Powered By</Typography>

          <img
            width={"50%"}
            height={"100"}
            style={{ objectFit: "contain"}}
            src={logo}
            alt="logo"
          />

          <img
            width={"50%"}
            height={"100"}
            style={{ objectFit: "contain" }}
            src={cbsLogo}
            alt="logo"
          />
        </Box>
      </Stack>
    </Box>
  );
}
