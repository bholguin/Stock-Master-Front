import { FC } from "react"
import { Styled } from "./styles"
import { observer } from "mobx-react"
import { Outlet } from "react-router-dom"



export const Login: FC = observer((props) => {


    return (
        <Styled.Content>
            <Styled.PaperStyled elevation={24}>
                <Outlet />
            </Styled.PaperStyled>
        </Styled.Content>
    )
})