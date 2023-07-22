import { SeguridadStore } from "./seguridad-store";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { ChangePassword } from "services/usuario";
import { useCallback, useState } from "react";

export const useSeguridad = (store: SeguridadStore) => {

    const [showPass, setShowPass] = useState<boolean>(false)
    const [showPass2, setShowPass2] = useState<boolean>(false)

    const FORM_SCHEMA_VALIDATOR = Yup.object().shape({
        password: Yup.string()
            .required('El password es requerido'),
        newPassword: Yup.string()
            .required('El password es requerido')
            .min(8, 'EL password debe contener 8 caracteres'),
        validatePassword: Yup.string()
            .required('El password es requerido')
            .min(8, 'EL password debe contener 8 caracteres')
            .oneOf([Yup.ref('newPassword')], 'El password no coincide. por favor verifique.'),
    });

    const yupResolverValidate = () => yupResolver(FORM_SCHEMA_VALIDATOR);

    const { control, handleSubmit, watch, setError, reset, formState: { isValid } } = useForm<ChangePassword>({
        mode: 'onChange',
        resolver: yupResolverValidate(),
        defaultValues: {
            password: '',
            newPassword: '',
            validatePassword: ''
        }
    })

    const form = watch();

    const submit = useCallback((data: ChangePassword) => {
        if (data.newPassword === data.validatePassword) {
            store.ChangePassword.run(data);
            reset({
                newPassword: '',
                password: '',
                validatePassword: ''
            })
        } else {
            setError('validatePassword', {
                message: 'El password no coincide. por favor verifique.'
            })
        }
    }, [store.ChangePassword, setError, reset])


    return {
        control,
        form,
        submit,
        showPass,
        setShowPass,
        showPass2,
        setShowPass2,
        handleSubmit,
        isValid
    }
}