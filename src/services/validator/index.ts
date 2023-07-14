import autobind from "autobind-decorator";
import axios from "axios";

@autobind
export class ValidatorServices {
    public async test_token() {
        return await axios({
            method: 'get',
            url: `/validator`,
        });
    }
}