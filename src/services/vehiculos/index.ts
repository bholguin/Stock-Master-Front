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

    public post_vehiculo(data: IVehiculo) {
        return AxiosApi({
            method: 'post',
            url: '/vehiculo',
            data
        })
    }

    public put_vehiculo(data: IVehiculo) {
        return AxiosApi({
            method: 'put',
            url: '/vehiculo',
            data
        })
    }

    public get_vehiculo(id: string) {
        return AxiosApi({
            method: 'get',
            url: '/vehiculo',
            params: {
                vehiculo_id: id
            }
        })
    }

    public delete_vehiculo(id: number) {
        return AxiosApi({
            method: 'delete',
            url: '/vehiculo',
            params: {
                vehiculo_id: id
            }
        })
    }
}