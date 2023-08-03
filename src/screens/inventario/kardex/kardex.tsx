import { HeaderModule } from "components/HeaderModule"
import { FC, useCallback, useEffect } from "react"
import { KardexStore } from "./kardex-store"
import { SelectComponentForm } from "components/SelectComponent"
import { useForm } from "react-hook-form"
import { observer } from "mobx-react"
import { Styled } from "./styles"
import { ButtonApp } from "components/Button/Button"
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces"

export type Form = {
    producto: SelectItem
    bodega: SelectItem
}

type Props = {
    store: KardexStore
}

export const Kardex: FC<Props> = observer((props) => {

    const { store } = props;

    const { control, handleSubmit, formState: { isValid } } = useForm<Form>({
        mode: 'onChange'
    })

    const submit = useCallback((data: Form) => {
        store.getKardex.run(data)
    }, [store.getKardex])

    useEffect(() => {
        store.init.run()
    }, [store.init])
    return (
        <Styled.Content>
            <HeaderModule title="Kardex" />
            <Styled.Form onSubmit={handleSubmit(submit)}>
                <SelectComponentForm
                    control={control}
                    name="producto"
                    options={store.productos}
                    label="Productos"
                    rules={{
                        required: 'Campo requerido'
                    }}
                />
                <SelectComponentForm
                    control={control}
                    name="bodega"
                    options={store.bodegas}
                    label="Bodegas"
                    rules={{
                        required: 'Campo requerido'
                    }}
                />
                <ButtonApp
                    variant="contained"
                    disabled={!isValid}
                    type="submit"
                >
                    Consultar
                </ButtonApp>
            </Styled.Form>

        </Styled.Content>
    )
})