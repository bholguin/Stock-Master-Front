import { useFieldArray, useForm } from "react-hook-form"
import { Form } from "./create-salida"
import { useCallback, useEffect } from "react"
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces"
import { CreateSalidaBodegaStore } from "./create-salida-store"
import { FormProd } from "components/AddItem"

export const useCreateEntradaBodega = (store: CreateSalidaBodegaStore) => {
    const { control, handleSubmit, reset, setValue, formState: { isValid } } = useForm<Form>({
        mode: 'onChange',
        defaultValues: {
            bodega: null,
            tipodoc: null,
            concepto: '',
            consecutivo: 0
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "productos"
    })

    const onChangeTipoDocumento = useCallback((event: any, option: SelectItem) => {
        const tipodoc = store.tipodoc.find(item => item.id === parseInt(option.value))
        setValue('consecutivo', (tipodoc.consecutivo + 1))
    }, [setValue, store.tipodoc])

    const submitProducto = useCallback((data: FormProd) => {
        append(data)
    }, [append])

    const submit = useCallback((data: Form) => {
        store.postSalida.run(data)
    }, [store.postSalida])

    useEffect(() => {
        store.init.run()
    }, [store.init])

    useEffect(() => {
        reset({
            consecutivo: store.tipodoc.length === 1 ? (store.tipodoc[0].consecutivo + 1) : 0,
            bodega: store.bodegas.length === 1 ? store.bodegas[0] : null,
            tipodoc: store.tiposdocList.length === 1 ? store.tiposdocList[0] : null,
        })
    }, [reset, store.bodegas, store.tiposdocList, store.tipodoc])

    return{
        control,
        handleSubmit,
        isValid,
        fields,
        remove,
        submit,
        onChangeTipoDocumento,
        submitProducto
    }
}