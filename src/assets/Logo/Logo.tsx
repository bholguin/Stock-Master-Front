import { FC } from "react"
import { Styled } from './styles'

type Props = {
    className?: string
}

export const Logo: FC<Props> = (props) => {
    return (
        <Styled.Content className={props.className}>
            <Styled.StartName>
                Stock
            </Styled.StartName>
            <Styled.LastName>
                Master
            </Styled.LastName>
        </Styled.Content>
    )
}