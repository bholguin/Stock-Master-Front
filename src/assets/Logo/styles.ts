import { Typography, styled } from "@mui/material";

export namespace Styled {

    export const Content = styled('div')(({
        display: 'flex',
    }))

    export const StartName = styled(Typography)(({theme}) => ({
        padding: '0',
        fontSize: '3rem',
        color: theme.palette.primary.main
    }))

    export const LastName = styled(Typography)(({theme}) => ({
        padding: '0',
        fontSize: '3rem',
        fontWeight: '700',
        color: theme.palette.primary['700']
    }))
}