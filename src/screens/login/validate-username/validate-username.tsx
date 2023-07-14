import { FC } from "react"
import { InputTextForm } from "../../../components/InputText"
import { Styled } from "../styles"
import { ValidateUsernameStore } from "./validate-username-store";
import { useValidateUsername } from "./hook";
import { observer } from "mobx-react";

type Props = {
    store: ValidateUsernameStore
}

export const ValidateUsername: FC<Props> = observer((props) => {

    const {
        getEmpresasByUsername,
        handleSubmit,
        control,
        isValid
    } = useValidateUsername(props.store)

    return (
        <Styled.Form onSubmit={handleSubmit(getEmpresasByUsername)}>
            <InputTextForm
                control={control}
                name={'username'}
                inputProps={{
                    fullWidth: true,
                    label: "Username"
                }}
                rules={{
                    required: 'campo requerido'
                }}
            />
            <Styled.ButtonStyled
                variant="contained"
                fullWidth
                type="submit"
                disabled={!isValid}
                endIcon={<Styled.ArrowForwardIconStyled />}
            >
                Continuar
            </Styled.ButtonStyled>
        </Styled.Form>
    )
})