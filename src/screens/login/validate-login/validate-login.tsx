import { FC } from "react"
import { InputTextForm } from "../../../components/InputText"
import { Styled } from "../styles"
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputRadioGroupForm } from "components/InputRadioGroup";
import { useValidateLogin } from './hook'
import { ValidateLoginStore } from "./validate-login-store";
import { observer } from "mobx-react";

type Props = {
    store: ValidateLoginStore
}

export const ValidateLogin: FC<Props> = observer((props) => {

    const {
        data,
        goToRoot
    } = props.store
    const {

        handleSubmit,
        control,
        isValid,
        showPass,
        setShowPass,
        submit
    } = useValidateLogin(props.store)

    return (
        <>

            <Styled.Form onSubmit={handleSubmit(submit)}>
                <Styled.FabStyled onClick={goToRoot}>
                    <Styled.ArrowBackIconStyled />
                </Styled.FabStyled>
                <Styled.Title variant="body2">
                    Inventario
                </Styled.Title>
                <InputTextForm
                    control={control}
                    name={'username'}
                    inputProps={{
                        fullWidth: true,
                        disabled: true,
                        label: "Username"
                    }}
                    rules={{
                        required: 'campo requerido'
                    }}
                />
                <InputRadioGroupForm
                    control={control}
                    name={'empresa'}
                    rules={{
                        required: 'campo requerido'
                    }}
                    inputProps={{
                        children: data.empresas.map((item, index) => {
                            return (
                                <Styled.Option key={index}>
                                    <Styled.FormControlLabelStyled value={item.id} control={<Styled.RadioStyled />} label={item.nombre} />
                                    <Styled.DomainIconStyled />
                                </Styled.Option>
                            )
                        })
                    }}
                />
                <InputTextForm
                    control={control}
                    name={'password'}
                    rules={{
                        required: 'campo requerido'
                    }}
                    inputProps={{
                        fullWidth: true,
                        label: "Password",
                        type: showPass ? 'text' : 'password',
                        InputProps: {
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPass(!showPass)}
                                    >
                                        {showPass ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                        }
                    }}
                />
                <Styled.ButtonStyled
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={!isValid}
                >
                    LOG IN
                </Styled.ButtonStyled>
            </Styled.Form>
        </>

    )
})