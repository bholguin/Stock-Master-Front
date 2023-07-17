import { FC, useEffect } from "react"
import { VeiculosStore } from "./vehiculos-store"
import { HeaderModule } from "components/HeaderModule"
import { observer } from "mobx-react"
import { Styled } from './styles'
import { EnhancedTable } from "components/TableFront"
import { StyledBodyTable } from "components/Table"
import { TableActions } from "components/TableActions"


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
            <HeaderModule
                title="Vehiculos"
                createFunction={() => { }}
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
                                {item.descripcion}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                <TableActions />
                            </StyledBodyTable.StyledTableCell>
                        </StyledBodyTable.StyledTableRow>
                    ))
                }
            </EnhancedTable>
        </Styled.Content>
    )
})