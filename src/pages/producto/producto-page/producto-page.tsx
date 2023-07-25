import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { DetalleProducto, DetalleProductoStore } from "screens/producto/detalle"
import { ProductosService } from "services/productos"

const ProductoPage:FC = () => {
    const productos = useMemo(() => new ProductosService(), [])
    const navigation = useNavigate()
    const store = useMemo(() => new DetalleProductoStore(
        productos,
        navigation
    ), [productos, navigation])
    useEffect(() => {
        return () => {
          (store.dispose)();
        };
      });
    return(
        <DetalleProducto store={store} />
    )
}

export default ProductoPage