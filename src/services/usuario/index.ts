import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";

@autobind
export class UsuarioServices {
    public get_usuarios() {
        return AxiosApi({
            method: 'get',
            url: `/usuarios`,
        });
    }

    public get_current_user(){
        return AxiosApi({
            method: 'get',
            url: '/usuario'
        })
    }
}