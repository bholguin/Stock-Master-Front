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
        props.store.getUsuario.run()
    }, [props.store.getUsuario])

    return (
        <Styled.Content>
            <Header
                nombre={props.store.name}
                goToPerfil={props.store.goToPerfil}
            />
            <Outlet />
        </Styled.Content>
    )
})