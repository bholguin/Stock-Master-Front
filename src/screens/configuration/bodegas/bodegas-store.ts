import autobind from "autobind-decorator";
import { EnhancedTableStore } from "components/TableFront";
import { HeadCell } from "components/TableFront/Head";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { BodegasServices, IBodega } from "services/bodegas";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";

@autobind
export class BodegasStore {

  public readonly tableStore: EnhancedTableStore<IBodega & { action?: unknown }>;

  private readonly _bodegas = new ArrayStore<IBodega>([])

  private readonly _disposer = new DisposableStore();

  private readonly _columns = new ArrayStore<HeadCell<IBodega & { action?: unknown }>>([
    {
      id: 'nombre',
      label: 'Nombre',
    },
    {
      id: 'direccion',
      label: 'Direccion',
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

  public readonly getBodegas = new AsyncOperationStore(
    this._navigate,
    async () => {
      const response = await this._bodegaServices.get_bodegas()
      this._bodegas.setItems(response.data)
    }
  )

  public readonly deleteBodega = new AsyncOperationStore(
    this._navigate,
    async (id: number) => {
     await this._bodegaServices.delete_bodega(id)
    }
  )

  constructor(
    private readonly _bodegaServices: BodegasServices,
    private readonly _navigate: NavigateFunction
  ) {
    this.tableStore = new EnhancedTableStore(
      this._columns.items,
    );

    this._disposer.push(
      reaction(
        () => this._bodegas.items,
        (vehiculos) => {
          if (Array.isArray(vehiculos)) {
            this.tableStore.setList(vehiculos);
          }
        },
      ),
      reaction(
        () => this.deleteBodega.status.isDone,
        (status) => {
          if (status) {
            toast('La bodega se elimino con exito.', {
              type: 'success'
            })
            this.getBodegas.run()
          }
        }
      )
    )
  }

  public goToCreate() {
    this._navigate('create')
  }

  public goToUpdate(id: number) {
    this._navigate(`${id}`)
  }

  public get bodegas(): Array<IBodega> {
    return this._bodegas.items
  }

  public async dispose(): Promise<void> {
    await this._disposer.dispose();
    await this.tableStore.dispose();
  }
}