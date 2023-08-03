import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Entradas } from "screens/inventario/entradas"
import { EntradasStore } from "screens/inventario/entradas/entrada-store"
import { EntradaServices } from "services/documento/entrada"

const EntradasPage:FC = () => {
    const navigate = useNavigate()
    const entradas = useMemo(() => new EntradaServices(), [])
    const store = useMemo(() => new EntradasStore(
        entradas,
        navigate
    ), [entradas, navigate]);
    useEffect(() => {
        return () => {
          (store.dispose)();
        };
      });
    return (
        <Entradas store={store} />
    )
}

export default EntradasPage