import { RadioGroupProps } from "@mui/material"
import { FC } from "react"
import {Styled} from './styles'
export const InputRadioGroup: FC<RadioGroupProps> = (props) => {
    return (
        <Styled.RadioGroupStyled
            {...props}
        />
    )
}