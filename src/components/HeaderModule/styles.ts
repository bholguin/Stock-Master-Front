import { Fab, styled, Typography } from "@mui/material";
import Add from '@mui/icons-material/Add';
export namespace Styled {
    export const Content = styled('div')(({theme}) => ({
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: theme.spacing(1)
    }))

    export const FabStyled = styled(Fab)(({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        width: '2.5rem',
        height: '2.5rem',
    }))

    export const AddStyled = styled(Add)(({ theme }) => ({
        color: theme.palette.common.white,
        fontSize: '1.5rem'
    }))

    export const Title = styled(Typography)({
        padding: '0'
    })
}