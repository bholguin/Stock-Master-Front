import { FC, useCallback, useEffect, useState } from "react"
import { Styled } from "./styles"
import { Typography } from "@mui/material"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces"
import { SelectComponent } from "components/SelectComponent"

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
    const [options, setOptions] = useState<Array<SelectItem>>([])
    const goTo = useCallback((place: string) => navigate(place), [navigate])
    const activeLink = location.pathname.split('/');

    const onChangeRoute = useCallback((event, value) => {
        if (value?.value) {
            goTo(value.value)
        }
    }, [goTo])

    useEffect(() => {
        if (Array.isArray(pages)) {
            setOptions(
                pages.map(item => ({
                    label: item.label,
                    value: item.goTo
                }))
            )
        }
    }, [pages])

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
                {options.length > 0 && <Styled.SelectContent>
                    <SelectComponent
                        onChange={onChangeRoute}
                        value={options.find(item => activeLink.includes(item.value)) ?? null}
                        options={options}
                        label='Submenu'
                    />
                </Styled.SelectContent>}
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