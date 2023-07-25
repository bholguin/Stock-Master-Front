import { styled } from "@mui/material";

export namespace Styled {
    export const Content = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(4)
    }))
}