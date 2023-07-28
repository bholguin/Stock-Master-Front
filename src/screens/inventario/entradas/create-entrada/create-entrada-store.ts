import autobind from "autobind-decorator";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { BodegasServices, IBodega } from "services/bodegas";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { VisibilityStore } from "stores/Visibility";

@autobind
export class CreateEntradaBodegaStore {
    public readonly show = new VisibilityStore(true)

    private readonly _disposer = new DisposableStore();

    public readonly postBodega = new AsyncOperationStore(
        this._navigate,
        async (data: IBodega) => {
            await this._bodegaServices.post_bodega(data)
        }
    )

    constructor(
        private readonly _bodegaServices: BodegasServices,
        private readonly _navigate: NavigateFunction
    ){
        this._disposer.push(
            reaction(
                () => this.postBodega.status.isDone,
                (status) => {
                    if (status) {
                        toast('La bodega se creo con exito.', {
                            type: 'success'
                        })
                        this.goBack()
                    }
                }
            )
        )
    }

    public goBack(){
        this._navigate('/app/inventario/entradas')
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
      }
}