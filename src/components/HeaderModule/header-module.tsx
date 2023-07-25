import { ButtonApp } from "components/Button/Button";
import { Styled } from "./styles"
import { FC } from "react";

type Props = {
    title: string;
    buttonProps?: {
        label: string,
        createFunction: () => void
    }
   
}

export const HeaderModule: FC<Props> = (props) => {
    const { title, buttonProps } = props;
    return (
        <Styled.Content>
            <Styled.Title variant="h2">
                {title}
            </Styled.Title>
            {buttonProps &&
                <ButtonApp
                    variant="contained"
                    onClick={buttonProps.createFunction}
                    endIcon={<Styled.AddStyled />}
                >
                    {buttonProps.label}
                </ButtonApp>
            }
        </Styled.Content>
    )
}