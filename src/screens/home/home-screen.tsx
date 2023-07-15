import { FC } from "react"
import { Styled } from './styles'

export const Home: FC = () => {
    return (
        <Styled.Content>
            <Styled.CardStyled variant="contained">
                <Styled.CardContentStyled>
                <Styled.RoomPreferencesIconStyled />
                    <Styled.Title variant="h3">
                        Configuracion
                    </Styled.Title>
                </Styled.CardContentStyled>
            </Styled.CardStyled>
            <Styled.CardStyled variant="contained">
                <Styled.CardContentStyled>
                <Styled.ShoppingCartCheckoutIconStyled />
                    <Styled.Title variant="h3">
                        Productos
                    </Styled.Title>
                </Styled.CardContentStyled>
            </Styled.CardStyled>
            <Styled.CardStyled variant="contained">
                <Styled.CardContentStyled>
                    <Styled.StoreMallDirectoryIconStyled />
                    <Styled.Title variant="h3">
                        Inventario
                    </Styled.Title>
                </Styled.CardContentStyled>
            </Styled.CardStyled>
        </Styled.Content>
    )
}

export default Home