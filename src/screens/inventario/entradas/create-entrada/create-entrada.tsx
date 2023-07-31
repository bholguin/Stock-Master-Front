import { FC, useCallback, useEffect, useRef } from "react"
import { CreateEntradaBodegaStore } from "./create-entrada-store"
import { Styled } from "../styles"
import { ButtonApp } from "components/Button/Button"
import { useFieldArray, useForm } from "react-hook-form"
import { observer } from "mobx-react"
import { SelectComponentForm } from "components/SelectComponent"
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces"
import { InputTextForm } from "components/InputText"
import { AddITem, FormProd } from "components/AddItem"
import { StyledBodyTable } from "components/Table"
import { TableActions } from "components/TableActions"
import { Table, TableBody } from "@mui/material"

type Props = {
    store: CreateEntradaBodegaStore
}

export type Form = {
    bodega: SelectItem
    tipodoc: SelectItem
    concepto: string
    consecutivo: number
    productos: Array<FormProd>
}

export const CreateEntradaBodega: FC<Props> = observer((props) => {

    const { store } = props

    const inputRef = useRef<HTMLInputElement>()

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
        console.log(data);
        store.postEntrada.run(data)
    }, [store.postEntrada])

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

    return (
        <Styled.DialogStyled
            open={store.show.isVisible}

        >
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <Styled.DialogTitleStyled>
                    Crear Entrada
                    <Styled.CloseIconStyled onClick={store.goBack} />
                </Styled.DialogTitleStyled>
                <Styled.DialogContentStyled>
                    <Styled.WrapFields>
                        <SelectComponentForm
                            control={control}
                            name="tipodoc"
                            options={store.tiposdocList}
                            label="Tipo de Documento"
                            onChange={onChangeTipoDocumento}
                            rules={{
                                required: 'Campo requerido'
                            }}
                        />
                        <InputTextForm
                            control={control}
                            name="consecutivo"
                            inputProps={{
                                label: 'Consecutivo',
                                fullWidth: true,
                                disabled: true
                            }}
                        />
                    </Styled.WrapFields>
                    <Styled.WrapFields>
                        <SelectComponentForm
                            control={control}
                            name="bodega"
                            options={store.bodegas}
                            label="Bodegas"
                            rules={{
                                required: 'Campo requerido'
                            }}
                        />
                        <InputTextForm
                            control={control}
                            name="concepto"
                            inputProps={{
                                label: 'Concepto',
                                fullWidth: true,
                            }}
                        />
                    </Styled.WrapFields>
                    <Styled.DividerStyles />
                    <Styled.ProductContent>
                        <AddITem
                            productos={store.productos}
                            submit={submitProducto}
                            ref={inputRef}
                        />
                        <Table>
                            <TableBody>
                                {
                                    fields.map((item, index) => {
                                        return (
                                            <StyledBodyTable.StyledTableRow key={`row-table-${item.id}`}>
                                                <StyledBodyTable.StyledTableCell>{item.producto.label}</StyledBodyTable.StyledTableCell>
                                                <StyledBodyTable.StyledTableCell>{`${item.cantidad} ${item.producto.group}`}</StyledBodyTable.StyledTableCell>
                                                <StyledBodyTable.StyledTableCell>
                                                    <TableActions
                                                        remove={() => remove(index)}
                                                    />
                                                </StyledBodyTable.StyledTableCell>
                                            </StyledBodyTable.StyledTableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Styled.ProductContent>
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