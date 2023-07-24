import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";

export interface IUsuario {
    apellido: string;
    id: number;
    nombre: string;
    username: string;
    telefono: string;
    identificacion: string;
    correo: string;
}

export type ChangePassword = {
    password: string
    newPassword: string
    validatePassword: string
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
                url: '/usuario',
            })
        )
    }

    public put_usuario(data: IUsuario) {
        return trackPromise(
            AxiosApi({
                method: 'put',
                url: '/usuario',
                data
            })
        )
    }

    public change_password(data: ChangePassword) {
        return trackPromise(
            AxiosApi({
                method: 'put',
                url: '/usuario/change-password',
                data
            })
        )
    }

    public post_usuario(data: IUsuario){
        return trackPromise(
            AxiosApi({
                method: 'post',
                url: '/usuario',
                data
            })
        )
    }

    public get_usuario(id: string) {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: '/usuario',
                params: {
                    usuario_id: id
                }
            })
        )
    }
}