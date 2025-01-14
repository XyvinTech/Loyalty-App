import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CheckCircle, UploadFile } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';


export default function FileUpload({ onFileSelect, image, accept,getBase64Data,removedFile }) {
  const [fileStatus, setFileStatus] = useState(false)
  const [fileData,setFileData] = useState()
  const { getRootProps, getInputProps } = useDropzone({
    accept: accept ? accept : {'image/*' : ['.png','.jpeg','.jpg','.webp']},
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFileStatus(true)
      onFileSelect && onFileSelect({ files: acceptedFiles })
      // console.log(acceptedFiles[0]);
      getBase64(acceptedFiles[0],(result)=>{
        getBase64Data && getBase64Data(result)
        setFileData(result)
      })
    }
  });

  useEffect(() => {
    // Set initial image if provided
    if (image) {
        setFileData(image);
        setFileStatus(true);
    }
}, [image]);

  useEffect(() => {
    if (removedFile) {
      setFileStatus(false)
    }
  }, [removedFile])
  

  const getBase64= (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

  return (
    <Stack
      spacing={1}
      padding={fileStatus ? 3 : 5}
      direction="column"
      sx={{
        backgroundColor: 'primary.lighter',
        backgroundImage: image ? `url("${image}")` : fileStatus && `url("${fileData}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition:'50% 50%',
        boxShadow: 3,
        width: '100%',
        height: '100%',
        borderRadius: '10px', border: '3px dashed #aaa',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
      }}
      {...getRootProps({})}
    >
      <input {...getInputProps({})} accept={accept ? accept : ''} />
      {fileStatus ? <CheckCircle sx={{ color: 'success.main', fontSize: 58 }} /> : <UploadFile sx={{ fontSize: '26px', color: 'secondary.contrastText' }} />}
      <Typography variant="caption" color={'secondary.'}>
        {fileStatus ? 'selected' : 'Drop your files or browse'}
      </Typography>
    </Stack>
  );
}