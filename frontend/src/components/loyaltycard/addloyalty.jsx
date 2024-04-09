import { Close } from '@mui/icons-material'
import { Box, Button, Dialog, Divider, IconButton, InputAdornment, Stack, TextField, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import StyledTextfield from '../../ui/styledTextfield';

export default function AddLoyalty({ open, onClose }) {
    const [selectedFile, setSelectedFile] = useState()

    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        if (!selectedFile) {
            setError("company", { type: "manual", message: "Select logo of company" })
            return
        }
        console.log(data);
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
                <Typography variant='subtitle1' sx={{ color: 'primary.dark', fontWeight: 600 }}>Add Loyalty card</Typography>
                <IconButton onClick={dialogClose}><Close /></IconButton>
            </Stack>
            <Divider />
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <Stack p={2} spacing={2}>
                    <Stack>
                        <Typography variant='subtitle2'>Loyalty Name </Typography>
                        <Controller
                            name="loyaltyName"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <StyledTextfield placeholder='Enter loyalty name' {...field} />
                                    {errors.loyaltyName && (
                                        <span style={errorMsgStyle}>
                                            {errors.loyaltyName.message}
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
                                    name="vendorCode"
                                    control={control}
                                    render={({ field }) => (
                                        <StyledTextfield placeholder='Enter vendor code' {...field} sx={{ flexGrow: 1 }} />
                                    )}
                                    rules={{ required: 'Enter vendor code' }}
                                />
                                {errors.vendorCode && (
                                    <span style={errorMsgStyle}>
                                        {errors.vendorCode.message}
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
                                name="cardNos"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <StyledTextfield type={'number'} placeholder='Enter Number of cards' {...field} sx={{ flexGrow: 1 }} />
                                        {errors.cardNos && (
                                            <span style={errorMsgStyle}>
                                                {errors.cardNos.message}
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
                                        <DatePicker format='DD/MM/YYYY' {...field} sx={{height:'40px'}} slotProps={{ textField: { size: 'small' } }} />
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
                        <Typography variant='subtitle2'>Tags</Typography>
                        <Controller
                            name="tags"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <StyledTextfield placeholder='Enter the tags seperate with comma(,)' {...field} />
                                    {errors.tags && (
                                        <span style={errorMsgStyle}>
                                            {errors.tags.message}
                                        </span>
                                    )}
                                </>
                            )}
                            rules={{ required: 'Enter the tags' }}
                        />
                    </Stack>
                </Stack>
                <Stack direction={'row'} justifyContent={"end"} p={2} spacing={2}>
                    <Button variant='outlined' sx={{ borderColor: '#777', color: '#777' }} onClick={dialogClose}>Cancel</Button>
                    <Button variant='outlined' type='submit'>Submit</Button>
                </Stack>
            </form>
        </Dialog>
    )
}

const errorMsgStyle = {
    color: 'red',
    fontSize: '12px',
    fontStyle: 'italic'
}