import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";
import { IBodega } from "services/bodegas";
import { IProducto } from "services/productos";
import { ITipoDocumento } from "services/tipos-documento";

type salidaReq = {
    consecutivo: number;
    tipodoc_id: string;
    bodega_id: string;
    concepto: string;
    productos: Array<{
        cantidad: number;
        producto_id: string
    }>
}

export interface IEntrada {
    concepto?: string
    consecutivo: number
    creado: string
    id?: number
    bodega: IBodega
    tipodoc: ITipoDocumento
}

export interface IItem {
    producto: IProducto
    cantidad: number
}

@autobind
export class SalidasServices {
    public get_salidas() {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: `/salidas`,
            })
        );
    }


    public post_salida(data: salidaReq) {
        return trackPromise(
            AxiosApi({
                method: 'post',
                url: `/salida`,
                data
            })
        );
    }

    public get_salida(id: string) {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: '/salida',
                params: {
                    salida_id: id
                }
            })
        )
    }

    public get_salida_items(id: string) {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: '/salida-items',
                params: {
                    salida_id: id
                }
            })
        )
    }
}