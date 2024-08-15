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
import { addPointsCriteria, updatePointsCriteria } from "../../services/pointsCriterias";
import { toast } from "react-toastify";

export default function AddPointsCriteria({
  open,
  onClose,
  isUpdate,
  pointsCriteriaData,
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
      title: isUpdate ? pointsCriteriaData["title"] : "",
      points: isUpdate ? pointsCriteriaData["points"] : 0,
      icon: isUpdate ? pointsCriteriaData["icon"] : "",
      description: isUpdate ? pointsCriteriaData["description"] : "",
      conditions: isUpdate ? pointsCriteriaData["conditions"] : "",
    });
  }, [open, isUpdate, pointsCriteriaData, reset]);

  const onSubmit = async (data) => {
    if (isUpdate) {
      editPointsCriteria(data);
    } else {
      addPointsCriteriaHandler(data);
    }
  };

  const addPointsCriteriaHandler = (data) => {
    addPointsCriteria(data)
      .then((res) => {
        if (res.status) {
          toast.success("Points criteria added successfully");
          isSubmitted();
          onClose();
        }
      })
      .catch((error) => {
        toast.error(error.response?.message || "Failed to add points criteria");
      });
  };

  const editPointsCriteria = (data) => {
    updatePointsCriteria(pointsCriteriaData._id, data)
      .then((res) => {
        if (res.status) {
          toast.success("Points criteria updated successfully");
          isSubmitted();
          onClose();
        }
      })
      .catch((error) => {
        toast.error(error.response?.message || "Failed to update points criteria");
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
          {isUpdate ? "Edit" : "Add"} Points Criteria
        </Typography>
        <IconButton onClick={dialogClose}>
          <Close />
        </IconButton>
      </Stack>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack p={2} spacing={2}>
          <Stack>
            <Typography variant="subtitle2">Title</Typography>
            <Controller
              name="title"
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
                    <span style={errorMsgStyle}>
                      {errors.points.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Enter Points" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Icon</Typography>
            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    placeholder="Enter Icon URL"
                    {...field}
                  />
                  {/* {errors.icon && (
                    <span style={errorMsgStyle}>
                      {errors.icon.message}
                    </span>
                  )} */}
                </>
              )}
            //   rules={{ required: "Enter Icon URL" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Description</Typography>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    placeholder="Enter Description"
                    multiline
                    {...field}
                  />
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
            <Typography variant="subtitle2">Conditions</Typography>
            <Controller
              name="conditions"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    placeholder="Enter Conditions"
                    multiline
                    {...field}
                  />
                  {errors.conditions && (
                    <span style={errorMsgStyle}>
                      {errors.conditions.message}
                    </span>
                  )}
                </>
              )}
            //   rules={{ required: "Enter Conditions" }}
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
