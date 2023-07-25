import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { CreateProducto, CreateProductoStore } from "screens/producto/detalle/crear-producto"
import { ProductosService } from "services/productos"

const CreateProductoPage = () => {

    const productos = useMemo(() => new ProductosService(), [])
    const navigation = useNavigate()

    const store = useMemo(() => new CreateProductoStore(
        productos,
        navigation
    ), [productos, navigation])

    return(
        <CreateProducto store={store} />
    )
}

export default CreateProductoPage