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
import StyledSelectField from "../../ui/styledSelectField";
import { addCoupon, updateCoupon } from "../../services/coupon";
import { toast } from "react-toastify";
import StyledDateField from "../../ui/StyledDateField";
import { getCategory } from "../../services/category";
import { getBrand } from "../../services/brands";

export default function AddCoupon({
  open,
  onClose,
  isUpdate,
  couponsData,
  isSubmitted,
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [brandOptions, setBrandOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    getBrand().then((res) => {
      if (res.status) {
        setBrandOptions(
          res.result.map((brand) => ({ label: brand.title, value: brand._id }))
        );
      }
    });

    getCategory().then((res) => {
      if (res.status) {
        setCategoryOptions(
          res.result.map((category) => ({
            label: category.title,
            value: category._id,
          }))
        );
      }
    });

    reset({
      title: isUpdate ? couponsData.title : "",
      description: isUpdate ? couponsData.description : "",
      brand: isUpdate ? couponsData.brand : "",
      otp: isUpdate ? couponsData.otp : "",
      points_required: isUpdate ? couponsData.points_required : 0,
      coin_cost: isUpdate ? couponsData.coin_cost : 0,
      starts_from: isUpdate ? couponsData.starts_from : "",
      expiry: isUpdate ? couponsData.expiry : "",
      no_of_cards: isUpdate ? couponsData.no_of_cards : 0,
      availability_criteria: isUpdate ? couponsData.availability_criteria : "",
      category: isUpdate ? couponsData.category : "",
    });
  }, [open, isUpdate, couponsData, reset]);

  const onSubmit = async (data) => {
    if (isUpdate) {
      editCoupon(data);
    } else {
      addCouponHandler(data);
    }
  };

  const addCouponHandler = (data) => {
    addCoupon(data)
      .then((res) => {
        if (res.status) {
          toast.success("Coupon added successfully");
          isSubmitted();
          onClose();
        }
      })
      .catch((error) => {
        toast.error(error.response?.message || "Failed to add Coupon");
      });
  };

  const editCoupon = (data) => {
    updateCoupon(couponsData._id, data)
      .then((res) => {
        if (res.status) {
          toast.success("Coupon updated successfully");
          isSubmitted();
          onClose();
        }
      })
      .catch((error) => {
        toast.error(error.response?.message || "Failed to update Coupon");
      });
  };

  const dialogClose = () => {
    reset({});
    onClose();
  };

  console.log(categoryOptions);

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
          {isUpdate ? "Edit" : "Add"} Coupon
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
            <Typography variant="subtitle2">Description</Typography>
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
            <Typography variant="subtitle2">Brand</Typography>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    options={brandOptions}
                    value={field.value}
                    placeholder="Select Brand"
                    onChange={field.onChange}
                  />
                  {errors.brand && (
                    <span style={errorMsgStyle}>{errors.brand.message}</span>
                  )}
                </>
              )}
            />
          </Stack>

          <Stack>
            <Typography variant="subtitle2">Points required</Typography>
            <Controller
              name="points_required"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    placeholder="Enter points required"
                    {...field}
                  />
                  {errors.points_required && (
                    <span style={errorMsgStyle}>
                      {errors.points_required.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Enter points required" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Coin cost</Typography>
            <Controller
              name="coin_cost"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield placeholder="Enter coin cost" {...field} />
                  {errors.coin_cost && (
                    <span style={errorMsgStyle}>
                      {errors.coin_cost.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Enter coin cost" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Starts From</Typography>
            <Controller
              name="starts_from"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    type="date"
                    placeholder="Enter Starts From"
                    {...field}
                  />
                  {errors.starts_from && (
                    <span style={errorMsgStyle}>
                      {errors.starts_from.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Enter Starts From" }}
            />
          </Stack>

          <Stack>
            <Typography variant="subtitle2">expiry</Typography>
            <Controller
              name="expiry"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    type="date"
                    placeholder="Enter expiry"
                    {...field}
                  />
                  {errors.expiry && (
                    <span style={errorMsgStyle}>{errors.expiry.message}</span>
                  )}
                </>
              )}
              rules={{ required: "Enter expiry" }}
            />
          </Stack>

          <Stack>
            <Typography variant="subtitle2">No of Cards</Typography>
            <Controller
              name="no_of_cards"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    placeholder="Enter No. of cards"
                    {...field}
                  />
                  {errors.no_of_cards && (
                    <span style={errorMsgStyle}>
                      {errors.no_of_cards.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Enter No. of cards" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Availability Criteria</Typography>
            <Controller
              name="availability_criteria"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    placeholder="Enter availability criteria"
                    {...field}
                  />
                  {errors.availability_criteria && (
                    <span style={errorMsgStyle}>
                      {errors.availability_criteria.message}
                    </span>
                  )}
                </>
              )}
              //   rules={{ required: "Enter availability criteria" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Category</Typography>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    options={categoryOptions}
                    value={field.value}
                    placeholder="Select Category"
                    onChange={field.onChange}
                  />
                  {errors.category && (
                    <span style={errorMsgStyle}>{errors.category.message}</span>
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
          <Button variant="contained" type="submit">
            {isUpdate ? "Update" : "Add"}
          </Button>
        </Stack>
      </form>
    </Dialog>
  );
}

const errorMsgStyle = {
  color: "red",
  fontSize: "0.8rem",
};
