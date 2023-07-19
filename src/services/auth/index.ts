import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";

export type Credentials = {
    username: string;
    password: string;
    empresa_id: number
}

@autobind
export class AuthServices {
    public login(data: Credentials) {
        return trackPromise(
            AxiosApi({
                method: 'post',
                url: '/login',
                data
            })
        )
    }
}