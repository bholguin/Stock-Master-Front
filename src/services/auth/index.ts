import autobind from "autobind-decorator";
import { AxiosInterceptor } from "config/axios";
import { NavigateFunction } from "react-router-dom";

export type Credentials = {
    username: string;
    password: string;
    empresa_id: number
}

@autobind
export class AuthServices {
    private readonly api: AxiosInterceptor

    constructor(
        private readonly _navigate:  NavigateFunction
    ){
        this.api = new AxiosInterceptor(
            this._navigate
        )
    }
    public async login(data: Credentials) {
        return await this.api.AxiosInstance({
            method: 'post',
            url: '/login',
            data
        });
    }
}