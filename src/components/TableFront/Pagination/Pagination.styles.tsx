import { styled, alpha } from '@mui/system';
import Pagination from '@mui/material/Pagination';
import Menu, { MenuProps } from '@mui/material/Menu';
import { Button, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export namespace Styled {
  export const PaginationContent = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'flex-end',
  });

  export const ButtonContent = styled('div')({
    position: 'absolute',
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem',
  });

  export const LabelButtonStyle = styled(Typography)({
    padding: '0',
  });

  export const PaginationStyle = styled(Pagination)(({ theme }) => ({
    '& .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: theme.palette.primary['300'],
      color: theme.palette.common.white,
    },
  }));

  export const ButtonStyle = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.main,
    border: `solid 1px ${theme.palette.primary.main}`,
    padding: '3px 10px',
    minWidth: '0',
    boxShadow: '1px 1px 3px #00000033',
    borderRadius: '10px',
  }));

  export const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      'borderRadius': 6,
      'marginTop': theme.spacing(1),
      'color':
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      'boxShadow':
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

  export const KeyboardArrowDownIconStyled = styled(KeyboardArrowDownIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: '1rem'
  }))
  
}
