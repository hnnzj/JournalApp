import {
    loginWithEmailPassword,
    logOutFirebase,
    registerUserWithEmailPassword,
    singInWithGoogle,
} from '../../firebase/providers';
import { clearNotesLogout } from '../journal/journalSlice';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    };
};

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await singInWithGoogle();

        if (result.ok === false) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    };
};

export const startCreatingUserWithEmailAndPassword = ({
    email,
    password,
    displayName,
}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } =
            await registerUserWithEmailPassword({
                email,
                password,
                displayName,
            });

        if (!ok) return dispatch(logout({ errorMessage }));
        dispatch(login({ uid, displayName, email, photoURL }));
    };
};

export const startLoginWithEmailAndPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({ email, password });
        if (!result.ok) return dispatch(logout(result.errorMessage));
        dispatch(login(result));
    };
};

export const startLogOut = () => {
    return async (dispatch) => {
        await logOutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout());
    };
};
