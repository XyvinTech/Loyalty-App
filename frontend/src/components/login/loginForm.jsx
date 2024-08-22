import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  LockOutlined,
  Person,
  PersonOffOutlined,
  PersonOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
  const navigation = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
    const adminLogin = await login(data);
    if (adminLogin.status) {
      localStorage.setItem("token", adminLogin.token);
      navigation("/dashboard/transaction");
      
      toast.success(adminLogin.message);
    } else {
      toast.error(adminLogin.error);
    }
  };

  useEffect(() => {

    localStorage.clear();
  },[]);

  return (

    <Box sx={{ width: { xs: "80vw", md: "25vw" } }}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack spacing={2}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Email"
                  placeholder="Enter email"
                  {...field}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.email && <span style={errorMsgStyle}>{errors.email.message}</span>}
              </>
            )}
            rules={{ required: "Enter Email" }}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter Password"
                  {...field}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={() => {
                            setPasswordVisible(!passwordVisible);
                          }}
                        >
                          {passwordVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && <span style={errorMsgStyle}>{errors.password.message}</span>}
              </>
            )}
            rules={{ required: "Enter Password" }}
          />
        </Stack>
        <Box mt={5}>
          <Button variant="contained" sx={{ borderRadius: 8, width: "100%" , backgroundColor:"#76ac0b" }} type="submit">
            Submit
          </Button>
        </Box>
      </form>
      <Box sx={{ mt: 5, display: "flex" }}>
        <Typography sx={{ color: "#777", cursor: "pointer", userSelect: "none" }}>
          Forgot Password?
        </Typography>
      </Box>
    </Box>

  );
}

const errorMsgStyle = {
  color: "red",
  fontSize: "12px",
  fontStyle: "italic",
};
