import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { CreateProducto, CreateProductoStore } from "screens/producto/detalle/crear-producto"
import { ProductosService } from "services/productos"
import { UnidadesMedidasServices } from "services/unidades_medidas"

const CreateProductoPage = () => {

    const productos = useMemo(() => new ProductosService(), [])
    const unidades = useMemo(() => new UnidadesMedidasServices(), [])
    const navigation = useNavigate()

    const store = useMemo(() => new CreateProductoStore(
        productos,
        unidades,
        navigation
    ), [productos, navigation, unidades])

    return(
        <CreateProducto store={store} />
    )
}

export default CreateProductoPage