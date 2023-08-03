import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";
import { IDocumento } from "services/documento/interface";

export interface IMovimiento {
    cantidad: number;
    tipo: string;
    creado: string;
    documento: IDocumento
    id?: number;
}

type kardexReq = {
    producto_id: string
    bodega_id: string
}

export class MovimientoService {
    public get_kardex(data: kardexReq) {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: `/kardex`,
                params: data
            })
        );
    }
}