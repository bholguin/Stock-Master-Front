import { FC, useEffect } from "react"
import { EntradasStore } from "./entrada-store"
import { Styled } from './styles';
import { Outlet } from "react-router-dom";
import { HeaderModule } from "components/HeaderModule";
import { observer } from "mobx-react";
import { EnhancedTable } from "components/TableFront";
import { StyledBodyTable } from "components/Table";
import { TableActions } from "components/TableActions";

type Props = {
    store: EntradasStore
}

export const Entradas: FC<Props> = observer((props) => {
    const {store} = props;

    useEffect(() => {
        store.getEntradas.run()
    }, [store.getEntradas])

    return (
        <Styled.Content>
            <Outlet />
            <HeaderModule
                title="Entradas"
                buttonProps={{
                    createFunction: store.goToCreate,
                    label: 'Crear Entrada'
                }}
            />
             <EnhancedTable
                store={store.tableStore}
            >
                {
                    store.tableStore.showRows.map((item) => (
                        <StyledBodyTable.StyledTableRow key={`row-table-${item.id}`}>
                            <StyledBodyTable.StyledTableCell>
                                {`${item?.tipodoc?.prefijo} - ${item.consecutivo}`}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item.creado}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item?.bodega?.nombre}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item?.concepto}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                <TableActions
                                    update={() => {}}
                                />
                            </StyledBodyTable.StyledTableCell>
                        </StyledBodyTable.StyledTableRow>
                    ))
                }
            </EnhancedTable>
        </Styled.Content>
    )
})