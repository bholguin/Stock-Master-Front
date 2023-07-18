import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";

export interface IBodega {
    nombre: string
    id: number
    descripcion: string
    direccion: string
}
@autobind
export class BodegasServices {
    public get_bodegas() {
        return AxiosApi({
            method: 'get',
            url: '/bodegas'
        })
    }

    public post_bodega(data: IBodega) {
        return AxiosApi({
            method: 'post',
            url: '/bodega',
            data
        })
    }

    public delete_bodega(id: number) {
        return AxiosApi({
            method: 'delete',
            url: '/bodega',
            params: {
                bodega_id: id
            }
        })
    }

    public put_bodega(data: IBodega) {
        return AxiosApi({
            method: 'put',
            url: '/bodega',
            data
        })
    }

    public get_bodega(id: string) {
        return AxiosApi({
            method: 'get',
            url: '/bodega',
            params: {
                bodega_id: id
            }
        })
    }
}