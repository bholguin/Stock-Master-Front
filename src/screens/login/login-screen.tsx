import { FC, useEffect } from "react"
import { Styled } from "./styles"
import { observer } from "mobx-react"
import { Outlet } from "react-router-dom"
import { LoginScreenStore } from "./login-screen-store"

type Props = {
    store: LoginScreenStore
}

export const Login: FC<Props> = observer((props) => {

    useEffect(() => {
        props.store.testToken.run()
    }, [props.store])

    return (
        <Styled.Content>
            <Styled.PaperStyled elevation={24}>
                <Styled.LogoStyled />
                <Outlet />
            </Styled.PaperStyled>
        </Styled.Content>
    )
})