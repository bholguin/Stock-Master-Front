import { FC, useEffect } from "react"
import { EntradasStore } from "./entrada-store"
import { Styled } from './styles';
import { Outlet } from "react-router-dom";
import { HeaderModule } from "components/HeaderModule";
import { observer } from "mobx-react";

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
        </Styled.Content>
    )
})