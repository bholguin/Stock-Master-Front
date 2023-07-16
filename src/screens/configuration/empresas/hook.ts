import { useForm } from "react-hook-form"
import { IEmpresa } from "services/empresa"
import { EmpresasStore } from "./empresas-store"
import { useCallback, useEffect } from "react"

export const useEmpresas = (store: EmpresasStore) => {
    const { control, reset, handleSubmit, formState: { isValid } } = useForm<IEmpresa>({
        mode: 'onChange',
        defaultValues: {
            direccion: '',
            nit: '',
            nombre: '',
            telefono: ''
        }
    })

    const submit = useCallback((data: IEmpresa) => {
        store.updateEmpresa.run(data)
    }, [store.updateEmpresa])

    useEffect(() => {
        store.getEmpresa.run()
    }, [store])

    useEffect(() => {
        if (store.empresa) {
            reset({
                nombre: store.empresa.nombre,
                telefono: store.empresa.telefono,
                direccion: store.empresa.direccion,
                nit: store.empresa.nit
            })
        }
    }, [reset, store.empresa])

    return{
        control,
        handleSubmit,
        isValid,
        submit
    }
}