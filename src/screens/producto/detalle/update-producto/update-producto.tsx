import { FC, useCallback, useEffect } from "react"
import { UpdateProductoStore } from "./update-producto-store"
import { Styled } from "../styles"
import { ButtonApp } from "components/Button/Button"
import { useForm } from "react-hook-form"
import { InputTextForm } from "components/InputText"
import { observer } from "mobx-react"
import { IProducto } from "services/productos"
import { SelectComponentForm } from "components/SelectComponent"
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces"

type Props = {
    store: UpdateProductoStore
}

export interface From extends IProducto {
    unidad_from: SelectItem
}

export const UpdateProducto: FC<Props> = observer((props) => {

    const { store } = props

    const { control, handleSubmit, reset, formState: { isValid } } = useForm<From>({
        mode: 'onChange',
        defaultValues: {
            descripcion: '',
            nombre: '',
            referencia: '',
            unidad: null
        }
    })

    const submit = useCallback((data: From) => {
        store.putProducto.run(data)
    }, [store.putProducto])

    useEffect(() => {
        store.init.run()
    }, [store.init])

    useEffect(() => {
        if(store.producto){
            reset({
                id: store.producto.id,
                descripcion: store.producto.descripcion,
                nombre: store.producto.nombre,
                referencia: store.producto.referencia,
                unidad_from: store.unidades.find((item) => (item.value === store.producto.unidad.id))
            })
        }
    }, [store.producto, reset, store.unidades])


    return (
        <Styled.DialogStyled
            open={store.show.isVisible}

        >
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <Styled.DialogTitleStyled>
                    Editar Producto
                    <Styled.CloseIconStyled onClick={store.goBack} />
                </Styled.DialogTitleStyled>
                <Styled.DialogContentStyled>
                    <InputTextForm
                        control={control}
                        name="nombre"
                        inputProps={{
                            label: 'Nombre',
                            fullWidth: true
                        }}
                        rules={{
                            required: 'Campo requerido'
                        }}
                    />
                    <InputTextForm
                        control={control}
                        name="referencia"
                        inputProps={{
                            label: 'Referencia',
                            fullWidth: true
                        }}
                        rules={{
                            required: 'Campo requerido'
                        }}
                    />
                    <SelectComponentForm
                        control={control}
                        name="unidad_from"
                        options={store.unidades}
                        label="Unidad"
                        rules={{
                            required: 'Campo requerido'
                        }}
                    />
                    <InputTextForm
                        control={control}
                        name="descripcion"
                        inputProps={{
                            label: 'Descripcion',
                            fullWidth: true,
                            multiline: true,
                            rows: 4
                        }}
                    />
                </Styled.DialogContentStyled>
                <Styled.DialogActionsStyled>
                    <ButtonApp
                        variant="contained"
                        disabled={!isValid}
                        type="submit"
                    >
                        Guardar
                    </ButtonApp>
                    <ButtonApp
                        onClick={store.goBack}
                    >
                        Cancelar
                    </ButtonApp>
                </Styled.DialogActionsStyled>
            </Styled.Form>
        </Styled.DialogStyled>
    )
})