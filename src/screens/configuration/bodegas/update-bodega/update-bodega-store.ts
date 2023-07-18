import autobind from "autobind-decorator";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { BodegasServices, IBodega } from "services/bodegas";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { ValueBoxStore } from "stores/ValueBox";
import { VisibilityStore } from "stores/Visibility";

@autobind
export class UpdateBodegaStore {
    public readonly show = new VisibilityStore(true)

    private readonly _bodega = new ValueBoxStore<IBodega>(null)

    private readonly _disposer = new DisposableStore();

    public readonly getBodega = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._bodegaServices.get_bodega(this._bodegaId)
            this._bodega.set(response.data)
        }
    )

    public readonly putBodega = new AsyncOperationStore(
        this._navigate,
        async (data: IBodega) => {
            await this._bodegaServices.put_bodega(data)
        }
    )

    constructor(
        private readonly _bodegaServices: BodegasServices,
        private readonly _navigate: NavigateFunction,
        private readonly _bodegaId: string
    ) {
        this._disposer.push(
            reaction(
                () => this.putBodega.status.isDone,
                (status) => {
                    if (status) {
                        toast('La bodega se actualizo con exito.', {
                            type: 'success'
                        })
                        this.goBack()
                    }
                }
            )
        )
    }

    public goBack() {
        this._navigate('/app/configuration/bodegas')
    }

    public get bodega(): IBodega {
        return this._bodega.value
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
    }
}