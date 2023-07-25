import autobind from "autobind-decorator";
import { EnhancedTableStore } from "components/TableFront";
import { HeadCell } from "components/TableFront/Head";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { IUnidadMedida, UnidadesMedidasServices } from "services/unidades_medidas";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";

@autobind
export class UnidadesMedidasStore {

  public readonly tableStore: EnhancedTableStore<IUnidadMedida & { action?: unknown }>;

  private readonly _unidades = new ArrayStore<IUnidadMedida>([])

  private readonly _disposer = new DisposableStore();

  private readonly _columns = new ArrayStore<HeadCell<IUnidadMedida & { action?: unknown }>>([
    {
      id: 'nombre',
      label: 'Nombre',
    },
    {
      id: 'prefijo',
      label: 'Prefijo',
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

  public readonly getUnidades = new AsyncOperationStore(
    this._navigate,
    async () => {
      const response = await this._unidadesServices.get_unidades()
      this._unidades.setItems(response.data)
    }
  )

  public readonly deleteUnidad = new AsyncOperationStore(
    this._navigate,
    async (id: string) => {
      await this._unidadesServices.delete_unidad(id)
    }
  )

  constructor(
    private readonly _unidadesServices: UnidadesMedidasServices,
    private readonly _navigate: NavigateFunction
  ) {
    this.tableStore = new EnhancedTableStore(
      this._columns.items,
    );

    this._disposer.push(
      reaction(
        () => this._unidades.items,
        (vehiculos) => {
          if (Array.isArray(vehiculos)) {
            this.tableStore.setList(vehiculos);
          }
        },
      ),
      reaction(
        () => this.deleteUnidad.status.isDone,
        (status) => {
          if (status) {
            toast('La unidad se elimino con exito.', {
              type: 'success'
            })
            this.getUnidades.run()
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

  public get unidades(): Array<IUnidadMedida> {
    return this._unidades.items
  }

  public async dispose(): Promise<void> {
    await this._disposer.dispose();
    await this.tableStore.dispose();
  }
}