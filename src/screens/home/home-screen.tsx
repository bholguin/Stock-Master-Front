import { FC } from "react"
import { Styled } from './styles'
import { HomeStore } from "./home-screen-store"

type Props = {
    store: HomeStore
}

export const Home: FC<Props> = (props) => {
    return (
        <Styled.Content>
            <Styled.CardStyled
                variant="contained"
                onClick={props.store.goToConfig}
            >
                <Styled.CardContentStyled>
                    <Styled.RoomPreferencesIconStyled />
                    <Styled.Title variant="h3">
                        Configuracion
                    </Styled.Title>
                </Styled.CardContentStyled>
            </Styled.CardStyled>
            <Styled.CardStyled
                variant="contained"
                onClick={props.store.goToProductos}
            >
                <Styled.CardContentStyled>
                    <Styled.ShoppingCartCheckoutIconStyled />
                    <Styled.Title variant="h3">
                        Productos
                    </Styled.Title>
                </Styled.CardContentStyled>
            </Styled.CardStyled>
            <Styled.CardStyled
                variant="contained"
                onClick={props.store.goToInventario}
            >
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