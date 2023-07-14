import autobind from "autobind-decorator";
import { AxiosInterceptor } from "config/axios";

export type Credentials = {
    username: string;
    password: string;
    empresa_id: number
}

@autobind
export class AuthServices {

    constructor(
        private readonly api: AxiosInterceptor
    ) { }

    public async login(data: Credentials) {
        return await this.api.AxiosInstance({
            method: 'post',
            url: '/login',
            data
        });
    }
}