import autobind from 'autobind-decorator';
import { reaction } from 'mobx';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IVehiculo, VehiculosServices } from 'services/vehiculos';
import { AsyncOperationStore } from 'stores/AsyncOperation';
import { DisposableStore } from 'stores/Dispose';
import { VisibilityStore } from 'stores/Visibility';

@autobind
export class CreateVehiculoStore {
  public readonly show = new VisibilityStore(true);

  private readonly _disposer = new DisposableStore();

  public readonly postVehiculos = new AsyncOperationStore(
    this._navigate,
    async (data: IVehiculo) => {
      await this._vehiculosServices.post_vehiculo(data);
    }
  );

  constructor(
    private readonly _vehiculosServices: VehiculosServices,
    private readonly _navigate: NavigateFunction
  ) {
    this._disposer.push(
      reaction(
        () => this.postVehiculos.status.isDone,
        (status) => {
          if (status) {
            toast('El vehiculo se creo con exito.', {
              type: 'success',
            });
            this.goBack();
          }
        }
      )
    );
  }

  public goBack() {
    this._navigate('/app/configuracion/vehiculos');
  }

  public async dispose(): Promise<void> {
    await this._disposer.dispose();
  }
}
