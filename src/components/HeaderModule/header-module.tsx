import { Styled } from "./styles"
import { FC } from "react";

type Props = {
    title: string;
    createFunction?: () => void
}

export const HeaderModule: FC<Props> = (props) => {
    const { title, createFunction } = props;
    return (
        <Styled.Content>
            <Styled.Title variant="h2">
                {title}
            </Styled.Title>
            {createFunction &&
                <Styled.FabStyled
                    onClick={createFunction}
                >
                    <Styled.AddStyled />
                </Styled.FabStyled>
            }
        </Styled.Content>
    )
}