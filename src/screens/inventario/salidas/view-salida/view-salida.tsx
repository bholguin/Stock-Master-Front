import { FC, useEffect } from "react"
import { ViewSalidaBodegaStore } from "./view-salida-store"
import { Styled } from "../styles"
import { ButtonApp } from "components/Button/Button"
import { observer } from "mobx-react"
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces"
import { FormProd } from "components/AddItem"
import { StyledBodyTable } from "components/Table"
import { Table, TableBody, TableHead } from "@mui/material"
import dayjs from "dayjs"

type Props = {
    store: ViewSalidaBodegaStore
}

export type Form = {
    bodega: SelectItem
    tipodoc: SelectItem
    concepto: string
    consecutivo: number
    productos: Array<FormProd>
}

export const ViewSalidaBodega: FC<Props> = observer((props) => {

    const { store } = props

    useEffect(() => {
        store.init.run()
    }, [store.init])

    return (
        <Styled.DialogStyled
            open={store.show.isVisible}

        >
            <Styled.Form>
                <Styled.DialogTitleStyled>
                    {`${store?.salida?.tipodoc?.prefijo} - ${store?.salida?.consecutivo}`}
                    <Styled.CloseIconStyled onClick={store.goBack} />
                </Styled.DialogTitleStyled>
                <Styled.DialogContentStyled>
                    <Styled.TypographyStyles variant="h4">{dayjs(store?.salida?.creado).format('MMMM D, YYYY')}</Styled.TypographyStyles>
                    <Styled.TypographyStyles variant="h4">{store?.salida?.bodega?.nombre}</Styled.TypographyStyles>
                    {store?.salida?.concepto && <Styled.TypographyStyles variant="h4">{store?.salida?.concepto}</Styled.TypographyStyles>}
                    <Styled.DividerViewStyles />
                    <Styled.ProductContent>
                        <Table>
                            <TableHead>
                                <StyledBodyTable.StyledTableRow >
                                    <StyledBodyTable.StyledTableCell>Producto</StyledBodyTable.StyledTableCell>
                                    <StyledBodyTable.StyledTableCell>Cantidad</StyledBodyTable.StyledTableCell>
                                </StyledBodyTable.StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    store.items.map((item, index) => {
                                        return (
                                            <StyledBodyTable.StyledTableRow key={`row-table-${item.cantidad}`}>
                                                <StyledBodyTable.StyledTableCell>{item.producto.nombre}</StyledBodyTable.StyledTableCell>
                                                <StyledBodyTable.StyledTableCell>{`${item.cantidad} ${item.producto.unidad.prefijo}`}</StyledBodyTable.StyledTableCell>
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
                        onClick={store.goBack}
                    >
                        Cancelar
                    </ButtonApp>
                </Styled.DialogActionsStyled>
            </Styled.Form>
        </Styled.DialogStyled>
    )
})