import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";
export interface IEmpresa {
    direccion: string
    id: number
    nit: string
    nombre: string
    telefono: string
}

@autobind
export class EmpresaServices {

    public get_empresa() {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: '/empresa',
            })
        );
    }

    public put_empresa(data: IEmpresa) {
        return trackPromise(
            AxiosApi({
                method: 'put',
                url: '/empresa',
                data
            })
        );
    }

    public empresas_by_username(username: string) {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: `/empresas_by_username`,
                params: {
                    username: username
                }
            })
        );
    }
}