import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";
import { trackPromise } from "react-promise-tracker";
export interface IUnidadMedida {
    nombre: string;
    id?: string;
    descripcion: string;
    prefijo: string;
    empresa_id: number
}

@autobind
export class UnidadesMedidasServices {
    public get_unidades() {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: `/unidades_medidas`,
            })
        );
    }

    public post_unidad(data: IUnidadMedida) {
        return trackPromise(
            AxiosApi({
                method: 'post',
                url: '/unidad_medida',
                data
            })
        )
    }

    public delete_unidad(id: string) {
        return trackPromise(
            AxiosApi({
                method: 'delete',
                url: '/unidad_medida',
                params: {
                    unidad_id: id
                }
            })
        )
    }

    public put_unidad(data: IUnidadMedida) {
        return trackPromise(
            AxiosApi({
                method: 'put',
                url: '/unidad_medida',
                data
            })
        )
    }

    public get_unidad(id: string) {
        return trackPromise(
            AxiosApi({
                method: 'get',
                url: '/unidad_medida',
                params: {
                    unidad_id: id
                }
            })
        )
    }
}