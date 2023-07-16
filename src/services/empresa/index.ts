import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";

export interface IEmpresa {
    direccion: string
    id: number
    nit: string
    nombre: string
    telefono: string
}

@autobind
export class EmpresaServices {

    public get_empresa(){
        return AxiosApi({
            method: 'get',
            url: '/empresa',
        });
    }

    public put_empresa(data: IEmpresa){
        return AxiosApi({
            method: 'put',
            url: '/empresa',
            data
        });
    }

    public empresas_by_username(username: string) {
        return AxiosApi({
            method: 'get',
            url: `/empresas_by_username`,
            params: {
                username: username
            }
        });
    }
}