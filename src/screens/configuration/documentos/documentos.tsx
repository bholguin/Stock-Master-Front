import { FC, useEffect } from "react"
import { DocumentoStore } from "./documentos-store"
import { HeaderModule } from "components/HeaderModule"
import { observer } from "mobx-react"
import { Styled } from './styles'
import { EnhancedTable } from "components/TableFront"
import { StyledBodyTable } from "components/Table"
import { TableActions } from "components/TableActions"
import { Outlet } from "react-router-dom"


type Props = {
    store: DocumentoStore
}

export const Documentos: FC<Props> = observer((props) => {
    const {
        store
    } = props

    useEffect(() => {
        store.getTiposDocuento.run()
    }, [store.getTiposDocuento])

    return (
        <Styled.Content>
            <Outlet />
            <HeaderModule
                title="Tipos de Documentos"
                buttonProps={{
                    createFunction: store.goToCreate,
                    label: 'Crear Tipo Documento'
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
                                {item.consecutivo}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item.submodulo_id}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item.descripcion}
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