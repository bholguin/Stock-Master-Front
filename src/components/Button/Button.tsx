import { ButtonProps } from "@mui/material"
import { FC } from "react"
import {Styled} from './styles'



export const ButtonApp: FC<ButtonProps> = (props) => {
    return <Styled.ButtonStyled
        {...props}
    />
}