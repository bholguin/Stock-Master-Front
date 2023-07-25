import { FC, useCallback, useEffect } from "react"
import { CreateProductoStore } from "./create-producto-store"
import { Styled } from "../styles"
import { ButtonApp } from "components/Button/Button"
import { useForm } from "react-hook-form"
import { InputTextForm } from "components/InputText"
import { observer } from "mobx-react"
import { IProducto } from "services/productos"
import { SelectComponentForm } from "components/SelectComponent"
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces"

type Props = {
    store: CreateProductoStore
}

export interface From extends IProducto {
    unidad_from: SelectItem
}

export const CreateProducto: FC<Props> = observer((props) => {

    const { store } = props

    const { control, handleSubmit, formState: { isValid } } = useForm<From>({
        mode: 'onChange',
        defaultValues: {
            descripcion: '',
            nombre: '',
            referencia: '',
            unidad: null
        }
    })

    const submit = useCallback((data: From) => {
        console.log(data);

        store.postProducto.run(data)
    }, [store.postProducto])

    useEffect(() => {
        store.getUnidades.run()
    }, [store.getUnidades])

    return (
        <Styled.DialogStyled
            open={store.show.isVisible}

        >
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <Styled.DialogTitleStyled>
                    Crear Producto
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