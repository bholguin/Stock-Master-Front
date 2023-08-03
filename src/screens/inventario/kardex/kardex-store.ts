import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces";
import { NavigateFunction } from "react-router-dom";
import { BodegasServices } from "services/bodegas";
import { MovimientoService } from "services/movimientos";
import { IProducto, ProductosService } from "services/productos";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { Form } from "./kardex";

export class KardexStore {

    private readonly _productos = new ArrayStore<SelectItem>([])

    private readonly _bodegas = new ArrayStore<SelectItem>([])

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

    public readonly getBodegas = new AsyncOperationStore(
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

    public readonly init = new AsyncOperationStore(
        this._navigate,
        async () => {
            await Promise.all([
                this.getBodegas.run(),
                this.getProductos.run()
            ])
        }
    )

    public readonly getKardex = new AsyncOperationStore(
        this._navigate,
        async (data: Form) => {
            const response = await this._movimientoService.get_kardex(data.producto.value)
            console.log(response);
        }
    )

    constructor(
        private readonly _bodegaServices: BodegasServices,
        private readonly _productoService: ProductosService,
        private readonly _movimientoService: MovimientoService,
        private readonly _navigate: NavigateFunction
    ) { }

    public get bodegas(): Array<SelectItem> {
        return this._bodegas.items
    }

    public get productos(): Array<SelectItem> {
        return this._productos.items
    }
}