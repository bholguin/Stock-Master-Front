import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";
import { IUnidadMedida } from "services/unidades_medidas";

export interface IProducto {
    descripcion: string
    id: number
    nombre: string
    referencia: string;
    unidad: IUnidadMedida
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
}