import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";

export interface IProducto {
    descripcion: string
    id: number
    nombre: string
    referencia: string
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