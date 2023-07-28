import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";

@autobind
export class EntradaServices {
    public get_entradas() {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: `/entradas`,
            })
        );
    }
}