import { FC } from "react"
import { Styled } from "./styles"
import { Typography } from "@mui/material"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

export type PageNavigationItem = {
    label: string;
    goTo: string;
}

type Props = {
    page: string,
    goBack: () => void
    pages: Array<PageNavigationItem>
}

export const LayoutPage: FC<Props> = (props) => {

    const {
        page,
        goBack,
        pages
    } = props

    const location = useLocation();
    const navigate = useNavigate()
    const goTo = (place: string) => navigate(place)
    const activeLink = location.pathname.split('/');

    return (
        <Styled.Content>
            <Styled.ContentOptions>
                <Styled.TitlePage>
                    <Styled.FabStyled onClick={goBack}>
                        <Styled.ArrowBackIconStyled />
                    </Styled.FabStyled>
                    <Typography variant="h1">
                        {page}
                    </Typography>
                </Styled.TitlePage>
                <Styled.PaperStyled elevation={24} square>
                    <Styled.Options>
                        {
                            pages.map((item) => (
                                <Styled.PaperOption
                                    key={`page-${item.label}`}
                                    elevation={6}
                                    active={activeLink.includes(item.goTo)}
                                    onClick={() => goTo(item.goTo)}
                                >
                                    {item.label}
                                </Styled.PaperOption>
                            ))
                        }
                    </Styled.Options>
                    <Outlet />
                </Styled.PaperStyled>
            </Styled.ContentOptions>

        </Styled.Content>
    )
}