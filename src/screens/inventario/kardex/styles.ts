import { styled } from "@mui/material";

export namespace Styled {

    export const Content = styled('div')(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2)
    }))

    export const Form = styled('form')(({theme}) => ({
        display: 'flex',
        gap: theme.spacing(2)
    }))
}