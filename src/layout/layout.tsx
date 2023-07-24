import { Header } from "components/Header"
import { FC, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { LayoutStore } from "./layout-store"
import { observer } from "mobx-react"
import { useAxiosConfig } from "config/axios"
import { Styled } from './styled'

type Props = {
    store: LayoutStore
}

export const Layout: FC<Props> = observer((props) => {
    useAxiosConfig()
    useEffect(() => {
        props.store.init.run()
    }, [props.store.init])

    return props.store.getUsuario.status.isDone && (
        <Styled.Content>
            <Header
                empresa={props.store.empresaName}
                nombre={props.store.name}
                goToPerfil={props.store.goToPerfil}
                logout={() => props.store.logout.run()}
            />
            <Outlet />
        </Styled.Content>
    )
})