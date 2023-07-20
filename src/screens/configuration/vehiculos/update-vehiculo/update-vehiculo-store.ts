import autobind from "autobind-decorator";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { IVehiculo, VehiculosServices } from "services/vehiculos";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { ValueBoxStore } from "stores/ValueBox";
import { VisibilityStore } from "stores/Visibility";

@autobind
export class UpdateVehiculoStore {
    public readonly show = new VisibilityStore(true)

    private readonly _vehiculo = new ValueBoxStore<IVehiculo>(null)

    private readonly _disposer = new DisposableStore();

    public readonly getVehiculo = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._vehiculosServices.get_vehiculo(this._vehiculoId)
            this._vehiculo.set(response.data)
        }
    )

    public readonly putVehiculo = new AsyncOperationStore(
        this._navigate,
        async (data: IVehiculo) => {
            await this._vehiculosServices.put_vehiculo(data)
        }
    )

    constructor(
        private readonly _vehiculosServices: VehiculosServices,
        private readonly _navigate: NavigateFunction,
        private readonly _vehiculoId: string
    ) {
        this._disposer.push(
            reaction(
                () => this.putVehiculo.status.isDone,
                (status) => {
                    if (status) {
                        toast('El vehiculo se actualizo con exito.', {
                            type: 'success'
                        })
                        this.goBack()
                    }
                }
            )
        )
    }

    public goBack() {
        this._navigate('/app/configuracion/vehiculos')
    }

    public get vehiculo(): IVehiculo {
        return this._vehiculo.value
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
    }
}