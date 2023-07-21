import { HeaderModule } from "components/HeaderModule"
import { FC } from "react"
import { useCuenta } from "./hook"
import { Styled } from './styles'
import { InputTextForm } from "components/InputText"
import { CuentaStore } from "./cuenta-store"
import { observer } from "mobx-react"

type Props = {
    store: CuentaStore
}

export const Cuenta: FC<Props> = observer((props) => {
    const {
        control,
        handleSubmit,
        isValid
    } = useCuenta(props.store)
    return (
        <Styled.Content>
            <HeaderModule
                title="Cuenta"
            />
            <Styled.Form onSubmit={handleSubmit(() => { })}>
            <InputTextForm
                        control={control}
                        name="username"
                        inputProps={{
                            label: "Username",
                            fullWidth: true,
                            disabled: true
                        }}
                        rules={{
                            required: 'campo requerido'
                        }}
                    />
                <Styled.FullName>
                    <InputTextForm
                        control={control}
                        name="nombre"
                        inputProps={{
                            label: "Nombre",
                            variant: 'standard',
                            fullWidth: true
                        }}
                        rules={{
                            required: 'campo requerido'
                        }}
                    />
                    <InputTextForm
                        control={control}
                        name="apellido"
                        inputProps={{
                            label: "Apellido",
                            fullWidth: true
                        }}
                        rules={{
                            required: 'campo requerido'
                        }}
                    />
                </Styled.FullName>
                <InputTextForm
                    control={control}
                    name="identificacion"
                    inputProps={{
                        label: "Identificación"
                    }}
                />
                <InputTextForm
                    control={control}
                    name="telefono"
                    inputProps={{
                        label: "Telefono"
                    }}
                />
                <InputTextForm
                    control={control}
                    name="correo"
                    inputProps={{
                        label: "Correo"
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