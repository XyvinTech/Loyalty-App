// import { Close } from "@mui/icons-material";
// import {
//   Button,
//   Dialog,
//   Divider,
//   IconButton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import StyledTextfield from "../../ui/styledTextfield";
// import StyledSelectField from "../../ui/styledSelectField";
// import { addCoupon, updateCoupon } from "../../services/coupon";
// import { toast } from "react-toastify";
// import { getCategory } from "../../services/category";
// import { getBrand } from "../../services/brands";
// import AsyncSelect from "react-select/async";
// import { getApp } from "../../services/apps"

// export default function AddCoupon({
//   open,
//   onClose,
//   isUpdate,
//   couponsData,
//   isSubmitted,
// }) {

//   const [appOptions, setAppOptions] = useState([]);
//   const [brandOptions, setBrandOptions] = useState([]);
//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       title: "",
//       description: "",
//       apps: [],
//       image: "",
//       points_required: 0,
//       starts_from: "",
//       expiry: "",
//       status: "active",
//     },
//   });
  
//   const AvailabilityArray = [
//     {
//       code: 10,
//       label: "Once in a month",
//     },
//     {
//       code: 11,
//       label: "Twice in a month",
//     },
//     {
//       code: 12,
//       label: "Thrice in a month",
//     },
//   ];

//   useEffect(() => {
//     getBrand().then((res) => {
//       if (res.status) {
//         setBrandOptions(
//           res.result.map((brand) => ({ label: brand.title, value: brand._id }))
//         );
//       }
//     });

//     getCategory().then((res) => {
//       if (res.status) {
//         setCategoryOptions(
//           res.result.map((category) => ({
//             label: category.title,
//             value: category._id,
//           }))
//         );
//       }
//     });

//     reset({
//       image: isUpdate ? couponsData["Image"] : "",
//       title: isUpdate ? couponsData["Title"] : "",
//       description: isUpdate ? couponsData["Description"] : "",
//       brand: isUpdate ? couponsData["Merchant"] : "",
//       pin: isUpdate ? couponsData["PIN"] : "",
//       points_required: isUpdate ? couponsData["Points Required"] : 0,
//       starts_from: isUpdate ? couponsData["Starts From"] : "",
//       expiry: isUpdate ? couponsData["Expiry"] : "",
//       // no_of_cards: isUpdate ? couponsData.no_of_cards : 0,
//       availability_criteria: isUpdate
//         ? couponsData["Availability Criteria"]
//         : "",
//       category: isUpdate ? couponsData["Category"] : "",
//     });
//   }, [open, isUpdate, couponsData, reset]);


//   const loadAppOptions = async (inputValue) => {
//     try {
//       const response = await getApp(inputValue); // Replace with your API call
//       if (response.status) {
//         return response.result.map((app) => ({
//           label: app.title,
//           value: app._id,
//         }));
//       }
//       return [];
//     } catch (error) {
//       console.error("Error fetching apps", error);
//       return [];
//     }
//   };





//   const onSubmit = async (data) => {
//     if (isUpdate) {
//       editCoupon(data);
//     } else {
//       addCouponHandler(data);
//     }
//   };

//   const addCouponHandler = (data) => {
//     addCoupon(data)
//       .then((res) => {
//         if (res.status) {
//           toast.success("Coupon added successfully");
//           isSubmitted();
//           onClose();
//         }
//       })
//       .catch((error) => {
//         toast.error(error.response?.message || "Failed to add Coupon");
//       });
//   };

//   const editCoupon = (data) => {
//     updateCoupon(couponsData._id, data)
//       .then((res) => {
//         if (res.status) {
//           toast.success("Coupon updated successfully");
//           isSubmitted();
//           onClose();
//         }
//       })
//       .catch((error) => {
//         toast.error(error.response?.message || "Failed to update Coupon");
//       });
//   };

//   const dialogClose = () => {
//     reset({});
//     onClose();
//   };

