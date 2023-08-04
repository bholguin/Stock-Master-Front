import { styled, Paper, Fab } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export namespace Styled {
    export const Content = styled('div')({
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        height: '90vh',
        position: 'relative',
        paddingTop: '1rem'
    })

    export const TitlePage = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing(1),
        alignItems: 'center'
    }))

    export const ContentOptions = styled('div')(({ theme }) => ({
        width: '100%',
        display: 'flex',
        height: '90vh',
        flexDirection: 'column',
        gap: theme.spacing(2.5),
        padding: theme.spacing(1),
        [theme.breakpoints.up('lg')]: {
            width: '90%',
        }
    }))

    export const PaperStyled = styled(Paper)(({ theme }) => ({
        width: '100%',
        height: '90vh',
        position: 'relative',
        marginTop: theme.spacing(0),
        borderRadius: '5px',
        padding: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            marginTop: theme.spacing(0),
            padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
        }
    }))

    export const Options = styled('div')(({ theme }) => ({
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            left: '-135px',
            top: '85px',
            gap: theme.spacing(1)
        }
    }))


    export const PaperOption = styled(Paper, {
         shouldForwardProp: (props) => props !== 'active',
    })<{active: boolean}>(({ theme, active }) => ({
        width: '150px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(.5),
        cursor: 'pointer',
        backgroundColor: active ? theme.palette.primary.main:theme.palette.primary['50'],
        color: active ? theme.palette.common.white  : theme.palette.primary.dark,
        justifyContent: 'center',
        fontWeight: '700',
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'flex-start'
        }
    }))

    export const ArrowBackIconStyled = styled(ArrowBackIcon)(({ theme }) => ({
        color: theme.palette.common.white,
        fontSize: '2rem'
    }))

    export const FabStyled = styled(Fab)(({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        position: 'inherit',
        top: '1.5rem',
        left: '1rem',
        width: '4rem',
        height: '4rem',
        [theme.breakpoints.up('lg')]: {
            position: 'absolute'
        }
    }))


    export const SelectContent = styled('div')(({theme}) => ({
        display: 'flex',
        [theme.breakpoints.up('lg')]: {
            display: 'none'
        }
    }))
}