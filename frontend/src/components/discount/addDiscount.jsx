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
// import { addDiscount, updateDiscount } from "../../services/discount";
// import { toast } from "react-toastify";
// import { getTiers } from "../../services/tier";
// import StyledSelectField from "../../ui/styledSelectField";

// export default function AddDiscount({
//   open,
//   onClose,
//   isUpdate,
//   discountsData,
//   isSubmitted,
// }) {
//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [tierOptions, setTierOptions] = useState([]);

//   useEffect(() => {
//     getTiers().then((res) => {
//       if (res.status) {
//         setTierOptions(
//           res.result.map((tier) => ({ label: tier.tierName, value: tier._id }))
//         );
//       }
//     });

//     reset({
//       title: isUpdate ? discountsData['Title'] : "",
//       discountCode: isUpdate ? discountsData['Offer Code'] : "",
//       description: isUpdate ? discountsData['Description'] : "",
//       percentage: isUpdate ? discountsData['Percentage'] : "",
//       tierRequired: isUpdate ? discountsData['Tier Required'] : "",
//       validFrom: isUpdate ? discountsData['Valid From']: "",
//       validTo: isUpdate ? discountsData['Valid To'] : "",
//       status: isUpdate ? discountsData['Status'] : "",
//     });
//   }, [open, isUpdate, discountsData, reset]);

//   const onSubmit = async (data) => {
//     if (isUpdate) {
//       editDiscount(data);
//     } else {
//       addDiscountHandler(data);
//     }
//   };

//   const addDiscountHandler = (data) => {
//     addDiscount(data)
//       .then((res) => {
//         if (res.status) {
//           toast.success("Discount added successfully");
//           isSubmitted();
//           onClose();
//         }
//       })
//       .catch((error) => {
//         toast.error(error.response?.message || "Failed to add Discount");
//       });
//   };

//   const editDiscount = (data) => {
//     updateDiscount(discountsData._id, data)
//       .then((res) => {
//         if (res.status) {
//           toast.success("Discount updated successfully");
//           isSubmitted();
//           onClose();
//         }
//       })
//       .catch((error) => {
//         toast.error(error.response?.message || "Failed to update Discount");
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
//           {isUpdate ? "Edit" : "Add"} Discount
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
//             <Typography variant="subtitle2">Discount Code</Typography>
//             <Controller
//               name="DiscountCode"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledTextfield
//                     type="text"
//                     placeholder="Enter Discount Code"
//                     {...field}
//                   />
//                   {errors.DiscountCode && (
//                     <span style={errorMsgStyle}>
//                       {errors.DiscountCode.message}
//                     </span>
//                   )}
//                 </>
//               )}
//               rules={{ required: "Enter Discount Code" }}
//             />
//           </Stack>

//           <Stack>
//             <Typography variant="subtitle2">Description</Typography>
//             <Controller
//               name="description"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledTextfield
//                     type="text"
//                     placeholder="Enter Description"
//                     {...field}
//                   />
//                   {errors.description && (
//                     <span style={errorMsgStyle}>
//                       {errors.description.message}
//                     </span>
//                   )}
//                 </>
//               )}
//               rules={{ required: "Enter description" }}
//             />
//           </Stack>
//           <Stack>
//             <Typography variant="subtitle2">Percentage</Typography>
//             <Controller
//               name="percentage"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledTextfield
//                     type="number"
//                     placeholder="Enter Percentage"
//                     {...field}
//                   />
//                   {errors.percentage && (
//                     <span style={errorMsgStyle}>
//                       {errors.percentage.message}
//                     </span>
//                   )}
//                 </>
//               )}
//               rules={{ required: "Enter Percentage" }}
//             />
//           </Stack>
//           <Stack>
//             <Typography variant="subtitle2">Tier Required </Typography>
//             <Controller
//               name="tierRequired"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledSelectField
//                     options={tierOptions}
//                     value={field.value}
//                     placeholder="Select tier"
//                     onChange={field.onChange}
//                   />
//                   {errors.tierRequired && (
//                     <span style={errorMsgStyle}>
//                       {errors.tierRequired.message}
//                     </span>
//                   )}
//                 </>
//               )}
//             />
//           </Stack>
//           <Stack>
//             <Typography variant="subtitle2">Valid From</Typography>
//             <Controller
//               name="validFrom"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledTextfield
//                     type="date"
//                     placeholder="Enter Valid From"
//                     {...field}
//                   />
//                   {errors.validFrom && (
//                     <span style={errorMsgStyle}>
//                       {errors.validFrom.message}
//                     </span>
//                   )}
//                 </>
//               )}
//               rules={{ required: "Enter Valid From" }}
//             />
//           </Stack>
//           <Stack>
//             <Typography variant="subtitle2">Valid To</Typography>
//             <Controller
//               name="validTo"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <StyledTextfield
//                     type="date"
//                     placeholder="Enter Valid To"
//                     {...field}
//                   />
//                   {errors.validTo && (
//                     <span style={errorMsgStyle}>{errors.validTo.message}</span>
//                   )}
//                 </>
//               )}
//               rules={{ required: "Enter Valid To" }}
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
//           <Button variant="outlined" type="submit">
//             {isUpdate ? "Update" : "Add"}
//           </Button>
//         </Stack>
//       </form>
//     </Dialog>
//   );
// }

// const errorMsgStyle = {
//   color: "red",
//   fontSize: "12px",
//   fontStyle: "italic",
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
import { addDiscount, updateDiscount } from "../../services/discount";
import { toast } from "react-toastify";
import AsyncSelect from 'react-select/async';
import { getTiers } from "../../services/tier"; // Assume you have getApps service for fetching apps
import { getApp } from "../../services/apps"; // Assume you have getApps service for fetching apps

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

  useEffect(() => {
    reset({
      title: isUpdate ? discountsData['Title'] : "",
      discountCode: isUpdate ? discountsData['Offer Code'] : "",
      description: isUpdate ? discountsData['Description'] : "",
      percentage: isUpdate ? discountsData['Percentage'] : "",
      tierRequired: isUpdate ? discountsData['Tier Required'] : "",
      apps: isUpdate ? discountsData['Apps'] : [],
      validFrom: isUpdate ? discountsData['Valid From'] : "",
      validTo: isUpdate ? discountsData['Valid To'] : "",
      status: isUpdate ? discountsData['Status'] : "",
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

  const loadTierOptions = async (inputValue, callback) => {
    const res = await getTiers();
    if (res.status) {
      const options = res.result.map((tier) => ({
        label: tier.tierName,
        value: tier._id,
      }));
      callback(options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      ));
    }
  };

  const loadAppOptions = async (inputValue, callback) => {
    const res = await getApp(); // Assume getApps fetches the apps from an API
    if (res.status) {
      const options = res.result.map((app) => ({
        label: app.appName,
        value: app._id,
      }));
      callback(options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      ));
    }
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
            <Typography variant="subtitle2">Tier Required</Typography>
            <Controller
              name="tierRequired"
              control={control}
              render={({ field }) => (
                <>
                  <AsyncSelect
                    isMulti
                    cacheOptions
                    loadOptions={loadTierOptions}
                    defaultOptions
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select tiers"
                  />
                  {errors.tierRequired && (
                    <span style={errorMsgStyle}>
                      {errors.tierRequired.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Select at least one tier" }}
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
                    isMulti
                    cacheOptions
                    loadOptions={loadAppOptions}
                    defaultOptions
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select apps"
                  />
                  {errors.apps && (
                    <span style={errorMsgStyle}>
                      {errors.apps.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Select at least one app" }}
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
  marginTop: "5px",
};
