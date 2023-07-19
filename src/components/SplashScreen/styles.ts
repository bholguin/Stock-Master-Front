import { styled } from "@mui/material";

export namespace Styled {
    export const Content = styled('div')({
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        zIndex: '50000',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    })
}