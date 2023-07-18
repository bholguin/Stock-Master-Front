import { observer } from "mobx-react";
import { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Styled } from "../styles";
import { InputTextForm } from "components/InputText";
import { ButtonApp } from "components/Button/Button";
import { UpdateUnidadStore } from "./update-unidad-store";
import { IUnidadMedida } from "services/unidades_medidas";

type Props = {
    store: UpdateUnidadStore
}

export const UpdateUnidad: FC<Props> = observer((props) => {

    const { store } = props

    const { control, handleSubmit, reset, formState: { isValid } } = useForm<IUnidadMedida>({
        mode: 'onChange',
        defaultValues: {
            descripcion: '',
            nombre: '',
            prefijo: ''
        }
    })

    const submit = useCallback((data: IUnidadMedida) => {
        store.putVehiculo.run(data)
    }, [store.putVehiculo])

    useEffect(() => {
        store.getVehiculo.run()
    }, [store.getVehiculo])

    useEffect(() => {
        reset(store.unidad)
    }, [store.unidad, reset])

    return (
        <Styled.DialogStyled
            open={store.show.isVisible}

        >
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <Styled.DialogTitleStyled>
                    Editar Vehiculo
                    <Styled.CloseIconStyled onClick={store.goBack} />
                </Styled.DialogTitleStyled>
                <Styled.DialogContentStyled>
                <InputTextForm
                        control={control}
                        name="nombre"
                        inputProps={{
                            label: 'Nombre',
                            fullWidth: true
                        }}
                        rules={{
                            required: 'Campo requerido'
                        }}
                    />
                    <InputTextForm
                        control={control}
                        name="prefijo"
                        inputProps={{
                            label: 'Prefijo',
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