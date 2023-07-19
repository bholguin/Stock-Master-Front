import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";

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