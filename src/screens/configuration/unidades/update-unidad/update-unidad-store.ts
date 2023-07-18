import autobind from "autobind-decorator";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { IUnidadMedida, UnidadesMedidasServices } from "services/unidades_medidas";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { ValueBoxStore } from "stores/ValueBox";
import { VisibilityStore } from "stores/Visibility";

@autobind
export class UpdateUnidadStore {
    public readonly show = new VisibilityStore(true)

    private readonly _unidad = new ValueBoxStore<IUnidadMedida>(null)

    private readonly _disposer = new DisposableStore();

    public readonly getVehiculo = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._unidadServices.get_unidad(this._unidadId)
            this._unidad.set(response.data)
        }
    )

    public readonly putVehiculo = new AsyncOperationStore(
        this._navigate,
        async (data: IUnidadMedida) => {
            await this._unidadServices.put_unidad(data)
        }
    )

    constructor(
        private readonly _unidadServices: UnidadesMedidasServices,
        private readonly _navigate: NavigateFunction,
        private readonly _unidadId: string
    ) {
        this._disposer.push(
            reaction(
                () => this.putVehiculo.status.isDone,
                (status) => {
                    if (status) {
                        toast('La unidad se actualizo con exito.', {
                            type: 'success'
                        })
                        this.goBack()
                    }
                }
            )
        )
    }

    public goBack() {
        this._navigate('/app/configuration/unidades')
    }

    public get unidad(): IUnidadMedida {
        return this._unidad.value
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
    }
}