import { InputTextForm } from "components/InputText"
import { SelectComponentForm } from "components/SelectComponent"
import { Styled } from "./styles"
import AddIcon from '@mui/icons-material/Add';
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces";
import { useForm } from "react-hook-form";
import { FC, useCallback, useRef, useState } from "react";
import { Typography } from "@mui/material";

export type FormProd = {
    producto: SelectItem
    cantidad: number
}

type Props = {
    productos: Array<SelectItem>;
    submit: (data: FormProd) => void
}

export const AddITem: FC<Props> = (props) => {

    const { productos, submit } = props

    const productosRef = useRef<HTMLDivElement>()

    const [prefijo, setPrefijo] = useState<string>('')

    const { control: controlProd, reset, handleSubmit, formState: { isValid: isValidProd } } = useForm<FormProd>({
        mode: 'onChange',
        defaultValues: {
            producto: null,
            cantidad: null
        }
    })

    const onChangeProducto = useCallback((event: any, option: SelectItem) => {
        const producto = productos.find(item => item.value === option.value)
        setPrefijo(producto.group)
    }, [productos])

    const submitForm = useCallback((data: FormProd) => {
        submit(data)
        reset({
            producto: null,
            cantidad: 0
        })
        productosRef.current.focus()
    }, [submit, reset])

    return (
        <>
            <Typography variant="h3">Agregar Productos</Typography>
            <Styled.FormProducts>
                <SelectComponentForm
                    control={controlProd}
                    name="producto"
                    options={productos}
                    label="Producto"
                    onChange={onChangeProducto}
                    ref={productosRef}
                    rules={{
                        required: 'Campo requerido'
                    }}
                />
                <InputTextForm
                    control={controlProd}
                    name="cantidad"
                    inputProps={{
                        label: 'Cantidad',
                        fullWidth: true,
                        type: 'number'
                    }}
                    rules={{
                        required: 'Campo requerido'
                    }}
                />
                <Styled.ButtonProductContent>
                    <Styled.PrefijoStyle variant="h3">{prefijo}</Styled.PrefijoStyle>
                </Styled.ButtonProductContent>
                <Styled.ButtonProductContent>
                    <Styled.ButtonStyled
                        variant="contained"
                        type="button"
                        onClick={handleSubmit(submitForm)}
                        disabled={!isValidProd}
                    >
                        <AddIcon />
                    </Styled.ButtonStyled>
                </Styled.ButtonProductContent>
            </Styled.FormProducts>
        </>

    )
}