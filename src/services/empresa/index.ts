import autobind from "autobind-decorator";
import axios from "axios";

export interface IEmpresa {
    direccion: string
    id: number
    nit: string
    nombre: string
    telefono: string
}

@autobind
export class EmpresaServices {

    public async empresas_by_username(username: string) {
        return await axios({
            method: 'get',
            url: `/empresas_by_username`,
            params: {
                username: username
            }
        });
    }
}