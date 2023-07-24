import { observer } from "mobx-react";
import { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Styled } from "../styles";
import { InputTextForm } from "components/InputText";
import { ButtonApp } from "components/Button/Button";
import { UpdateUsuarioStore } from "./update-usuario-store";
import { IUsuario } from "services/usuario";

type Props = {
    store: UpdateUsuarioStore
}

export const UpdateUsuario: FC<Props> = observer((props) => {

    const { store } = props

    const { control, handleSubmit, reset, formState: { isValid } } = useForm<IUsuario>({
        mode: 'onChange',
        defaultValues: {
            apellido: '',
            nombre: '',
            username: '',
            telefono: '',
            identificacion: '',
            correo: ''
        }
    })

    const submit = useCallback((data: IUsuario) => {
        store.putUsuario.run(data)
    }, [store.putUsuario])

    useEffect(() => {
        store.getUsuario.run()
    }, [store.getUsuario])

    useEffect(() => {
        reset(store.usuario)
    }, [store.usuario, reset])

    return (
        <Styled.DialogStyled
            open={store.show.isVisible}

        >
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <Styled.DialogTitleStyled>
                    Editar Usuario
                    <Styled.CloseIconStyled onClick={store.goBack} />
                </Styled.DialogTitleStyled>
                <Styled.DialogContentStyled>
                    <InputTextForm
                        control={control}
                        name="username"
                        inputProps={{
                            label: "Username",
                            fullWidth: true
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