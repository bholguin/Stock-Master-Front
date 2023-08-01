import autobind from "autobind-decorator";
import { FormProd } from "components/AddItem";
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { BodegasServices } from "services/bodegas";
import { IProducto, ProductosService } from "services/productos";
import { ITipoDocumento, TipoDocumentoServices } from "services/tipos-documento";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { VisibilityStore } from "stores/Visibility";
import { Form } from "./create-salida";
import { toast } from "react-toastify";
import { SalidasServices } from "services/salida";

@autobind
export class CreateSalidaBodegaStore {
    public readonly show = new VisibilityStore(true)

    private readonly _disposer = new DisposableStore();

    private readonly _bodegas = new ArrayStore<SelectItem>([])

    private readonly _tiposdoc = new ArrayStore<ITipoDocumento>([])

    private readonly _tiposdocList = new ArrayStore<SelectItem>([])

    private readonly _productos = new ArrayStore<SelectItem>([])

    public readonly productosSelected = new ArrayStore<FormProd>([])

    public readonly getBodega = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._bodegaServices.get_bodegas()
            this._bodegas.setItems(
                response.data.map((item) => {
                    return {
                        value: item.id,
                        label: item.nombre
                    }
                })
            )
        }
    )

    public readonly getTiposdoc = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._tipodocService.get_tipos_documento_submodulo('SALIDAS')
            this._tiposdoc.setItems(response.data)
        }
    )

    public readonly getProductos = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response: { data: Array<IProducto> } = await this._productoService.get_productos()
            this._productos.setItems(
                response.data.map((item) => {
                    return {
                        value: item.id,
                        label: item.nombre,
                        group: item?.unidad?.prefijo
                    }
                })
            )
        }
    )

    public readonly init = new AsyncOperationStore(
        this._navigate,
        async () => {
            await Promise.all([
                this.getBodega.run(),
                this.getTiposdoc.run(),
                this.getProductos.run()
            ])
        }
    )

    public readonly postSalida = new AsyncOperationStore(
        this._navigate,
        async (data: Form) => {
            const response = await this._salidaService.post_salida({
                concepto: data.concepto,
                consecutivo: data.consecutivo,
                bodega_id: data.bodega.value,
                tipodoc_id: data.tipodoc.value,
                productos: data.productos.map((item) => ({
                    cantidad: item.cantidad,
                    producto_id: item.producto.value
                }))
            })
            console.log(response);  
        }
    )

    constructor(
        private readonly _salidaService: SalidasServices,
        private readonly _bodegaServices: BodegasServices,
        private readonly _tipodocService: TipoDocumentoServices,
        private readonly _productoService: ProductosService,
        private readonly _navigate: NavigateFunction
    ) {
        reaction(
            () => this._tiposdoc.items,
            (items) => {
                const list = items.map((item) => ({
                    value: item.id.toString(),
                    label: `${item.prefijo} - ${item.nombre}`
                }))
                this._tiposdocList.setItems(list)
            }
        )
        reaction(
            () => this.postSalida.status.isDone,
            (status) => {
                if (status) {
                    toast('La salida se creo con exito.', {
                        type: 'success'
                    })
                    this.goBack()
                }
            }
        )
    }

    public goBack() {
        this._navigate('/app/inventario/salidas')
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
    }

    public get bodegas(): Array<SelectItem> {
        return this._bodegas.items
    }

    public get tiposdocList(): Array<SelectItem> {
        return this._tiposdocList.items
    }

    public get tipodoc(): Array<ITipoDocumento> {
        return this._tiposdoc.items
    }

    public get productos(): Array<SelectItem> {
        return this._productos.items
    }
}