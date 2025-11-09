import { styled, Button, Typography } from '@mui/material';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';

export namespace Styled {
  export const Content = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    minHeight: '600px',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
    gap: theme.spacing(1),
  }));

  export const CardStyled = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
    width: '250px',
    height: '250px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  export const CardContentStyled = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
  }));

  export const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
  }));

  export const StoreMallDirectoryIconStyled = styled(StoreMallDirectoryIcon)(
    ({ theme }) => ({
      color: theme.palette.common.white,
      fontSize: '5rem',
    })
  );

  export const ShoppingCartCheckoutIconStyled = styled(
    ShoppingCartCheckoutIcon
  )(({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: '5rem',
  }));

  export const RoomPreferencesIconStyled = styled(RoomPreferencesIcon)(
    ({ theme }) => ({
      color: theme.palette.common.white,
      fontSize: '5rem',
    })
  );
}
