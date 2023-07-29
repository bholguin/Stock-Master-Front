import { Typography, styled } from "@mui/material"
import { ButtonApp } from "components/Button/Button"

export namespace Styled {
    export const ProductContent = styled('div')(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        padding: '0rem 1rem'
    }))

    export const FormProducts = styled('div')(({theme}) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing(3),
    }))

    export const ButtonProductContent = styled('div')(({theme}) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }))

    export const ButtonStyled = styled(ButtonApp)({
        width: '2.5rem',
        minWidth: '1.5rem',
        height: '2.5rem'
    })

    export const PrefijoStyle = styled(Typography)({
        padding: '0'
    })
}