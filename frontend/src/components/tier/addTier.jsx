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
import { addTier, updateTier } from "../../services/tier";
import { toast } from "react-toastify";

export default function AddTire({
  open,
  onClose,
  isUpdate,
  tiersData,
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
        tier_name: isUpdate ? tiersData["tier_name"] : "",
        point_level: isUpdate ? tiersData["point_level"] : 0,
    });
  }, [open, isUpdate, tiersData, reset]);

  const onSubmit = async (data) => {
    if (isUpdate) {
      editTier(data);
    } else {
      addTierHandler(data);
    }
  };

  const addTierHandler = (data) => {
    addTier(data)
      .then((res) => {
        if (res.status) {
          toast.success("Tier added successfully");
          isSubmitted();
          onClose();
        }
      })
      .catch((error) => {
        toast.error(error.response?.message || "Failed to add Tier");
      });
  };

  const editTier = (data) => {
    updateTier(tiersData._id, data)
      .then((res) => {
        if (res.status) {
          toast.success("Tier updated successfully");
          isSubmitted();
          onClose();
        }
      })
      .catch((error) => {
        toast.error(error.response?.message || "Failed to update Tier");
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
          {isUpdate ? "Edit" : "Add"} Tier
        </Typography>
        <IconButton onClick={dialogClose}>
          <Close />
        </IconButton>
      </Stack>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack p={2} spacing={2}>
          <Stack>
            <Typography variant="subtitle2">Tier name</Typography>
            <Controller
              name="tier_name"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield placeholder="Enter Title" {...field} />
                  {errors.title && (
                    <span style={errorMsgStyle}>{errors.title.message}</span>
                  )}
                </>
              )}
              rules={{ required: "Enter Title" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Point Level</Typography>
            <Controller
              name="point_level"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    type="number"
                    placeholder="Enter Points"
                    {...field}
                  />
                  {errors.points && (
                    <span style={errorMsgStyle}>
                      {errors.points.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Enter Points" }}
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
