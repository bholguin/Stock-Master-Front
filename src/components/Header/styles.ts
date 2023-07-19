import { styled, Typography } from "@mui/material";
import { Logo } from "assets/Logo";
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';

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

    export const AvatarStyled = styled(Avatar)(({theme}) => ({
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white,
        width: '2.5rem',
        height: '2.5rem'
    }))

    export const MenuIconStyled = styled(MenuIcon)(({theme}) => ({
        width: '2.5rem',
        height: '2.5rem'
    }))

    export const AppBarStyled = styled(AppBar)(({theme}) => ({
        padding: '0 !important'
    }))

    export const Name = styled(Typography)({
        padding: 0
    })
}