import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";
import { IProducto } from "services/productos";

type entradaReq = {
    consecutivo: number;
    tipodoc_id: string;
    bodega_id: string;
    concepto: string;
    productos: Array<{
        cantidad: number;
        producto_id: string
    }>
}

export interface IItem {
    producto: IProducto
    cantidad: number
}

@autobind
export class EntradaServices {
    public get_entradas() {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: `/entradas`,
            })
        );
    }


    public post_entrada(data: entradaReq) {
        return trackPromise(
            AxiosApi({
                method: 'post',
                url: `/entrada`,
                data
            })
        );
    }

    public get_entrada(id: string) {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: '/entrada',
                params: {
                    entrada_id: id
                }
            })
        )
    }

    public get_entrada_items(id: string) {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: '/entrada-items',
                params: {
                    entrada_id: id
                }
            })
        )
    }
}