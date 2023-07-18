import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { CreateBodega, CreateBodegaStore } from "screens/configuration/bodegas/create-bodega"
import { BodegasServices } from "services/bodegas"

const CreateBodegaPage: FC = () => {
  const navigate = useNavigate()
  const bodega = useMemo(() => new BodegasServices(), [])
  const store = useMemo(() => new CreateBodegaStore(
    bodega,
    navigate,
  ), [navigate, bodega])

  useEffect(() => {
    return () => {
      (store.dispose)();
    };
  });

  return (
    <CreateBodega store={store} />
  )
}

export default CreateBodegaPage