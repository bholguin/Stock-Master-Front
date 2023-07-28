import { FC, useCallback } from "react"
import { CreateEntradaBodegaStore } from "./create-entrada-store"
import { Styled } from "../styles"
import { ButtonApp } from "components/Button/Button"
import { useForm } from "react-hook-form"
import { InputTextForm } from "components/InputText"
import { observer } from "mobx-react"
import { IBodega } from "services/bodegas"

type Props = {
    store: CreateEntradaBodegaStore
}

export const CreateEntradaBodega: FC<Props> = observer((props) => {

    const { store } = props

    const { control, handleSubmit, formState: { isValid } } = useForm<IBodega>({
        mode: 'onChange',
        defaultValues: {
            descripcion: '',
            nombre: '',
            direccion: ''
        }
    })

    const submit = useCallback((data: IBodega) => {
        store.postBodega.run(data)
    }, [store.postBodega])

    return (
        <Styled.DialogStyled
            open={store.show.isVisible}

        >
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <Styled.DialogTitleStyled>
                    Crear Entrada
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
                        name="direccion"
                        inputProps={{
                            label: 'Direccion',
                            fullWidth: true
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