import {
    DeleteOutline,
    SaveOutlined,
    UploadOutlined,
} from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components/ImageGallery';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { setActiveNote } from '../../store/journal/journalSlice';
import {
    startDeletingNote,
    startSaveNote,
    startUploadingFiles,
} from '../../store/journal/thunk';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRef } from 'react';

export const NoteView = () => {
    const dispatch = useDispatch();
    const {
        active: note,
        savedMessage,
        isSaving,
    } = useSelector((state) => state.journal);
    const { body, title, id, imageUrls, onInputChange, formState, date } =
        useForm(note);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (savedMessage.length > 0) {
            Swal.fire('Nota actualizada', savedMessage, 'success');
        }
    }, [savedMessage]);

    const fileInputRef = useRef();

    const onSaveNote = () => {
        dispatch(startSaveNote());
    };

    const onDelete = () => {
        dispatch(startDeletingNote());
    };

    const onFileChange = ({ target }) => {
        if (target.files === 0) return;

        dispatch(startUploadingFiles(target.files));
    };

    const dateString = useMemo(() => {
        const newdate = new Date(date);
        return newdate.toUTCString();
    }, [date]);

    return (
        <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>
                    {dateString}
                </Typography>
            </Grid>
            <Grid item>
                <input
                    type='file'
                    multiple
                    ref={fileInputRef}
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                />
                <IconButton
                    color='primary'
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>
                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color='primary'
                    sx={{ padding: 2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un titulo'
                    label='Titulo'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='¿Que sucedió en el día hoy?'
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>
            <Grid container justifyContent='end'>
                <Button onClick={onDelete} sx={{ mt: 2 }} color='error'>
                    <DeleteOutline />
                </Button>
            </Grid>
            <ImageGallery key={note.id} images={note.imageUrls} />
        </Grid>
    );
};
