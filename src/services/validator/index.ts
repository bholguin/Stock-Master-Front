import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";

@autobind
export class ValidatorServices {
    public test_token() {
        return AxiosApi({
            method: 'get',
            url: `/validator`,
        });
    }
}