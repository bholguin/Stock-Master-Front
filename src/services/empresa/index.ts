import autobind from "autobind-decorator";
import { AxiosInterceptor } from "config/axios";

export interface IEmpresa {
    direccion: string
    id: number
    nit: string
    nombre: string
    telefono: string
}

@autobind
export class EmpresaServices {

    constructor(
        private readonly api: AxiosInterceptor
    ) {}

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