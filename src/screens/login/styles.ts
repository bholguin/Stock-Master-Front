import {styled, Paper, Typography, Button, FormControlLabel, Radio, Fab} from '@mui/material'
import { InputRadioGroupForm } from "components/InputRadioGroup";
import DomainIcon from '@mui/icons-material/Domain';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export namespace Styled {
    export const Content = styled('div')(({theme}) => ({
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2)
    }))

    export const PaperStyled = styled(Paper)(({theme}) => ({
        width: '90%',
        padding: theme.spacing(4),
        [theme.breakpoints.up('lg')]:{
            width: '40%',
        }
    }))

    export const ButtonStyled = styled(Button)(({theme}) => ({
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
        position: 'relative'
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

    export const FabStyled = styled(Fab)(({theme}) => ({
        backgroundColor: theme.palette.primary.main,
        position: 'absolute',
        top: '0',
        left: '0',
        width: '3rem',
        height: '3rem'
    }))
}