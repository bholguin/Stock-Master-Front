import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";

export interface IBodega {
    nombre: string
    id: number
    descripcion: string
    direccion: string
}
@autobind
export class BodegasServices {
    public get_bodegas() {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: '/bodegas'
            })
        )
    }

    public post_bodega(data: IBodega) {
        return trackPromise(
            AxiosApi({
                method: 'post',
                url: '/bodega',
                data
            })
        )
    }

    public delete_bodega(id: number) {
        return trackPromise(
            AxiosApi({
                method: 'delete',
                url: '/bodega',
                params: {
                    bodega_id: id
                }
            })
        )
    }

    public put_bodega(data: IBodega) {
        return trackPromise(
            AxiosApi({
                method: 'put',
                url: '/bodega',
                data
            })
        )
    }

    public get_bodega(id: string) {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: '/bodega',
                params: {
                    bodega_id: id
                }
            })
        )
    }
}