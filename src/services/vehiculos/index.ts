import autobind from 'autobind-decorator';
import { AxiosApi } from 'config/axios';
import { trackPromise } from 'react-promise-tracker';

export interface IVehiculo {
  placa: string;
  id: number;
  descripcion: string;
  marca: string;
  modelo: string;
  fecha_tecno: string;
  fecha_seguro: string;
}
@autobind
export class VehiculosServices {
  public get_vehiculos() {
    return trackPromise(
      AxiosApi({
        method: 'get',
        url: '/vehiculos',
      })
    );
  }

  public post_vehiculo(data: IVehiculo) {
    return trackPromise(
      AxiosApi({
        method: 'post',
        url: '/vehiculo',
        data,
      })
    );
  }

  public put_vehiculo(data: IVehiculo) {
    return trackPromise(
      AxiosApi({
        method: 'put',
        url: '/vehiculo',
        data,
      })
    );
  }

  public get_vehiculo(id: string) {
    return trackPromise(
      AxiosApi({
        method: 'get',
        url: '/vehiculo',
        params: {
          vehiculo_id: id,
        },
      })
    );
  }

  public delete_vehiculo(id: number) {
    return trackPromise(
      AxiosApi({
        method: 'delete',
        url: '/vehiculo',
        params: {
          vehiculo_id: id,
        },
      })
    );
  }
}
