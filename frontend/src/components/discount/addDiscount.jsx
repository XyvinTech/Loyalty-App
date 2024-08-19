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
import { addDiscount, updateDiscount } from "../../services/discount";
import { toast } from "react-toastify";
import { getTiers } from "../../services/tier";
import StyledSelectField from "../../ui/styledSelectField";

export default function AddDiscount({
  open,
  onClose,
  isUpdate,
  discountsData,
  isSubmitted,
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [tierOptions, setTierOptions] = useState([]);

  useEffect(() => {
    getTiers().then((res) => {
      if (res.status) {
        setTierOptions(
          res.result.map((tier) => ({ label: tier.tierName, value: tier._id }))
        );
      }
    });

    reset({
      title: isUpdate ? discountsData.title : "",
      discountCode: isUpdate ? discountsData.DiscountCode : "",
      description: isUpdate ? discountsData.description : "",
      percentage: isUpdate ? discountsData.percentage : "",
      tierRequired: isUpdate ? discountsData.tierRequired : "",
      validFrom: isUpdate ? discountsData.validFrom : "",
      validTo: isUpdate ? discountsData.validTo : "",
      status: isUpdate ? discountsData.status : "",
    });
  }, [open, isUpdate, discountsData, reset]);

  const onSubmit = async (data) => {
    if (isUpdate) {
      editDiscount(data);
    } else {
      addDiscountHandler(data);
    }
  };

  const addDiscountHandler = (data) => {
    addDiscount(data)
      .then((res) => {
        if (res.status) {
          toast.success("Discount added successfully");
          isSubmitted();
          onClose();
        }
      })
      .catch((error) => {
        toast.error(error.response?.message || "Failed to add Discount");
      });
  };

  const editDiscount = (data) => {
    updateDiscount(discountsData._id, data)
      .then((res) => {
        if (res.status) {
          toast.success("Discount updated successfully");
          isSubmitted();
          onClose();
        }
      })
      .catch((error) => {
        toast.error(error.response?.message || "Failed to update Discount");
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
          {isUpdate ? "Edit" : "Add"} Discount
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
            <Typography variant="subtitle2">Discount Code</Typography>
            <Controller
              name="DiscountCode"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    type="text"
                    placeholder="Enter Discount Code"
                    {...field}
                  />
                  {errors.DiscountCode && (
                    <span style={errorMsgStyle}>
                      {errors.DiscountCode.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Enter Discount Code" }}
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
                    type="text"
                    placeholder="Enter Description"
                    {...field}
                  />
                  {errors.description && (
                    <span style={errorMsgStyle}>
                      {errors.description.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Enter description" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Percentage</Typography>
            <Controller
              name="percentage"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    type="number"
                    placeholder="Enter Percentage"
                    {...field}
                  />
                  {errors.percentage && (
                    <span style={errorMsgStyle}>
                      {errors.percentage.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Enter Percentage" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Tier Required </Typography>
            <Controller
              name="tierRequired"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    options={tierOptions}
                    value={field.value}
                    placeholder="Select tier"
                    onChange={field.onChange}
                  />
                  {errors.tierRequired && (
                    <span style={errorMsgStyle}>
                      {errors.tierRequired.message}
                    </span>
                  )}
                </>
              )}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Valid From</Typography>
            <Controller
              name="validFrom"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    type="date"
                    placeholder="Enter Valid From"
                    {...field}
                  />
                  {errors.validFrom && (
                    <span style={errorMsgStyle}>
                      {errors.validFrom.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Enter Valid From" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Valid To</Typography>
            <Controller
              name="validTo"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    type="date"
                    placeholder="Enter Valid To"
                    {...field}
                  />
                  {errors.validTo && (
                    <span style={errorMsgStyle}>{errors.validTo.message}</span>
                  )}
                </>
              )}
              rules={{ required: "Enter Valid To" }}
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
