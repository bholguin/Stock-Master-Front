import { styled } from "@mui/material";
import { ButtonApp } from "components/Button/Button";
import { theme } from "config/theme";

export namespace Styled {
    export const Content = styled('div')(({theme}) => ({
        display: 'flex',
        justifyContent: 'flex-end',
        gap: theme.spacing(.5)
    }))
    
    export const ButtonStyled = styled(ButtonApp)({
        width: '2rem',
        minWidth: '1.5rem'
    })

    export const ButtonRemoveStyled = styled(ButtonApp)(() => ({
        width: '2rem',
        minWidth: '1.5rem',
        backgroundColor: theme.palette.error.light,
        '&:hover':{
            backgroundColor: theme.palette.error.light, 
        }
    }))
}