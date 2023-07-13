import autobind from "autobind-decorator";
import { AxiosInterceptor } from "config/axios";
import { NavigateFunction } from "react-router-dom";

@autobind
export class UsuarioServices {

    private readonly api: AxiosInterceptor

    constructor(
        private readonly _navigate:  NavigateFunction
    ){
        this.api = new AxiosInterceptor(
            this._navigate
        )
    }

    public async get_usuarios() {
        return await this.api.AxiosInstance({
            method: 'get',
            url: `/usuarios`,
        });
    }
}