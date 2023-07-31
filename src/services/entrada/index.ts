import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";
import { IBodega } from "services/bodegas";
import { ITipoDocumento } from "services/tipos-documento";

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

export interface IEntrada {
    concepto?: string
    consecutivo: number
    creado: string
    id?: number
    bodega: IBodega
    tipodoc: ITipoDocumento
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
}