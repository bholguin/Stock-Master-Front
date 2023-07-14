import autobind from "autobind-decorator";
import { AxiosInterceptor } from "config/axios";

@autobind
export class UsuarioServices {

    constructor(
        private readonly api: AxiosInterceptor
    ){}

    public async get_usuarios() {
        return await this.api.AxiosInstance({
            method: 'get',
            url: `/usuarios`,
        });
    }
}