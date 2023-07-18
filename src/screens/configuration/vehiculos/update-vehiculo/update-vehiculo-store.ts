import autobind from "autobind-decorator";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { IVehiculo, VehiculosServices } from "services/vehiculos";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { ValueBoxStore } from "stores/ValueBox";
import { VisibilityStore } from "stores/Visibility";
import { HandlerError } from "utilities/handler-error/handler-error";

@autobind
export class UpdateVehiculoStore {
    public readonly show = new VisibilityStore(true)

    private readonly _handlerError: HandlerError;

    private readonly _vehiculo = new ValueBoxStore<IVehiculo>(null)

    private readonly _disposer = new DisposableStore();

    public readonly getVehiculo = new AsyncOperationStore(
        async () => {
            try {
                const response = await this._vehiculosServices.get_vehiculo(this._vehiculoId)
                this._vehiculo.set(response.data)
            } catch (e: any) {
                this._handlerError.takeError(e)
            }
        }
    )

    public readonly putVehiculo = new AsyncOperationStore(
        async (data: IVehiculo) => {
            try {
                await this._vehiculosServices.put_vehiculo(data)
            } catch (e: any) {
                this._handlerError.takeError(e)
            }
        }
    )

    constructor(
        private readonly _vehiculosServices: VehiculosServices,
        private readonly _navigate: NavigateFunction,
        private readonly _vehiculoId: string
    ) {
        this._handlerError = new HandlerError(
            this._navigate
        )

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
        this._navigate('/app/configuration/vehiculos')
    }

    public get vehiculo(): IVehiculo {
        return this._vehiculo.value
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
      }
}