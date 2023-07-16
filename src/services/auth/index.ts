import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";

export type Credentials = {
    username: string;
    password: string;
    empresa_id: number
}

@autobind
export class AuthServices {
    public login(data: Credentials) {
        return AxiosApi({
            method: 'post',
            url: '/login',
            data
        });
    }
}