//   return (
//     <Dialog open={open} maxWidth="sm" fullWidth>
//       <Stack
//         direction={"row"}
//         justifyContent={"space-between"}
//         alignItems={"center"}
//         p={2}
//       >
//         <Typography
//           variant="subtitle1"
//           sx={{ color: "primary.dark", fontWeight: 600 }}
//         >
//           {isUpdate ? "Edit" : "Add"} Coupon
//         </Typography>
//         <IconButton onClick={dialogClose}>
//           <Close />
//         </IconButton>
//       </Stack>
//       <Divider />
//       <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
//         <Stack p={2} spacing={2}>
//           <Stack>
//             <Typography variant="subtitle2">Title</Typography>
//             <Controller
//               name="title"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledTextfield placeholder="Enter Title" {...field} />
//                   {errors.title && (
//                     <span style={errorMsgStyle}>{errors.title.message}</span>
//                   )}
//                 </>
//               )}
//               rules={{ required: "Enter Title" }}
//             />
//           </Stack>
//           <Stack>
//             <Typography variant="subtitle2">Description</Typography>
//             <Controller
//               name="description"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledTextfield placeholder="Enter Description" {...field} />
//                   {errors.description && (
//                     <span style={errorMsgStyle}>
//                       {errors.description.message}
//                     </span>
//                   )}
//                 </>
//               )}
//               rules={{ required: "Enter Description" }}
//             />
//           </Stack>
//           <Stack>
//             <Typography variant="subtitle2">Brand</Typography>
//             <Controller
//               name="brand"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledSelectField
//                     options={brandOptions}
//                     value={field.value}
//                     placeholder="Select Brand"
//                     onChange={field.onChange}
//                   />
//                   {errors.brand && (
//                     <span style={errorMsgStyle}>{errors.brand.message}</span>
//                   )}
//                 </>
//               )}
//             />
//           </Stack>

//           <Stack>
//             <Typography variant="subtitle2">Apps</Typography>
//             <Controller
//               name="app"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <AsyncSelect
//                     cacheOptions
//                     defaultOptions
//                     loadOptions={loadAppOptions}
//                     value={field.value}
//                     placeholder="Select Apps"
//                     isMulti
//                     {...field}
//                     styles={{ control: (base) => ({ ...base, borderColor: errors.apps ? 'red' : base.borderColor }) }}
//                   />
//                   {errors.brand && (
//                     <span style={errorMsgStyle}>{errors.brand.message}</span>
//                   )}
//                 </>
//               )}
//             />
//           </Stack>

//           <Stack>
//             <Typography variant="subtitle2">Points required</Typography>
//             <Controller
//               name="points_required"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledTextfield
//                     placeholder="Enter points required"
//                     {...field}
//                   />
//                   {errors.points_required && (
//                     <span style={errorMsgStyle}>
//                       {errors.points_required.message}
//                     </span>
//                   )}
//                 </>
//               )}
//               rules={{ required: "Enter points required" }}
//             />
//           </Stack>

//           <Stack>
//             <Typography variant="subtitle2">Starts From</Typography>
//             <Controller
//               name="starts_from"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledTextfield
//                     type="date"
//                     placeholder="Enter Starts From"
//                     {...field}
//                   />
//                   {errors.starts_from && (
//                     <span style={errorMsgStyle}>
//                       {errors.starts_from.message}
//                     </span>
//                   )}
//                 </>
//               )}
//               rules={{ required: "Enter Starts From" }}
//             />
//           </Stack>

//           <Stack>
//             <Typography variant="subtitle2">expiry</Typography>
//             <Controller
//               name="expiry"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledTextfield
//                     type="date"
//                     placeholder="Enter expiry"
//                     {...field}
//                   />
//                   {errors.expiry && (
//                     <span style={errorMsgStyle}>{errors.expiry.message}</span>
//                   )}
//                 </>
//               )}
//               rules={{ required: "Enter expiry" }}
//             />
//           </Stack>

//           <Stack>
//             <Typography variant="subtitle2">PIN</Typography>
//             <Controller
//               name="pin"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledTextfield placeholder="Enter PIN" {...field} />
//                   {errors.pin && (
//                     <span style={errorMsgStyle}>{errors.pin.message}</span>
//                   )}
//                 </>
//               )}
//               rules={{ required: "Enter PIN" }}
//             />
//           </Stack>
//           <Stack>
//             <Typography variant="subtitle2">Availability Criteria</Typography>
//             <Controller
//               name="availability_criteria"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledSelectField
//                     options={AvailabilityArray}
//                     value={field.value}
//                     placeholder=" Availability Criteria"
//                     onChange={field.onChange}
//                   />
//                   {errors.brand && (
//                     <span style={errorMsgStyle}>
//                       {errors.availability_criteria.message}
//                     </span>
//                   )}
//                 </>
//               )}
//               //   rules={{ required: "Enter availability criteria" }}
//             />
//           </Stack>

