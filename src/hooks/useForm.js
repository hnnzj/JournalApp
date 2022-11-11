import React, { useEffect, useMemo, useState } from 'react';
import validator from 'validator';

export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formValidation, setValidation] = useState({});
    const [formState, setFormState] = useState(initialForm);

    useEffect(() => {
        createValidator();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    const onInputChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const onResetForm = (e) => {
        e.preventDefault();
        setFormState(initialForm);
    };

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation]);

    const createValidator = () => {
        const formCheckValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage = 'Este campo es requerido.'] =
                formValidations[formField];
            formCheckValues[`${formField}Valid`] = fn(formState[formField])
                ? null
                : errorMessage;
        }
        setValidation(formCheckValues);
    };

    return {
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        ...formState,
        isFormValid,
    };
};
