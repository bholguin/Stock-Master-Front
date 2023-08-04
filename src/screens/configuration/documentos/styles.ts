import { styled, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export namespace Styled {
    export const Content = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        [theme.breakpoints.up('lg')]: { 
            gap: theme.spacing(4),
        }
    }))

    export const DialogStyled = styled(Dialog)(() => ({
        '& .MuiPaper-root': {
            'borderRadius': '10px',
            'minWidth': '45%',
            'padding': '1rem',
          },
    }))

    export const DialogTitleStyled = styled(DialogTitle)(() => ({
        fontSize: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }))

    export const DialogContentStyled = styled(DialogContent)(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1.5)
    }))

    export const DialogActionsStyled = styled(DialogActions)(() => ({

    }));

    export const Form = styled('form')(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1)
    }))

    export const CloseIconStyled = styled(CloseIcon)(({theme}) => ({
        color: theme.palette.primary.main,
        fontSize: '3rem',
        margin: theme.spacing(.5),
        cursor: 'pointer'
    }))
}