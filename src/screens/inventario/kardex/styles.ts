import { styled, Typography } from "@mui/material";

export namespace Styled {

    export const Content = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    }))

    export const Form = styled('form')(({ theme }) => ({
        display: 'flex',
        gap: theme.spacing(2),
        width: '100%',
        flexDirection: 'column',
        [theme.breakpoints.up('lg')]: {
            width: '60%',
            display: 'flex',
            gap: theme.spacing(1),
            flexDirection: 'row',
        }
    }))

    export const TableTypography = styled(Typography)(({ theme }) => ({
        padding: 0
    }))
}