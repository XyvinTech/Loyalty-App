import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import StyledTextfield from "../../ui/styledTextfield";
// import { addUser, updateUser } from "../services/users";
import { addUser ,updateUser} from "../../services/users";
import { toast } from "react-toastify";

export default function AddUser({
  open,
  onClose,
  isUpdate,
  userData,
  isSubmitted,
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      email: isUpdate ? userData["email"] : "",
      phoneNumber: isUpdate ? userData["phoneNumber"] : "",
      clientCompany: isUpdate ? userData["clientCompany"] : "",
      points: isUpdate ? userData["points"] : 0,
    //   tier: isUpdate ? userData["tier"] : "",
      referralCode: isUpdate ? userData["referralCode"] : "",
    });
  }, [open]);

  const onSubmit = async (data) => {
    if (isUpdate) {
      editUser(data);
    } else {
      addUserHandler(data);
    }
  };

  const addUserHandler = (data) => {
    addUser(data)
      .then((res) => {
        if (res.status) {
          toast.success("User added successfully");
          isSubmitted();
          onClose();
        }
      })
      .catch((error) => {
        toast.error(error.response.message);
      });
  };

  const editUser = (data) => {
    updateUser(userData._id, data)
      .then((res) => {
        if (res.status) {
          toast.success("User updated successfully");
          isSubmitted();
          onClose();
        }
      })
      .catch((error) => {
        toast.error(error.response.message);
      });
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
          {isUpdate ? "Edit" : "Add"} User
        </Typography>
        <IconButton onClick={dialogClose}>
          <Close />
        </IconButton>
      </Stack>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack p={2} spacing={2}>
          <Stack>
            <Typography variant="subtitle2">Email</Typography>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield placeholder="Enter Email" {...field} />
                  {errors.email && (
                    <span style={errorMsgStyle}>{errors.email.message}</span>
                  )}
                </>
              )}
              rules={{ required: "Enter Email" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Phone Number</Typography>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    placeholder="Enter Phone Number"
                    {...field}
                  />
                  {errors.phoneNumber && (
                    <span style={errorMsgStyle}>
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Enter Phone Number" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Client Company</Typography>
            <Controller
              name="clientCompany"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    placeholder="Enter Client Company"
                    {...field}
                  />
                  {errors.clientCompany && (
                    <span style={errorMsgStyle}>
                      {errors.clientCompany.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Enter Client Company" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Points</Typography>
            <Controller
              name="points"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    type="number"
                    placeholder="Enter Points"
                    {...field}
                  />
                  {errors.points && (
                    <span style={errorMsgStyle}>{errors.points.message}</span>
                  )}
                </>
              )}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Referral Code</Typography>
            <Controller
              name="referralCode"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    placeholder="Enter Referral Code"
                    {...field}
                  />
                  {errors.referralCode && (
                    <span style={errorMsgStyle}>
                      {errors.referralCode.message}
                    </span>
                  )}
                </>
              )}
            />
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
