import autobind from "autobind-decorator";
import axios from "axios";

@autobind
export class UsuarioServices {
    public async get_usuarios() {
        return await axios({
            method: 'get',
            url: `/usuarios`,
        });
    }

    public async get_current_user(){
        return await axios({
            method: 'get',
            url: '/usuario'
        })
    }
}