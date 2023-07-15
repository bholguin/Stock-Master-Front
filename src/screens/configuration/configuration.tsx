import { FC } from "react"
import { Styled } from "./styles"
import { Typography } from "@mui/material"

export const Configuration: FC = () => {
    return (
        <Styled.Content>
            <Styled.ContentOptions>
                <Styled.TitlePage>
                    <Styled.FabStyled onClick={() => { }}>
                        <Styled.ArrowBackIconStyled />
                    </Styled.FabStyled>
                    <Typography variant="h1">
                        Configuracion
                    </Typography>
                </Styled.TitlePage>
                <Styled.PaperStyled elevation={24} square>
                    <Styled.Options>
                        <Styled.PaperOption elevation={6}>
                            Usuarios
                        </Styled.PaperOption>
                        <Styled.PaperOption elevation={6}>
                            Vehiculos
                        </Styled.PaperOption>
                    </Styled.Options>
                </Styled.PaperStyled>
            </Styled.ContentOptions>

        </Styled.Content>
    )
}