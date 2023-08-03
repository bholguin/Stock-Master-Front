import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Salidas } from "screens/inventario/salidas"
import { SalidasStore } from "screens/inventario/salidas/salidas-store"
import { SalidasServices } from "services/documento/salida"

const SalidasPage:FC = () => {
    const navigate = useNavigate()
    const salidas = useMemo(() => new SalidasServices(), [])
    const store = useMemo(() => new SalidasStore(
      salidas,
        navigate
    ), [salidas, navigate]);
    useEffect(() => {
        return () => {
          (store.dispose)();
        };
      });
    return (
        <Salidas store={store} />
    )
}

export default SalidasPage