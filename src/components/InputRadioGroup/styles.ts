import { RadioGroup, styled } from "@mui/material";

export namespace Styled {
    export const RadioGroupStyled = styled(RadioGroup)(({theme}) => ({
        width: '100%',
        gap: theme.spacing(.5)
    }))
}