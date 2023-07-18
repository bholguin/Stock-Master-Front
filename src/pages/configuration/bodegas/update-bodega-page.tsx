import { FC, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UpdateBodega, UpdateBodegaStore } from "screens/configuration/bodegas/update-bodega"
import { BodegasServices } from "services/bodegas"

const UpdateBodegaPage: FC = () => {
    const params = useParams<{bodega_id: string}>()
    const navigate = useNavigate()
    const bodega = useMemo(() => new BodegasServices(), [])
    const store = useMemo(() => new UpdateBodegaStore(
        bodega,
        navigate,
        params.bodega_id
    ), [navigate, bodega, params]);

    useEffect(() => {
        return () => {
          (store.dispose)();
        };
      });

    return(
        <UpdateBodega store={store}/>
    )
}

export default UpdateBodegaPage