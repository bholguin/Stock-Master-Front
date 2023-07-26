import autobind from "autobind-decorator";
import { EnhancedTableStore } from "components/TableFront";
import { HeadCell } from "components/TableFront/Head";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { IProducto, ProductosService } from "services/productos";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";

@autobind
export class DetalleProductoStore {

    private readonly _productos = new ArrayStore<IProducto>([])

    private readonly _disposer = new DisposableStore();

    public readonly tableStore: EnhancedTableStore<IProducto & { action?: unknown }>;

    public readonly getProductos = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._productoService.get_productos()
            this._productos.setItems(response.data)
        }
    )

    public readonly deleteProducto =  new AsyncOperationStore(
        this._navigate,
        async (id: string ) => {
            await this._productoService.delete_producto(id)
        }
    )

    private readonly _columns = new ArrayStore<HeadCell<IProducto & { action?: unknown }>>([
        {
            id: 'nombre',
            label: 'Nombre',
        },
        {
            id: 'referencia',
            label: 'Referencia',
        },
        {
            id: 'unidad',
            label: 'Unidad',
        },
        {
            id: 'descripcion',
            label: 'Descripcion',
        },
        {
            id: 'action',
            label: '',
        },
    ]);

    constructor(
        private readonly _productoService: ProductosService,
        private readonly _navigate: NavigateFunction
    ) {
        this.tableStore = new EnhancedTableStore(
            this._columns.items,
        );

        this._disposer.push(
            reaction(
                () => this._productos.items,
                (productos) => {
                    if (Array.isArray(productos)) {
                        this.tableStore.setList(productos);
                    }
                },
            ),
            reaction(
                () => this.deleteProducto.status.isDone,
                (status) => {
                  if (status) {
                    toast('El producto se elimino con exito.', {
                      type: 'success'
                    })
                    this.getProductos.run()
                  }
                }
              )
        )
    }

    public goToCreate() {
        this._navigate('create')
    }

    public goToUpdate(id: string) {
        this._navigate(`${id}`)
    }

    public get productos(): Array<IProducto> {
        return this._productos.items
    }


    public async dispose(): Promise<void> {
        await this._disposer.dispose();
        await this.tableStore.dispose();
    }
}