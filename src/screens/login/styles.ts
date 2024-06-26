import {styled, Paper, Typography,  FormControlLabel, Radio, Fab} from '@mui/material'
import { InputRadioGroupForm } from "components/InputRadioGroup";
import DomainIcon from '@mui/icons-material/Domain';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Logo } from "assets/Logo"
import { ButtonApp } from 'components/Button/Button';

export namespace Styled {
    export const Content = styled('div')(({theme}) => ({
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2)
    }))

    export const LogoStyled = styled(Logo)(({theme}) => ({
        paddingBottom: theme.spacing(2)
    }))

    export const PaperStyled = styled(Paper)(({theme}) => ({
        width: '90%',
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('lg')]:{
            width: '40%',
        }
    }))

    export const ButtonStyled = styled(ButtonApp)(({theme}) => ({
        marginTop: theme.spacing(2),
    }))

    export const Title = styled(Typography)(({theme}) => ({
        fontSize: '4rem',
       color: theme.palette.primary.main,
       padding: '0'
    }))

    export const Form = styled('form')(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(3),
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }))

    export const InputRadioGroupFormStyled = styled(InputRadioGroupForm)({
        width:'100%'
    })

    export const Option = styled(Paper)(({theme}) => ({
        padding: '0.5rem 1rem',
        backgroundColor: theme.palette.primary['400'],
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }))

    export const FormControlLabelStyled = styled(FormControlLabel)(({theme}) => ({
        ".MuiFormControlLabel-label":{
            color: theme.palette.common.white,
            padding: 0
        }
    }))

    export const RadioStyled = styled(Radio)(({theme}) => ({
        color: theme.palette.common.white,
        '&.Mui-checked': {
            color: theme.palette.common.white,
          },
    }))

    export const DomainIconStyled = styled(DomainIcon)(({theme}) => ({
        color: theme.palette.common.white,
        fontSize: '2rem'
    }))

    export const ArrowBackIconStyled = styled(ArrowBackIcon)(({theme}) => ({
        color: theme.palette.common.white,
        fontSize: '2rem'
    }))

    export const ArrowForwardIconStyled = styled(ArrowForwardIcon)(({theme}) => ({
        color: theme.palette.common.white,
    }))

    export const FabStyled = styled(Fab)(({theme}) => ({
        backgroundColor: theme.palette.primary.main,
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        width: '5rem',
        height: '5rem'
    }))
}