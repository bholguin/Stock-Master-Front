import { FC } from "react"
import { LayoutPage } from "components/LayoutPage"
import { useNavigate } from "react-router-dom"

export const Configuration: FC = () => {
    const navigate = useNavigate()
    const goBack = () => navigate('/app')
    return (
        <LayoutPage
            page="Configuracion"
            goBack={goBack}
            pages={[{
                label: 'Empresa',
                goTo: 'empresas'
            },{
                label: 'Usuarios',
                goTo: 'usuarios'
            },{
                label: 'Bodegas',
                goTo: 'bodegas'
            },{
                label: 'Vahiculos',
                goTo: 'vehiculos'
            },{
                label: 'Unidades',
                goTo: 'unidades'
            },{
                label: 'Documentos',
                goTo: 'documentos'
            }]}
        />
    )
}