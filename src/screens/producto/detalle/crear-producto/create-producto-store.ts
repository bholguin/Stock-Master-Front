import autobind from "autobind-decorator";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductosService } from "services/productos";
import { IUnidadMedida } from "services/unidades_medidas";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { VisibilityStore } from "stores/Visibility";

@autobind
export class CreateProductoStore {
    public readonly show = new VisibilityStore(true)

    private readonly _disposer = new DisposableStore();

    public readonly postUnidad = new AsyncOperationStore(
        this._navigate,
        async (data: IUnidadMedida) => {
           // await this._unidadesServices.post_unidad(data)
        }
    )

    constructor(
        private readonly _productosServices: ProductosService,
        private readonly _navigate: NavigateFunction
    ){
        this._disposer.push(
            reaction(
                () => this.postUnidad.status.isDone,
                (status) => {
                    if (status) {
                        toast('La unidad se creo con exito.', {
                            type: 'success'
                        })
                        this.goBack()
                    }
                }
            )
        )
    }

    public goBack(){
        this._navigate('/app/productos')
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
      }
}