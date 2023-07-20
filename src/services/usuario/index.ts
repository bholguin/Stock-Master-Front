import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";

export interface IUsuario {
    apellido: string
    id: number
    nombre: string
    username: string
}

@autobind
export class UsuarioServices {
    public get_usuarios() {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: `/usuarios`,
            })
        )
    }

    public get_current_user() {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: '/usuario'
            })
        )
    }
}