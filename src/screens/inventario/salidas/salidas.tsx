import { FC, useEffect } from "react"
import { SalidasStore } from "./salidas-store"
import { Styled } from './styles';
import { Outlet } from "react-router-dom";
import { HeaderModule } from "components/HeaderModule";
import { observer } from "mobx-react";
import { EnhancedTable } from "components/TableFront";
import { StyledBodyTable } from "components/Table";
import { TableActions } from "components/TableActions";
import dayjs from "dayjs";

type Props = {
    store: SalidasStore
}

export const Salidas: FC<Props> = observer((props) => {
    const {store} = props;

    useEffect(() => {
        store.getEntradas.run()
    }, [store.getEntradas])

    return (
        <Styled.Content>
            <Outlet />
            <HeaderModule
                title="Salidas"
                buttonProps={{
                    createFunction: store.goToCreate,
                    label: 'Crear Salida'
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
                                {dayjs(item.creado).format('MMMM D, YYYY')}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item?.bodega?.nombre}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                {item?.concepto}
                            </StyledBodyTable.StyledTableCell>
                            <StyledBodyTable.StyledTableCell>
                                <TableActions
                                    view={() => store.goToView(item.id)}
                                />
                            </StyledBodyTable.StyledTableCell>
                        </StyledBodyTable.StyledTableRow>
                    ))
                }
            </EnhancedTable>
        </Styled.Content>
    )
})