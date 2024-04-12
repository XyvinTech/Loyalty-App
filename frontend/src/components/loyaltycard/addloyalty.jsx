import { Close } from '@mui/icons-material'
import { Box, Button, Dialog, Divider, FormControlLabel, IconButton, InputAdornment, Stack, Switch, TextField, TextareaAutosize, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import StyledTextfield from '../../ui/styledTextfield';
import StyledSelectField from '../../ui/styledSelectField';
import { getCategory } from '../../services/category';
import { formatDate } from '../../utils/dateFormat';
import { addLoyalityCard, updateLoyalityCard } from '../../services/loyaltyCard';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

export default function AddLoyalty({ open, onClose, isUpdate, loyalityData, isSubmitted }) {
    const [selectedFile, setSelectedFile] = useState("")
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategory().then((res) => {
            if (res.status) {
                setCategories(res.result.map((item) => ({ label: item.title, value: item._id })))
            }
        })
    }, [])
    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        reset({
            title: isUpdate ? loyalityData["Name"] : "",
            brand: isUpdate ? loyalityData["Brand"] : "",
            vendor: isUpdate ? loyalityData["Vendor"] : "",
            worth: isUpdate ? loyalityData["Worth"] : "",
            expiry: isUpdate ? dayjs(loyalityData["Expiry"]) : null,
            no_of_cards: isUpdate ? loyalityData["Number of Coupen"] : "",
            category: isUpdate ? loyalityData["Category"] : ""
        })
    }, [open])


    const onSubmit = (data) => {
        if (isUpdate) {
            editCard(data)
        } else {
            if (!selectedFile) {
                setError("brand", { type: "manual", message: "Select logo of brand" })
                return
            }
            addCard({ brand_logo: "nil", ...data })
        }
        console.log(data);
    }

    const addCard = ({ category, expiry, ...data }) => {
        let dt = {
            category: category.value,
            expiry: formatDate(expiry),
            ...data
        }
        console.log(dt);
        addLoyalityCard(dt).then((res) => {
            if (res.status) {
                toast.success("Successfully added")
                isSubmitted()
                onClose()
            }
        }).catch(error => {
            toast.error(error.response.message)
        })
    }

    const editCard = ({ category, expiry, status, ...data }) => {
        let dt = {
            category: category.value,
            expiry: formatDate(expiry),
            status: status ? "active" : "inactive",
            ...data
        }
        console.log(dt);
        updateLoyalityCard(loyalityData._id, dt).then((res) => {
            if (res.status) {
                toast.success("Successfully Upated")
                isSubmitted()
                onClose()
            }
        }).catch(error => {
            toast.error(error.response.message)
        })
    }

    const dialogClose = () => {
        reset({})
        onClose()
    }

    const onFileChange = (e) => {
        console.log(e.target.files[0]);
        setSelectedFile(e.target.files[0])
    }
    return (
        <Dialog
            open={open}
            maxWidth="sm"
            fullWidth
        >
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} p={2}>
                <Typography variant='subtitle1' sx={{ color: 'primary.dark', fontWeight: 600 }}>{isUpdate ? 'Edit' : 'Add'} Loyalty card</Typography>
                <IconButton onClick={dialogClose}><Close /></IconButton>
            </Stack>
            <Divider />
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <Stack p={2} spacing={2}>
                    <Stack>
                        <Typography variant='subtitle2'>Loyalty Name </Typography>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <StyledTextfield placeholder='Enter loyalty name' {...field} />
                                    {errors.title && (
                                        <span style={errorMsgStyle}>
                                            {errors.title.message}
                                        </span>
                                    )}
                                </>
                            )}
                            rules={{ required: 'Enter loyalty name' }}
                        />
                    </Stack>
                    <Stack direction={'column'}>
                        <Stack direction={'row'} spacing={2} alignItems={'end'}>
                            <Stack>
                                <Typography variant='subtitle2'>Brand</Typography>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    type="file"
                                    id='raised-button-file'
                                    onChange={onFileChange}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="contained" sx={{ textTransform: 'none', height: '40px' }} onClick={() => {
                                        document.getElementById('raised-button-file').click();
                                    }}
                                    >
                                        Add Logo
                                    </Button>
                                </label>
                            </Stack>
                            <Controller
                                name="brand"
                                control={control}
                                render={({ field }) => (
                                    <StyledTextfield placeholder='Enter brand name' {...field} sx={{ flexGrow: 1 }} />
                                )}
                                rules={{ required: 'Enter brand name' }}
                            />
                        </Stack>
                        {errors.brand && (
                            <span style={errorMsgStyle}>
                                {errors.brand.message}
                            </span>
                        )}
                    </Stack>
                    <Stack>
                        <Stack direction={'row'} spacing={0.5}>
                            <Stack flexGrow={1}>
                                <Typography variant='subtitle2'>Vendor Code</Typography>
                                <Controller
                                    name="vendor"
                                    control={control}
                                    render={({ field }) => (
                                        <StyledTextfield placeholder='Enter vendor code' {...field} sx={{ flexGrow: 1 }} />
                                    )}
                                    rules={{ required: 'Enter vendor code' }}
                                />
                                {errors.vendor && (
                                    <span style={errorMsgStyle}>
                                        {errors.vendor.message}
                                    </span>
                                )}
                            </Stack>

                            <Stack flexGrow={1}>
                                <Typography variant='subtitle2'>Worth</Typography>
                                <Controller
                                    name="worth"
                                    control={control}
                                    render={({ field }) => (
                                        <StyledTextfield placeholder='Enter worth' {...field} sx={{ flexGrow: 1 }} rightIcon={'AED'} />
                                    )}
                                    rules={{ required: 'Enter worth' }}
                                />
                                {errors.worth && (
                                    <span style={errorMsgStyle}>
                                        {errors.worth.message}
                                    </span>
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                        <Stack flexGrow={1}>
                            <Typography variant='subtitle2'>Number of Cards</Typography>
                            <Controller
                                name="no_of_cards"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <StyledTextfield type={'number'} placeholder='Enter Number of cards' {...field} sx={{ flexGrow: 1 }} />
                                        {errors.no_of_cards && (
                                            <span style={errorMsgStyle}>
                                                {errors.no_of_cards.message}
                                            </span>
                                        )}
                                    </>
                                )}
                                rules={{ required: 'Enter Number of cards' }}
                            />
                        </Stack>
                        <Stack flexGrow={1}>
                            <Typography variant='subtitle2'>Expiry</Typography>
                            <Controller
                                name="expiry"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <DatePicker format='MM/DD/YYYY' {...field} sx={{ height: '40px' }} slotProps={{ textField: { size: 'small' } }} />
                                        {errors.expiry && (
                                            <span style={errorMsgStyle}>
                                                {errors.expiry.message}
                                            </span>
                                        )}
                                    </>
                                )}
                                rules={{ required: 'Select Date' }}
                            />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography variant='subtitle2'>Category</Typography>
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <StyledSelectField options={categories} placeholder={'select category'} {...field} />
                                    {errors.category && (
                                        <span style={errorMsgStyle}>
                                            {errors.category.message}
                                        </span>
                                    )}
                                </>
                            )}
                            rules={{ required: 'Enter the tags' }}
                        />
                    </Stack>
                </Stack>
                {isUpdate &&
                    <Stack direction={'row'} justifyContent={"end"}>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel control={<Switch defaultChecked={loyalityData["Status"] === 'active'} />} label="Status"  {...field} />
                            )}
                        />
                    </Stack>
                }
                <Stack direction={'row'} justifyContent={"end"} p={2} spacing={2}>
                    <Button variant='outlined' sx={{ borderColor: '#777', color: '#777' }} onClick={dialogClose}>Cancel</Button>
                    <Button variant='outlined' type='submit'>{isUpdate ? "Update" : "Add"}</Button>
                </Stack>
            </form>
        </Dialog >
    )
}

const errorMsgStyle = {
    color: 'red',
    fontSize: '12px',
    fontStyle: 'italic'
}