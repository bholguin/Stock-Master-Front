import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Kardex, KardexStore } from "screens/inventario/kardex"
import { BodegasServices } from "services/bodegas"
import { MovimientoService } from "services/movimientos"
import { ProductosService } from "services/productos"

const KardexPage = () => {
    const navigate = useNavigate()
    const productos = useMemo(() => new ProductosService(), [])
    const bodegas = useMemo(() => new BodegasServices(), [])
    const movimiento = useMemo(() => new MovimientoService(), [])

    const store = useMemo(() => new KardexStore(
        bodegas,
        productos,
        movimiento,
        navigate
    ), [bodegas, productos, navigate, movimiento])

    useEffect(() => {
        return () => {
          (store.dispose)();
        };
      });

    return(
        <Kardex store={store}/>
    )
}

export default KardexPage