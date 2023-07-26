import { FC, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UpdateProducto, UpdateProductoStore } from "screens/producto/detalle/update-producto"
import { ProductosService } from "services/productos"
import { UnidadesMedidasServices } from "services/unidades_medidas"

const UpdateProductoPage: FC = () => {
  const params = useParams<{ producto_id: string }>()
  const navigate = useNavigate()
  const productos = useMemo(() => new ProductosService(), [])
  const unidades = useMemo(() => new UnidadesMedidasServices(), [])
  const store = useMemo(() => new UpdateProductoStore(
    productos,
    unidades,
    navigate,
    params.producto_id
  ), [navigate, unidades, params, productos]);

  useEffect(() => {
    return () => {
      (store.dispose)();
    };
  });

  return (
    <UpdateProducto store={store} />
  )
}

export default UpdateProductoPage