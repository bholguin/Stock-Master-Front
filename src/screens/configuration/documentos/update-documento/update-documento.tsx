import { observer } from "mobx-react";
import { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Styled } from "../styles";
import { InputTextForm } from "components/InputText";
import { ButtonApp } from "components/Button/Button";
import { UpdateDocumentoStore } from "./update-documento-store";
import { ITipoDocumento } from "services/tipos-documento";
import { SelectComponentForm } from "components/SelectComponent";

type Props = {
    store: UpdateDocumentoStore
}

export const UpdateDocumento: FC<Props> = observer((props) => {
    const { store } = props

    const { control, handleSubmit, reset, formState: { isValid } } = useForm<ITipoDocumento>({
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
        store.putDocumento.run(data)
    }, [store.putDocumento])

    useEffect(() => {
        store.getModulos.run()
    }, [store.getModulos])

    useEffect(() => {
        store.getDocumento.run()
    }, [store.getDocumento])

    useEffect(() => {
        if(store.documento){
            reset({
                ...store.documento,
                submodulo: store?.submodulos?.find((item) => item.value === store.documento.submodulo_id)
            })
        }
    }, [reset, store.documento, store.submodulos])

    return (
        <Styled.DialogStyled
            open={store.show.isVisible}

        >
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <Styled.DialogTitleStyled>
                    Editar Tipo Documento
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
                        disabled
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