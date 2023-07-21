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
        width: '50%'
    }))

    export const ButtonContent = styled('div')(({theme}) => ({
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(1)
    }))

    export const Button = styled(ButtonApp)({
        width: '150px'
    })

    export const FullName = styled('div')(({theme}) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing(2),
        width: '100%'
    }))
}