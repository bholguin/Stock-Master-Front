import autobind from "autobind-decorator";
import { AxiosInterceptor } from "config/axios";
import { NavigateFunction } from "react-router-dom";

export interface IEmpresa {
    direccion: string
    id: number
    nit: string
    nombre: string
    telefono: string
}

@autobind
export class EmpresaServices {

    private readonly api: AxiosInterceptor

    constructor(
        private readonly _navigate:  NavigateFunction
    ){
        this.api = new AxiosInterceptor(
            this._navigate
        )
    }

    public async empresas_by_username(username: string) {
        return await this.api.AxiosInstance({
            method: 'get',
            url: `/empresas_by_username`,
            params: {
                username: username
            }
        });
    }
}