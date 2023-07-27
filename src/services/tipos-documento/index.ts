import autobind from "autobind-decorator";
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";

export interface ITipoDocumento {
    nombre: string;
    id?: number;
    descripcion: string;
    prefijo: string;
    consecutivo: number;
    submodulo: SelectItem
    empresa_id?: number;
    submodulo_id?: string
}


@autobind
export class TipoDocumentoServices {
    public get_tipos_documento() {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: `/tipos-documento`,
            })
        );
    }

    public post_tipo_documento(data: ITipoDocumento) {
        return trackPromise(
            AxiosApi({
                method: 'post',
                url: `/tipo-documento`,
                data
            })
        );
    }
}