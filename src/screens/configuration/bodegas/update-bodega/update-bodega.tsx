import { observer } from "mobx-react";
import { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Styled } from "../styles";
import { InputTextForm } from "components/InputText";
import { ButtonApp } from "components/Button/Button";
import { UpdateBodegaStore } from "./update-bodega-store";
import { IBodega } from "services/bodegas";

type Props = {
    store: UpdateBodegaStore
}

export const UpdateBodega: FC<Props> = observer((props) => {

    const { store } = props

    const { control, handleSubmit, reset, formState: { isValid } } = useForm<IBodega>({
        mode: 'onChange',
        defaultValues: {
            descripcion: '',
            nombre: '',
            direccion: ''
        }
    })

    const submit = useCallback((data: IBodega) => {
        store.putBodega.run(data)
    }, [store.putBodega])

    useEffect(() => {
        store.getBodega.run()
    }, [store.getBodega])

    useEffect(() => {
        reset(store.bodega)
    }, [store.bodega, reset])

    return (
        <Styled.DialogStyled
            open={store.show.isVisible}

        >
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <Styled.DialogTitleStyled>
                    Editar Bodega
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