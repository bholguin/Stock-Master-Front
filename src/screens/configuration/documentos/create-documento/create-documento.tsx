import { FC, useCallback, useEffect } from "react"
import { CreateDocumentoStore } from "./create-documento-store"
import { Styled } from "../styles"
import { ButtonApp } from "components/Button/Button"
import { useForm } from "react-hook-form"
import { InputTextForm } from "components/InputText"
import { observer } from "mobx-react"
import { ITipoDocumento } from "services/tipos-documento"
import { SelectComponentForm } from "components/SelectComponent"

type Props = {
    store: CreateDocumentoStore
}

export const CreateDocumento: FC<Props> = observer((props) => {

    const { store } = props

    const { control, handleSubmit, formState: { isValid } } = useForm<ITipoDocumento>({
        mode: 'onChange',
        defaultValues: {
            descripcion: '',
            nombre: '',
            prefijo: '',
            consecutivo: 0,
            submodulo: null
        }
    })

    const submit = useCallback((data: ITipoDocumento) => {
        store.postDocumento.run(data)
    }, [store.postDocumento])

    useEffect(() => {
        store.getModulos.run()
    }, [store.getModulos])

    return (
        <Styled.DialogStyled
            open={store.show.isVisible}

        >
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <Styled.DialogTitleStyled>
                    Crear Tipo Documento
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
                    <SelectComponentForm
                        control={control}
                        name="submodulo"
                        label="Submodulo"
                        groupBy={(item) => item.group}
                        options={store.submodulos}
                        rules={{
                            required: 'Campo requerido'
                        }}
                    />
                    <InputTextForm
                        control={control}
                        name="consecutivo"
                        inputProps={{
                            label: 'Consecutivo',
                            fullWidth: true,
                            disabled: true,
                            type: 'number'
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