import { LayoutPage } from "components/LayoutPage"
import { useNavigate } from "react-router-dom"

export const Producto = () => {
    const navigate = useNavigate()
    const goBack = () => navigate('/app')
    return (
        <LayoutPage
            page="Productos"
            goBack={goBack}
            pages={[]}
        />
    )
}