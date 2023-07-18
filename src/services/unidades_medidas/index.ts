import autobind from "autobind-decorator";
import { AxiosApi } from "config/axios";

export interface IUnidadMedida {
    nombre: string;
    id: number;
    descripcion: string;
    prefijo: string;
    empresa_id: number
}

@autobind
export class UnidadesMedidasServices {
    public get_unidades() {
        return AxiosApi({
            method: 'get',
            url: `/unidades_medidas`,
        });
    }

    public post_unidad(data: IUnidadMedida) {
        return AxiosApi({
            method: 'post',
            url: '/unidad_medida',
            data
        })
    }

    public delete_unidad(id: number) {
        return AxiosApi({
            method: 'delete',
            url: '/unidad_medida',
            params: {
                unidad_id: id
            }
        })
    }

    public put_unidad(data: IUnidadMedida) {
        return AxiosApi({
            method: 'put',
            url: '/unidad_medida',
            data
        })
    }

    public get_unidad(id: string) {
        return AxiosApi({
            method: 'get',
            url: '/unidad_medida',
            params: {
                unidad_id: id
            }
        })
    }
}