import { Button, styled } from "@mui/material";

export namespace Styled {
    export const ButtonStyled = styled(Button)(({theme}) => ({
        "&.Mui-disabled":{
            'backgroundColor': theme.palette.primary['100']
        }
    }))
}