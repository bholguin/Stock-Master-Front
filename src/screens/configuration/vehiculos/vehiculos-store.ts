import autobind from "autobind-decorator";
import { EnhancedTableStore } from "components/TableFront";
import { HeadCell } from "components/TableFront/Head";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { IVehiculo, VehiculosServices } from "services/vehiculos";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";

@autobind
export class VeiculosStore {

  public readonly tableStore: EnhancedTableStore<IVehiculo & { action?: unknown }>;

  private readonly _vehiculos = new ArrayStore<IVehiculo>([])

  private readonly _disposer = new DisposableStore();

  private readonly _columns = new ArrayStore<HeadCell<IVehiculo & { action?: unknown }>>([
    {
      id: 'placa',
      label: 'Placa',
    },
    {
      id: 'descripcion',
      label: 'Descripcion',
    },
    {
      id: 'action',
      label: '',
    },
  ]);

  public readonly getVehiculos = new AsyncOperationStore(
    this._navigate,
    async () => {
      const response = await this._vehiculosServices.get_vehiculos()
      this._vehiculos.setItems(response.data)
    }
  )

  public readonly deleteVehiculos = new AsyncOperationStore(
    this._navigate,
    async (id: number) => {
      await this._vehiculosServices.delete_vehiculo(id)
    }
  )

  constructor(
    private readonly _vehiculosServices: VehiculosServices,
    private readonly _navigate: NavigateFunction
  ) {
    this.tableStore = new EnhancedTableStore(
      this._columns.items,
    );

    this._disposer.push(
      reaction(
        () => this._vehiculos.items,
        (vehiculos) => {
          if (Array.isArray(vehiculos)) {
            this.tableStore.setList(vehiculos);
          }
        },
      ),
      reaction(
        () => this.deleteVehiculos.status.isDone,
        (status) => {
          console.log(status, 'stadffff');
          if (status) {
            toast('El vehiculo se elimino con exito.', {
              type: 'success'
            })
            this.getVehiculos.run()
          }
        }
      )
    )
  }

  public goToCreate() {
    this._navigate('create')
  }

  public goToUpdate(id: number) {
    this._navigate(`${id}`)
  }

  public get vehiculos(): Array<IVehiculo> {
    return this._vehiculos.items
  }

  public async dispose(): Promise<void> {
    await this._disposer.dispose();
    await this.tableStore.dispose();
  }
}