import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import StyledTextfield from "../../ui/styledTextfield";
import {
  addCategory,
  getCategory,
  updateCategory,
} from "../../services/category";
import { toast } from "react-toastify";
import { addApp, updateApp } from "../../services/apps.js";
import StyledDropdown from "../../ui/StyledDropdown.jsx";
import { uploadFile } from "../../services/upload.js";

export default function AddApp({
  open,
  onClose,
  isUpdate,
  appsData,
  isSubmitted,
}) {
  const [selectedFile, setSelectedFile] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      logo: isUpdate ? appsData["Logo"] : "",
      title: isUpdate ? appsData["Title"] : "",
      description: isUpdate ? appsData["Description"] : "",
    });
  }, [open]);

  const onSubmit = async (data) => {
    if (selectedFile) {
      const url = await uploadFile(selectedFile);
      data.logo = url.data[0].url;
    }
    if (isUpdate) {
      editApp(data);
    } else {
      addApps(data);
    }
  };

  const addApps = (data) => {
    let dt = {
      ...data,
    };
    addApp(dt)
      .then((res) => {
        if (res.status) {
          toast.success("Successfully added");
          isSubmitted();
          onClose();
        }
      })
      .catch((error) => {
        toast.error(error.response.message);
      });
  };

  const editApp = (data) => {
    let dt = {
      ...data,
    };
    updateApp(appsData._id, dt)
      .then((res) => {
        if (res.status) {
          toast.success("Successfully Upated");
          isSubmitted();
          onClose();
        }
      })
      .catch((error) => {
        toast.error(error.response.message);
      });
  };
  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const dialogClose = () => {
    reset({});
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={2}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: "primary.dark", fontWeight: 600 }}
        >
          {isUpdate ? "Edit" : "Add"} Apps
        </Typography>
        <IconButton onClick={dialogClose}>
          <Close />
        </IconButton>
      </Stack>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack p={2} spacing={2}>
          <Stack>
            <Typography variant="subtitle2">Title </Typography>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield placeholder="Enter App name" {...field} />
                  {errors.title && (
                    <span style={errorMsgStyle}>{errors.title.message}</span>
                  )}
                </>
              )}
              rules={{ required: "Enter App Name" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Description </Typography>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield placeholder="Enter Description" {...field} />
                  {errors.description && (
                    <span style={errorMsgStyle}>
                      {errors.description.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Enter Description" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Logo</Typography>
            <input
              accept="image/*"
              style={{ display: "none" }}
              type="file"
              id="raised-button-file"
              onChange={onFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                sx={{ textTransform: "none", height: "40px" }}
                onClick={() => {
                  document.getElementById("raised-button-file").click();
                }}
              >
                Add Logo
              </Button>
            </label>
          </Stack>
        </Stack>
        <Stack direction={"row"} justifyContent={"end"} p={2} spacing={2}>
          <Button
            variant="outlined"
            sx={{ borderColor: "#777", color: "#777" }}
            onClick={dialogClose}
          >
            Cancel
          </Button>
          <Button variant="outlined" type="submit">
            {isUpdate ? "Update" : "Add"}
          </Button>
        </Stack>
      </form>
    </Dialog>
  );
}

const errorMsgStyle = {
  color: "red",
  fontSize: "12px",
  fontStyle: "italic",
};
