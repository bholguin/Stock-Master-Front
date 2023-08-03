import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";
import { IDocumento } from "services/documento/interface";

export interface IMovimiento {
    cantidad: number;
    tipo: string;
    documento: IDocumento
}

export class MovimientoService {
    public get_kardex(producto_id: string) {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: `/kardex`,
                params:{
                    producto_id: producto_id
                }
            })
        );
    }
}