import { FC, useEffect } from "react"
import { BodegasStore } from "./bodegas-store"
import { HeaderModule } from "components/HeaderModule"
import { observer } from "mobx-react"
import { Styled } from './styles'
import { EnhancedTable } from "components/TableFront"
import { StyledBodyTable } from "components/Table"
import { TableActions } from "components/TableActions"
import { Outlet } from "react-router-dom"


type Props = {
    store: BodegasStore
}

export const Bodegas: FC<Props> = observer((props) => {
    const {
        store
    } = props

    useEffect(() => {
        store.getBodegas.run()
    }, [store.getBodegas])

    return (
        <Styled.Content>
            <Outlet />
            <HeaderModule
                title="Bodegas"
                buttonProps={{
                    createFunction: store.goToCreate,
                    label: 'Crear Bodega'
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
                                {item.direccion}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item.descripcion}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                <TableActions
                                    update={() => store.goToUpdate(item.id)}
                                    remove={() => store.deleteBodega.run(item.id)}
                                />
                            </StyledBodyTable.StyledTableCell>
                        </StyledBodyTable.StyledTableRow>
                    ))
                }
            </EnhancedTable>
        </Styled.Content>
    )
})