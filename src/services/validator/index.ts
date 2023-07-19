import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";

@autobind
export class ValidatorServices {
    public test_token() {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: `/validator`,
            })
        );
    }
}