//           <Stack>
//             <Typography variant="subtitle2">Category</Typography>
//             <Controller
//               name="category"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledSelectField
//                     options={categoryOptions}
//                     value={field.value}
//                     placeholder="Select Category"
//                     onChange={field.onChange}
//                   />
//                   {errors.category && (
//                     <span style={errorMsgStyle}>{errors.category.message}</span>
//                   )}
//                 </>
//               )}
//             />
//           </Stack>
//         </Stack>
//         <Stack direction={"row"} justifyContent={"end"} p={2} spacing={2}>
//           <Button
//             variant="outlined"
//             sx={{ borderColor: "#777", color: "#777" }}
//             onClick={dialogClose}
//           >
//             Cancel
//           </Button>
//           <Button variant="contained" type="submit">
//             {isUpdate ? "Update" : "Add"}
//           </Button>
//         </Stack>
//       </form>
//     </Dialog>
//   );
// }

// const errorMsgStyle = {
//   color: "red",
//   fontSize: "0.8rem",
// };

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
import { getCategory } from "../../services/category";
import { getBrand } from "../../services/brands";
import AsyncSelect from "react-select/async";
import { getApp } from "../../services/apps";

export default function AddCoupon({
  open,
  onClose,
  isUpdate,
  couponsData,
  isSubmitted,
}) {
  const [appOptions, setAppOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      apps: [],
      image: "",
      points_required: 0,
      starts_from: "",
      expiry: "",
      status: "active",
    },
  });

  const AvailabilityArray = [
    {
      code: 10,
      label: "Once in a month",
    },
    {
      code: 11,
      label: "Twice in a month",
    },
    {
      code: 12,
      label: "Thrice in a month",
    },
  ];

  useEffect(() => {
    if (isUpdate && couponsData) {
      reset({
        image: couponsData["Image"] || "",
        title: couponsData["Title"] || "",
        description: couponsData["Description"] || "",
        brand: couponsData["Merchant"] || "",
        pin: couponsData["PIN"] || "",
        points_required: couponsData["Points Required"] || 0,
        starts_from: couponsData["Starts From"] || "",
        expiry: couponsData["Expiry"] || "",
        availability_criteria:
        couponsData["Availability Criteria"] || "",
        category: couponsData["Category"] || "",
      });
    }

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
  }, [open, isUpdate, couponsData, reset]);

  const loadAppOptions = async (inputValue) => {
    try {
      const response = await getApp(inputValue);
      if (response.status) {
        return response.result.map((app) => ({
          value: app._id,
          label: app.title,
        }));
      }
      return [];
    } catch (error) {
      console.error("Error fetching apps", error);
      return [];
    }
  };

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
            <Typography variant="subtitle2">Apps</Typography>
            <Controller
              name="apps"
              control={control}
              render={({ field }) => (
                <>
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={loadAppOptions}
                    value={field.value}
                    placeholder="Select Apps"
                    isMulti
                    {...field}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: errors.apps ? "red" : base.borderColor,
                      }),
                    }}
                  />
                  {errors.apps && (
                    <span style={errorMsgStyle}>{errors.apps.message}</span>
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
            <Typography variant="subtitle2">Expiry</Typography>
            <Controller
              name="expiry"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield
                    type="date"
                    placeholder="Enter Expiry"
                    {...field}
                  />
                  {errors.expiry && (
                    <span style={errorMsgStyle}>{errors.expiry.message}</span>
                  )}
                </>
              )}
              rules={{ required: "Enter Expiry" }}
            />
          </Stack>

          <Stack>
            <Typography variant="subtitle2">PIN</Typography>
            <Controller
              name="pin"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextfield placeholder="Enter PIN" {...field} />
                  {errors.pin && (
                    <span style={errorMsgStyle}>{errors.pin.message}</span>
                  )}
                </>
              )}
              rules={{ required: "Enter PIN" }}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Availability Criteria</Typography>
            <Controller
              name="availability_criteria"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    options={AvailabilityArray}
                    value={field.value}
                    placeholder="Availability Criteria"
                    onChange={field.onChange}
                  />
                  {errors.availability_criteria && (
                    <span style={errorMsgStyle}>
                      {errors.availability_criteria.message}
                    </span>
                  )}
                </>
              )}
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
        <Divider />
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          spacing={2}
          p={2}
        >
          <Button
            onClick={dialogClose}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {isUpdate ? "Update" : "Save"}
          </Button>
        </Stack>
      </form>
    </Dialog>
  );
}

const errorMsgStyle = {
  color: "red",
  fontSize: "0.8rem",
  marginTop: "4px",
};
