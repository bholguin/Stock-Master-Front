import { useForm } from "react-hook-form"
import { IUsuario } from "services/usuario"
import { CuentaStore } from "./cuenta-store"
import { useEffect } from "react"

export const useCuenta = (store: CuentaStore) => {
    const { control, reset, handleSubmit, formState: { isValid } } = useForm<IUsuario>({
        mode: 'onChange',
        defaultValues: {
            nombre: '',
            apellido: '',
            username: '',
            correo: '',
            telefono: '',
            identificacion: ''
        }
    })

    useEffect(() => {
        store.getCuenta.run()
    }, [store.getCuenta])

    useEffect(() => {
        if(store.cuenta){
            reset({
                nombre: store.cuenta.nombre ?? "",
                apellido: store.cuenta.apellido ?? "",
                correo: store.cuenta.correo ?? "",
                identificacion: store.cuenta.identificacion ?? "",
                telefono: store.cuenta.telefono ?? "",
                username: store.cuenta.username ?? ""
            })
        }
    }, [reset, store.cuenta])

    return{
        control,
        handleSubmit,
        isValid,
    }
}