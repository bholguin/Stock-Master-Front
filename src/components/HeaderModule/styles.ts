import { styled, Typography } from "@mui/material";
import Add from '@mui/icons-material/Add';
export namespace Styled {
    export const Content = styled('div')(({theme}) => ({
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    }))

    export const AddStyled = styled(Add)(({ theme }) => ({
        color: theme.palette.common.white,
        fontSize: '1.5rem'
    }))

    export const Title = styled(Typography)({
        padding: '0'
    })
}