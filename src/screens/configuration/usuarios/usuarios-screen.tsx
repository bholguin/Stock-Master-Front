import { FC, useEffect } from "react"
import { UsuariosStore } from "./usuarios-store"
import {Styled} from './styles'
import { Outlet } from "react-router-dom"
import { HeaderModule } from "components/HeaderModule"
import { EnhancedTable } from "components/TableFront"
import { observer } from "mobx-react"
import { StyledBodyTable } from "components/Table"
import { TableActions } from "components/TableActions"

type Props = {
    store: UsuariosStore
}

export const Usuarios: FC<Props> = observer((props) => {

    const {store} = props

    useEffect(() => {
        store.getUsuarios.run()
    }, [store.getUsuarios])

    return(
        <Styled.Content>
            <Outlet />
            <HeaderModule
                title="Usuarios"
                createFunction={store.goToCreate}
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
                                {item.apellido}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item.username}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item.telefono}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item.correo}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                <TableActions
                                    update={() => store.goToUpdate(item.id)}
                                />
                            </StyledBodyTable.StyledTableCell>
                        </StyledBodyTable.StyledTableRow>
                    ))
                }
            </EnhancedTable>
        </Styled.Content>
    )
})