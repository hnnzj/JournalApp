import {
    Alert,
    Button,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import {
    startGoogleSignIn,
    startLoginWithEmailAndPassword,
} from '../../store/auth/thunk';
import { useMemo } from 'react';

const formData = {
    email: '',
    password: '',
};

export const LoginPage = () => {
    const dispatch = useDispatch();

    const { status, errorMessage } = useSelector((state) => state.auth);

    const { email, password, onInputChange } = useForm(formData);

    const isAuthenticated = useMemo(() => status === 'checking', [status]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailAndPassword({ email, password }));
    };

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    };

    return (
        <AuthLayout title='Login'>
            <form
                onSubmit={handleSubmit}
                className='animate__animated animate__fadeIn animate__faster'
            >
                <Grid container>
                    <Grid
                        container
                        sx={{ mt: 1, mb: 1 }}
                        display={!!errorMessage ? '' : 'none'}
                    >
                        <Grid item xs={12}>
                            <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='correo'
                            type='email'
                            placeholder='email@email.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder='Contraseña '
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticated}
                                type='submit'
                                variant='contained'
                                fullWidth
                            >
                                Log In
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticated}
                                onClick={onGoogleSignIn}
                                variant='contained'
                                fullWidth
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                        <Link
                            component={RouterLink}
                            color='inherit'
                            to='/auth/register'
                        >
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
