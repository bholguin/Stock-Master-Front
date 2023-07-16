import { FC } from "react"
import { EmpresasStore } from "./empresas-store"
import { Styled } from './styles'
import { Typography } from "@mui/material"
import { InputTextForm } from "components/InputText"
import { observer } from "mobx-react"
import { useEmpresas } from "./hook"

type Props = {
    store: EmpresasStore
}

export const Empresas: FC<Props> = observer((props) => {

    const {
        control,
        handleSubmit,
        isValid,
        submit
    } = useEmpresas(props.store)

    return (
        <Styled.Content>
            <Typography variant="h2">
                Empresa
            </Typography>
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <InputTextForm
                    control={control}
                    name="nombre"
                    inputProps={{
                        label: "Nombre",
                        variant: 'standard'
                    }}
                    rules={{
                        required: 'campo requerido'
                    }}
                />
                <InputTextForm
                    control={control}
                    name="nit"
                    inputProps={{
                        label: "Nit"
                    }}
                    rules={{
                        required: 'campo requerido'
                    }}
                />
                <InputTextForm
                    control={control}
                    name="direccion"
                    inputProps={{
                        label: "Direccion"
                    }}
                />
                <InputTextForm
                    control={control}
                    name="telefono"
                    inputProps={{
                        label: "N° Telefonico"
                    }}
                />
                <Styled.ButtonContent>
                    <Styled.Button
                        type='submit'
                        variant="contained"
                        disabled={!isValid}
                    >
                        Guardar
                    </Styled.Button>
                </Styled.ButtonContent>
            </Styled.Form>
        </Styled.Content>
    )
})