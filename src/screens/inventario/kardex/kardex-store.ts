import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces";
import { NavigateFunction } from "react-router-dom";
import { BodegasServices } from "services/bodegas";
import { IMovimiento, MovimientoService } from "services/movimientos";
import { IProducto, ProductosService } from "services/productos";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { Form } from "./kardex";
import { DisposableStore } from "stores/Dispose";
import { HeadCell } from "components/TableFront/Head";
import { EnhancedTableStore } from "components/TableFront";
import { reaction } from "mobx";
import { ValueBoxStore } from "stores/ValueBox";

export class KardexStore {

    public readonly tableStore: EnhancedTableStore<IMovimiento & { action?: unknown }>;

    private readonly _datos = new ArrayStore<IMovimiento>([])

    private readonly _product = new ValueBoxStore<SelectItem>(null)

    private readonly _saldo = new ValueBoxStore<number>(0)

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
                        label: item.nombre,
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
            const response = await this._movimientoService.get_kardex({
                bodega_id: data.bodega.value,
                producto_id: data.producto.value
            })
            this._product.set(data.producto)
            this._datos.setItems(response.data)
        }
    )

    private readonly _disposer = new DisposableStore();

    private readonly _columns = new ArrayStore<HeadCell<IMovimiento & { action?: unknown }>>([
        {
            id: 'documento',
            label: 'Documento',
        },
        {
            id: 'creado',
            label: 'Fecha',
        },
        {
            id: 'cantidad',
            label: 'Entradas',
            align: 'right'
        },
        {
            id: 'cantidad',
            label: 'Salidas',
            align: 'right'
        },
    ]);


    constructor(
        private readonly _bodegaServices: BodegasServices,
        private readonly _productoService: ProductosService,
        private readonly _movimientoService: MovimientoService,
        private readonly _navigate: NavigateFunction
    ) {

        this.tableStore = new EnhancedTableStore(
            this._columns.items,
        );

        this._disposer.push(
            reaction(
                () => this._datos.items,
                (datos) => {
                    if (Array.isArray(datos)) {
                        const total = datos.reduce((total, item) => {
                            if(item.tipo === "E"){
                                return total + item.cantidad
                            }else{
                                return total - item.cantidad
                            }
                        }, 0)
                        this._saldo.set(total)
                        this.tableStore.setList(datos);
                    }
                },
            )
        )
    }

    public get bodegas(): Array<SelectItem> {
        return this._bodegas.items
    }

    public get productos(): Array<SelectItem> {
        return this._productos.items
    }

    public get product(): SelectItem {
        return this._product.value
    }

    public get saldo(): number {
        return this._saldo.value
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
        await this.tableStore.dispose();
    }
}