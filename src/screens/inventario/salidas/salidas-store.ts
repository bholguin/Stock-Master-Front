import autobind from "autobind-decorator";
import { EnhancedTableStore } from "components/TableFront";
import { HeadCell } from "components/TableFront/Head";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { IDocumento } from "services/documento/interface";
import { SalidasServices } from "services/documento/salida";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";

@autobind
export class SalidasStore {

  public readonly tableStore: EnhancedTableStore<IDocumento & { action?: unknown }>;

  private readonly _entradas = new ArrayStore<IDocumento>([])

  private readonly _disposer = new DisposableStore();

  private readonly _columns = new ArrayStore<HeadCell<IDocumento & { action?: unknown }>>([
    {
      id: 'tipodoc',
      label: 'Documento',
    },
    {
      id: 'creado',
      label: 'Fecha',
    },
    {
      id: 'bodega',
      label: 'Bodega',
    },
    {
      id: 'concepto',
      label: 'Concepto',
    },
    {
      id: 'action',
      label: '',
    },
  ]);

  public readonly getEntradas = new AsyncOperationStore(
    this._navigate,
    async () => {
      const response = await this._salidasService.get_salidas()
      this._entradas.setItems(response.data)
    }
  )

  constructor(
    private readonly _salidasService: SalidasServices,
    private readonly _navigate: NavigateFunction
  ) { 
    this.tableStore = new EnhancedTableStore(
      this._columns.items,
    );

    this._disposer.push(
      reaction(
        () => this._entradas.items,
        (entradas) => {
          if (Array.isArray(entradas)) {
            this.tableStore.setList(entradas);
          }
        },
      )
      )
  }

  public goToCreate() {
    this._navigate('create')
  }

  public goToView(id: number) {
    this._navigate(`${id}`)
  }

  public async dispose(): Promise<void> {
    await this._disposer.dispose();
    await this.tableStore.dispose();
  }
}