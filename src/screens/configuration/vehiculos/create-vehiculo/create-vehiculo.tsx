import { FC, useCallback } from "react"
import { CreateVehiculoStore } from "./create-vehiculo-store"
import { Styled } from "../styles"
import { ButtonApp } from "components/Button/Button"
import { useForm } from "react-hook-form"
import { InputTextForm } from "components/InputText"
import { IVehiculo } from "services/vehiculos"
import { observer } from "mobx-react"

type Props = {
    store: CreateVehiculoStore
}

export const CreateVehiculo: FC<Props> = observer((props) => {

    const { store } = props

    const { control, handleSubmit, formState: { isValid } } = useForm<IVehiculo>({
        mode: 'onChange'
    })

    const submit = useCallback((data: IVehiculo) => {
        console.log(data);    
    }, [])

    return (
        <Styled.DialogStyled
            open={store.show.isVisible}

        >
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <Styled.DialogTitleStyled>
                    Crear Vehiculo
                    <Styled.CloseIconStyled onClick={store.goBack} />
                </Styled.DialogTitleStyled>
                <Styled.DialogContentStyled>
                    <InputTextForm
                        control={control}
                        name="placa"
                        inputProps={{
                            label: 'Placa',
                            fullWidth: true
                        }}
                        rules={{
                            required: 'Campo requerido'
                        }}
                    />

                    <InputTextForm
                        control={control}
                        name="descripcion"
                        inputProps={{
                            label: 'Descripcion',
                            fullWidth: true,
                            multiline: true,
                            rows: 4
                        }}
                    />
                </Styled.DialogContentStyled>
                <Styled.DialogActionsStyled>
                    <ButtonApp
                        variant="contained"
                        disabled={!isValid}
                        type="submit"
                    >
                        Guardar
                    </ButtonApp>
                    <ButtonApp
                        onClick={store.goBack}
                    >
                        Cancelar
                    </ButtonApp>
                </Styled.DialogActionsStyled>
            </Styled.Form>
        </Styled.DialogStyled>
    )
})