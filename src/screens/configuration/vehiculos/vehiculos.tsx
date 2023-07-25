import { FC, useEffect } from "react"
import { VeiculosStore } from "./vehiculos-store"
import { HeaderModule } from "components/HeaderModule"
import { observer } from "mobx-react"
import { Styled } from './styles'
import { EnhancedTable } from "components/TableFront"
import { StyledBodyTable } from "components/Table"
import { TableActions } from "components/TableActions"
import { Outlet } from "react-router-dom"


type Props = {
    store: VeiculosStore
}

export const Vehiculos: FC<Props> = observer((props) => {
    const {
        store
    } = props

    useEffect(() => {
        store.getVehiculos.run()
    }, [store.getVehiculos])

    return (
        <Styled.Content>
            <Outlet />
            <HeaderModule
                title="Vehiculos"
                buttonProps={{
                    createFunction: store.goToCreate,
                    label: 'Crear Vehiculo'
                }}
            />
            <EnhancedTable
                store={store.tableStore}
            >
                {
                    store.tableStore.showRows.map((item) => (
                        <StyledBodyTable.StyledTableRow key={`row-table-${item.id}`}>
                            <StyledBodyTable.StyledTableCell>
                                {item.placa}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item.marca}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item.modelo}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item.descripcion}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                <TableActions
                                    update={() => store.goToUpdate(item.id)}
                                    remove={() => store.deleteVehiculos.run(item.id)}
                                />
                            </StyledBodyTable.StyledTableCell>
                        </StyledBodyTable.StyledTableRow>
                    ))
                }
            </EnhancedTable>
        </Styled.Content>
    )
})