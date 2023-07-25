import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";
import { IUnidadMedida } from "services/unidades_medidas";

export interface IProducto {
    descripcion: string
    id: string
    nombre: string
    referencia: string;
    unidad: IUnidadMedida
}


export interface IProductoReq {
    descripcion: string
    id?: string
    nombre: string
    referencia: string;
    unidad_id: string
}
@autobind
export class ProductosService {
    public get_productos() {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: '/productos'
            })
        )
    }

    public post_producto(data: IProductoReq) {
        return trackPromise(
            AxiosApi({
                method: 'post',
                url: '/producto',
                data
            })
        )
    }

    public delete_producto(id: string) {
        return trackPromise(
            AxiosApi({
                method: 'delete',
                url: '/producto',
                params: {
                    producto_id: id
                }
            })
        )
    }

    public put_producto(data: IProductoReq) {
        return trackPromise(
            AxiosApi({
                method: 'put',
                url: '/producto',
                data
            })
        )
    }

    public get_producto(id: string) {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: '/producto',
                params: {
                    producto_id: id
                }
            })
        )
    }
}