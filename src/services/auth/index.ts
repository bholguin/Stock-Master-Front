import autobind from "autobind-decorator";
import axios from "axios";

export type Credentials = {
    username: string;
    password: string;
    empresa_id: number
}

@autobind
export class AuthServices {
    public async login(data: Credentials) {
        return await axios({
            method: 'post',
            url: '/login',
            data
        });
    }
}