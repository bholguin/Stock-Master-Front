import { FC, useEffect } from "react"
import { UnidadesMedidasStore } from "./unidades-store"
import { HeaderModule } from "components/HeaderModule"
import { observer } from "mobx-react"
import { Styled } from './styles'
import { EnhancedTable } from "components/TableFront"
import { StyledBodyTable } from "components/Table"
import { TableActions } from "components/TableActions"
import { Outlet } from "react-router-dom"


type Props = {
    store: UnidadesMedidasStore
}

export const UnidadesMedidas: FC<Props> = observer((props) => {
    const {
        store
    } = props

    useEffect(() => {
        store.getUnidades.run()
    }, [store.getUnidades])

    return (
        <Styled.Content>
            <Outlet />
            <HeaderModule
                title="Unidades de Medida"
                buttonProps={{
                    createFunction: store.goToCreate,
                    label: 'Crear Unidad'
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
                                {item.prefijo}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item.descripcion}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                <TableActions
                                    update={() => store.goToUpdate(item.id)}
                                    remove={() => store.deleteUnidad.run(item.id)}
                                />
                            </StyledBodyTable.StyledTableCell>
                        </StyledBodyTable.StyledTableRow>
                    ))
                }
            </EnhancedTable>
        </Styled.Content>
    )
})