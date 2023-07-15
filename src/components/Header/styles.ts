import { styled } from "@mui/material";
import { Logo } from "assets/Logo";

export namespace Styled {
    export const LogoStyled = styled(Logo)(({theme}) => ({
        paddingRight: '0',
        flexGrow: 1,
        'p':{
            color: theme.palette.common.white,
            fontSize: '2.5rem'
        },
        [theme.breakpoints.up('md')]:{
            flexGrow: 0,
            paddingRight: '1rem',
        }
    }))
}