import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Bodegas, BodegasStore } from "screens/configuration/bodegas"
import { BodegasServices } from "services/bodegas"

const BodegasPage: FC = () => {
  const navigate = useNavigate()
  const bodegas = useMemo(() => new BodegasServices(), [])
  const store = useMemo(() => new BodegasStore(
    bodegas,
    navigate,
  ), [navigate, bodegas])

  useEffect(() => {
    return () => {
      (store.dispose)();
    };
  });

  return (
    <Bodegas store={store} />
  )
}

export default BodegasPage