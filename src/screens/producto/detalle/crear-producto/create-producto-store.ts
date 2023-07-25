import autobind from "autobind-decorator";
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductosService } from "services/productos";
import { IUnidadMedida, UnidadesMedidasServices } from "services/unidades_medidas";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { VisibilityStore } from "stores/Visibility";
import { From } from "./create-producto";

@autobind
export class CreateProductoStore {
    public readonly show = new VisibilityStore(true)

    private readonly _disposer = new DisposableStore();

    private readonly _unidades = new ArrayStore<SelectItem>([]);

    public readonly getUnidades = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._unidadesServices.get_unidades()
            this._unidades.setItems(
                response.data.map((item: IUnidadMedida) => ({
                    label: item.nombre,
                    value: item.id
                }))
            )
        }
    )

    public readonly postProducto = new AsyncOperationStore(
        this._navigate,
        async (data: From) => {
            await this._productosServices.post_producto({
                nombre: data.nombre,
                descripcion: data.descripcion,
                referencia: data.referencia,
                unidad_id: data.unidad_from.value,
            })
        }
    )

    constructor(
        private readonly _productosServices: ProductosService,
        private readonly _unidadesServices: UnidadesMedidasServices,
        private readonly _navigate: NavigateFunction
    ) {
        this._disposer.push(
            reaction(
                () => this.postProducto.status.isDone,
                (status) => {
                    if (status) {
                        toast('El producto se creo con exito.', {
                            type: 'success'
                        })
                        this.goBack()
                    }
                }
            )
        )
    }

    public goBack() {
        this._navigate('/app/productos/details')
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
    }

    public get unidades():Array<SelectItem> {
        return this._unidades.items
    }
}