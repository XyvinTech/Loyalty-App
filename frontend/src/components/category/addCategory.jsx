import { Close } from '@mui/icons-material'
import { Button, Dialog, Divider, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import StyledTextfield from '../../ui/styledTextfield';
import { addCategory, getCategory, updateCategory } from '../../services/category';
import { toast } from 'react-toastify';

export default function AddCategory({ open, onClose, isUpdate, categoryData, isSubmitted }) {
    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        reset({
            title: isUpdate ? categoryData["Title"] : "",
        })
    }, [open])


    const onSubmit = (data) => {
        if (isUpdate) {
            editCategories(data)
        } else {
            addCategories(data)
        }
        console.log(data);
    }

    const addCategories = (data ) => {
        addCategory(data).then((res) => {
            if (res.status) {
                toast.success("Successfully added")
                isSubmitted()
                onClose()
            }
        }).catch(error => {
            toast.error(error.response.message)
        })
    }

    const editCategories = (data) => {
        updateCategory(categoryData._id, data).then((res) => {
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
    return (
        <Dialog
            open={open}
            maxWidth="sm"
            fullWidth
        >
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} p={2}>
                <Typography variant='subtitle1' sx={{ color: 'primary.dark', fontWeight: 600 }}>{isUpdate ? 'Edit' : 'Add'} Category</Typography>
                <IconButton onClick={dialogClose}><Close /></IconButton>
            </Stack>
            <Divider />
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <Stack p={2} spacing={2}>
                    <Stack>
                        <Typography variant='subtitle2'>Title </Typography>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <StyledTextfield placeholder='Enter Category name' {...field} />
                                    {errors.title && (
                                        <span style={errorMsgStyle}>
                                            {errors.title.message}
                                        </span>
                                    )}
                                </>
                            )}
                            rules={{ required: 'Enter Category Name' }}
                        />
                    </Stack>
                </Stack>
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