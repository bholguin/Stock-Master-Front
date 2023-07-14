import autobind from "autobind-decorator";
import { AxiosInterceptor } from "config/axios";

@autobind
export class ValidatorServices {

    constructor(
        private readonly api: AxiosInterceptor
    ){}

    public async test_token() {
        return await this.api.AxiosInstance({
            method: 'get',
            url: `/validator`,
        });
    }
}