import { useForm } from "react-hook-form"
import { useCallback } from "react"
import { ValidateUsernameStore } from "./validate-username-store"

export const useValidateUsername = (store: ValidateUsernameStore) => {
    const { control, handleSubmit, formState: { isValid } } = useForm<{username: string}>({
        mode: 'onChange',
        defaultValues: {
            username: ''
        }
    })

    const getEmpresasByUsername = useCallback((data: {username: string}) => {
        store.empresasByusername.run(data.username)
    }, [store])


    return {
        control,
        handleSubmit,
        isValid,
        getEmpresasByUsername
    }
}