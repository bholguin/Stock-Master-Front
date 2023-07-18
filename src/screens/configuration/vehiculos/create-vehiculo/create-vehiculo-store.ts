import autobind from "autobind-decorator";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { IVehiculo, VehiculosServices } from "services/vehiculos";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { VisibilityStore } from "stores/Visibility";
import { HandlerError } from "utilities/handler-error/handler-error";

@autobind
export class CreateVehiculoStore {
    public readonly show = new VisibilityStore(true)

    private readonly _handlerError: HandlerError

    private readonly _disposer = new DisposableStore();

    public readonly postVehiculos = new AsyncOperationStore(
        async (data: IVehiculo) => {
            try {
                await this._vehiculosServices.post_vehiculo(data)
            } catch (e: any) {
                this._handlerError.takeError(e)
            }
        }
    )

    constructor(
        private readonly _vehiculosServices: VehiculosServices,
        private readonly _navigate: NavigateFunction
    ){
        this._handlerError = new HandlerError(
            this._navigate
        )

        this._disposer.push(
            reaction(
                () => this.postVehiculos.status.isDone,
                (status) => {
                    if (status) {
                        toast('El vehiculo se creo con exito.', {
                            type: 'success'
                        })
                        this.goBack()
                    }
                }
            )
        )
    }

    public goBack(){
        this._navigate('/app/configuration/vehiculos')
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
      }
}