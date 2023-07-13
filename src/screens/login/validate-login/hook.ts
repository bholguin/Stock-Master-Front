import { useForm } from "react-hook-form"
import { LoginForm } from "./interfaces"
import { useCallback, useEffect, useState } from "react"
import { ValidateLoginStore } from "./validate-login-store"

export const useValidateLogin = (store: ValidateLoginStore) => {
    const [showPass, setShowPass] = useState<boolean>(false)
    const { control, handleSubmit, reset, formState: { isValid } } = useForm<LoginForm>({
        mode: 'onChange',
        defaultValues: {
            username: '',
            empresa: null,
            password: ''
        }
    })

    const submit = useCallback((data: LoginForm) => {
        store.login.run(data)
    }, [store])

    useEffect(() => {
        reset({
            username: store.data.username,
            empresa: store.data.empresas.length === 1
                ? store.data.empresas[0].id
                : null
        })
    }, [store, reset])


    return {
        control,
        handleSubmit,
        isValid,
        submit,
        showPass,
        setShowPass
    }
}