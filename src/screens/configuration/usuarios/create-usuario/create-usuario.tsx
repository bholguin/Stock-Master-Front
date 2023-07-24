import { FC, useCallback } from "react"
import { CreateUsuarioStore } from "./create-usuario-store"
import { Styled } from "../styles"
import { ButtonApp } from "components/Button/Button"
import { useForm } from "react-hook-form"
import { InputTextForm } from "components/InputText"
import { observer } from "mobx-react"
import { IUsuario } from "services/usuario"

type Props = {
    store: CreateUsuarioStore
}

export const CreateUsuario: FC<Props> = observer((props) => {

    const { store } = props

    const { control, handleSubmit, formState: { isValid } } = useForm<IUsuario>({
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
        store.postUsuario.run(data)
    }, [store.postUsuario])

    return (
        <Styled.DialogStyled
            open={store.show.isVisible}

        >
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <Styled.DialogTitleStyled>
                    Crear Usuario
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