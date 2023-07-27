import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Styled } from './styles'
import { Divider, ListItemIcon } from '@mui/material';
import { Logout, Person } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const pages = ['Configuracion', 'Productos', 'Inventario'];

type Props = {
    nombre: string
    empresa: string;
    goToConfig: () => void
    goToProduct: () => void;
    goToInventario: () => void
    goToPerfil: () => void
    logout: () => void
}

export const Header: FC<Props> = (props) => {

    const { empresa, goToConfig, goToProduct, goToInventario } = props;

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const location = useLocation();
    const activeLink = location.pathname.split('/');

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const ButtonMenu: FC<{page: string, redirect: () => void}> = (props) => {
        return (
            <Styled.ButtonStyled
                onClick={props.redirect}
                variant={activeLink.includes(props.page.toLocaleLowerCase()) ? 'outlined' : 'text'}
                sx={{ my: 1, color: !activeLink.includes(props.page.toLocaleLowerCase()) && 'white', display: 'block' }}
            >
                {props.page}
            </Styled.ButtonStyled>
        )
    }

    return (
        <Styled.AppBarStyled position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <Styled.MenuIconStyled />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 0.2,
                                    width: 200,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        left: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Styled.LogoContent>
                        <Styled.LogoStyled />
                        {`( ${empresa} )`}
                    </Styled.LogoContent>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-end', marginRight: '3rem', gap: '1rem' } }}>
                        <ButtonMenu page={"Configuracion"}  redirect={goToConfig}/>
                        <ButtonMenu page={"Productos"}  redirect={goToProduct}/>
                        <ButtonMenu page={"Inventario"}  redirect={goToInventario}/>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open options">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Styled.AvatarStyled alt="Avatar Account" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '50px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 0.2,
                                    width: 200,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                        >
                            <MenuItem>
                                <Styled.Name variant='h4'>
                                    {props?.nombre}
                                </Styled.Name>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={props.goToPerfil}>
                                <ListItemIcon>
                                    <Person fontSize="small" />
                                </ListItemIcon>
                                Perfil
                            </MenuItem>
                            <MenuItem onClick={props.logout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </Styled.AppBarStyled>
    );
}