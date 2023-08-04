import { styled } from "@mui/material";
import { ButtonApp } from "components/Button/Button"

export namespace Styled {
    export const Content = styled('div')(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1)
    }))

    export const Form = styled('form')(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1.5),
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: '50%',
        }
    }))

    export const ButtonContent = styled('div')(({theme}) => ({
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(1)
    }))

    export const Button = styled(ButtonApp)({
        width: '150px'
    })
}