import autobind from "autobind-decorator";
import { EnhancedTableStore } from "components/TableFront";
import { HeadCell } from "components/TableFront/Head";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { IVehiculo, VehiculosServices } from "services/vehiculos";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { HandlerError } from "utilities/handler-error/handler-error";

@autobind
export class VeiculosStore {

    private readonly _handlerError: HandlerError

    public readonly tableStore: EnhancedTableStore<IVehiculo & {action?: unknown}>;

    private readonly _vehiculos = new ArrayStore<IVehiculo>([])

    private readonly _disposer = new DisposableStore();

    private readonly _columns = new ArrayStore<HeadCell<IVehiculo & {action?: unknown}>>([
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
        async () => {
            try {
                const response = await this._vehiculosServices.get_vehiculos()
                console.log(response);
                this._vehiculos.setItems(response.data)
            } catch (e: any) {
                this._handlerError.takeError(e)
            }
        }
    )

    constructor(
        private readonly _vehiculosServices: VehiculosServices,
        private readonly _navigate: NavigateFunction
    ){
        this._handlerError = new HandlerError(this._navigate)
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
              )
          )
    }

    public get vehiculos(): Array<IVehiculo> {
        return this._vehiculos.items
    }
}