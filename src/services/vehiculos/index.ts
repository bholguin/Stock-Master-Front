import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";

@autobind
export class VehiculosServices {
    public get_vehiculos() {
        return AxiosApi({
            method: 'get',
            url: '/vehiculos'
        })
    }
}