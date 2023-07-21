import { LayoutPage } from "components/LayoutPage"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

const Perfil: FC = () => {
    const navigate = useNavigate()
    const goBack = () => navigate('/app')
    return (
        <LayoutPage
            page="Perfil"
            goBack={goBack}
            pages={[{
                label: 'Cuenta',
                goTo: 'cuenta'
            }, {

                label: 'Seguridad',
                goTo: 'seguridad'

            }]}
        />
    )
}

export default Perfil