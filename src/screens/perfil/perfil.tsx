import { LayoutPage } from "components/LayoutPage"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

const Perfil: FC = () => {
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    return(
        <LayoutPage
            page="Perfil"
            goBack={goBack}
            pages={[{
                label: 'Cuenta',
                goTo: 'perfil'
            }]}
        />
    )
}

export default Perfil