import { HeaderModule } from "components/HeaderModule"
import { FC, useCallback, useEffect } from "react"
import { KardexStore } from "./kardex-store"
import { SelectComponentForm } from "components/SelectComponent"
import { useForm } from "react-hook-form"
import { observer } from "mobx-react"
import { Styled } from "./styles"
import { ButtonApp } from "components/Button/Button"
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces"
import { EnhancedTable } from "components/TableFront"
import { StyledBodyTable } from "components/Table"
import dayjs from "dayjs"
import { Typography } from "@mui/material"

export type Form = {
    producto: SelectItem
    bodega: SelectItem
}

type Props = {
    store: KardexStore
}

export const Kardex: FC<Props> = observer((props) => {

    const { store } = props;

    const { control, handleSubmit, reset, formState: { isValid } } = useForm<Form>({
        mode: 'onChange',
        defaultValues: {
            bodega: null,
            producto: null
        }
    })

    const submit = useCallback((data: Form) => {
        store.getKardex.run(data)
    }, [store.getKardex])

    useEffect(() => {
        store.init.run()
    }, [store.init])

    useEffect(() => {
        reset({
            bodega: store.bodegas.length === 1 ? store.bodegas[0] : null
        })
    }, [store.bodegas, reset])

    return (
        <Styled.Content>
            <HeaderModule title="Kardex" />
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <SelectComponentForm
                    control={control}
                    name="producto"
                    options={store.productos}
                    label="Productos"
                    rules={{
                        required: 'Campo requerido'
                    }}
                />
                <SelectComponentForm
                    control={control}
                    name="bodega"
                    options={store.bodegas}
                    label="Bodegas"
                    rules={{
                        required: 'Campo requerido'
                    }}
                />
                <ButtonApp
                    variant="contained"
                    disabled={!isValid}
                    type="submit"
                >
                    Consultar
                </ButtonApp>
            </Styled.Form>
            <Typography variant="h2">{store?.product?.label}</Typography>
            {store.tableStore.showRows.length > 0 &&
                <EnhancedTable
                    store={store.tableStore}
                >
                    {
                        store.tableStore.showRows.map((item) => (
                            <StyledBodyTable.StyledTableRow key={`row-table-${item.id}`}>
                                <StyledBodyTable.StyledTableCell>
                                    {`${item?.documento.tipodoc?.prefijo} - ${item?.documento?.consecutivo}`}
                                </StyledBodyTable.StyledTableCell>
                                <StyledBodyTable.StyledTableCell>
                                    {dayjs(item.creado).format('MMMM D, YYYY')}
                                </StyledBodyTable.StyledTableCell>
                                <StyledBodyTable.StyledTableCell align="right">
                                    {item.tipo === "E" && item.cantidad}
                                </StyledBodyTable.StyledTableCell>
                                <StyledBodyTable.StyledTableCell align="right">
                                    {item.tipo === "S" && item.cantidad}
                                </StyledBodyTable.StyledTableCell>
                            </StyledBodyTable.StyledTableRow>
                        ))
                    }
                    <StyledBodyTable.StyledTableRow >
                        <StyledBodyTable.StyledTableCell rowSpan={2} />
                        <StyledBodyTable.StyledTableCell colSpan={2} align="right">
                            <Styled.TableTypography variant="h3">Saldo</Styled.TableTypography>
                        </StyledBodyTable.StyledTableCell>
                        <StyledBodyTable.StyledTableCell align="right">
                            <Styled.TableTypography variant="h3">{`${store.saldo} ${store?.product?.group}`}</Styled.TableTypography>
                        </StyledBodyTable.StyledTableCell>
                    </StyledBodyTable.StyledTableRow >
                </EnhancedTable>
            }

        </Styled.Content>
    )
})