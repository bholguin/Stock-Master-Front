import { FC } from "react"
import { LayoutPage } from "components/LayoutPage"
import { useNavigate } from "react-router-dom"

export const Inventario: FC = () => {
    const navigate = useNavigate()
    const goBack = () => navigate('/app')
    return (
        <LayoutPage
            page="Inventario"
            goBack={goBack}
            pages={[{
                label: 'Entradas',
                goTo: 'entradas'
            }]}
        />
    )
}