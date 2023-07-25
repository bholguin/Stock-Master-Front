import { FC, useEffect } from "react"
import { DetalleProductoStore } from "./detalle-producto-store"
import {Styled} from './styles'
import { Outlet } from "react-router-dom"
import { HeaderModule } from "components/HeaderModule"
import { EnhancedTable } from "components/TableFront"
import { StyledBodyTable } from "components/Table"
import { TableActions } from "components/TableActions"
import { observer } from "mobx-react"

type Props = {
    store: DetalleProductoStore
}

export const DetalleProducto: FC<Props> = observer((props) => {

    const {store} = props

    useEffect(() => {
        store.getProductos.run()
    }, [store.getProductos])

    return (
        <Styled.Content>
            <Outlet />
            <HeaderModule
                title=""
                buttonProps={{
                    createFunction: store.goToCreate,
                    label: 'Crear Producto'
                }}
            />
            <EnhancedTable
                store={store.tableStore}
            >
                {
                    store.tableStore.showRows.map((item) => (
                        <StyledBodyTable.StyledTableRow key={`row-table-${item.id}`}>
                            <StyledBodyTable.StyledTableCell>
                                {item.nombre}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item.referencia}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item?.unidad?.nombre}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item.descripcion}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                <TableActions
                                    update={() => {}}
                                    remove={() => store.deleteProducto.run(item.id)}
                                />
                            </StyledBodyTable.StyledTableCell>
                        </StyledBodyTable.StyledTableRow>
                    ))
                }
            </EnhancedTable>
        </Styled.Content>
    )
})