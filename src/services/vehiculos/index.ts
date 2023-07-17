import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";

export interface IVehiculo {
    placa: string
    id: number
    descripcion: string
}
@autobind
export class VehiculosServices {
    public get_vehiculos() {
        return AxiosApi({
            method: 'get',
            url: '/vehiculos'
        })
    }
}