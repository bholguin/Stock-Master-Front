import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";

@autobind
export class ModulosServices {
    public get_tipos_documento() {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: `/modulos-con-documentos`,
            })
        );
    }

    public get_submodulos(){
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: `/submodulos-con-documentos`,
            })
        );
        
    }
}