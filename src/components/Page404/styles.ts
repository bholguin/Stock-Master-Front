import { styled, Typography } from '@mui/material';
import { ButtonApp } from 'components/Button/Button';

export namespace Styled {
  export const Content = styled('div')(({ theme }) => ({
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.primary['50'],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: '20px',
  }));

  export const Information = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  });

  export const PageTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.dark,
    fontSize: '3rem',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0',
    opacity: 1,
  }));


  export const ButtonStyle = styled(ButtonApp)(({ theme }) => ({

  }));
}
