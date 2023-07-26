import autobind from "autobind-decorator";
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { IProducto, ProductosService } from "services/productos";
import { IUnidadMedida, UnidadesMedidasServices } from "services/unidades_medidas";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { VisibilityStore } from "stores/Visibility";
import { From } from "./update-producto";
import { ValueBoxStore } from "stores/ValueBox";

@autobind
export class UpdateProductoStore {
    public readonly show = new VisibilityStore(true)

    private readonly _disposer = new DisposableStore();

    private readonly _producto = new ValueBoxStore<IProducto>(null)

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

    public readonly getProducto = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._productosServices.get_producto(this._productoId)
            this._producto.set(response.data)
        }
    )

    public readonly putProducto = new AsyncOperationStore(
        this._navigate,
        async (data: From) => {
            await this._productosServices.put_producto({
                id: data.id,
                nombre: data.nombre,
                descripcion: data.descripcion,
                referencia: data.referencia,
                unidad_id: data.unidad_from.value,
            })
        }
    )

    public readonly init = new AsyncOperationStore(
        this._navigate,
        async () => {
            await Promise.all([
                this.getUnidades.run(),
                this.getProducto.run()
            ])
        }
    )

    constructor(
        private readonly _productosServices: ProductosService,
        private readonly _unidadesServices: UnidadesMedidasServices,
        private readonly _navigate: NavigateFunction,
        private readonly _productoId: string
    ) {
        this._disposer.push(
            reaction(
                () => this.putProducto.status.isDone,
                (status) => {
                    if (status) {
                        toast('El producto se modifico con exito.', {
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

    public get unidades(): Array<SelectItem> {
        return this._unidades.items
    }

    public get producto(): IProducto {
        return this._producto.value
    }
}