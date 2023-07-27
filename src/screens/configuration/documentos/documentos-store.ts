import autobind from "autobind-decorator";
import { EnhancedTableStore } from "components/TableFront";
import { HeadCell } from "components/TableFront/Head";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { ITipoDocumento, TipoDocumentoServices } from "services/tipos-documento";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";

@autobind
export class DocumentoStore {

  public readonly tableStore: EnhancedTableStore<ITipoDocumento & { action?: unknown }>;

  private readonly _documentos = new ArrayStore<ITipoDocumento>([])

  private readonly _disposer = new DisposableStore();

  private readonly _columns = new ArrayStore<HeadCell<ITipoDocumento & { action?: unknown }>>([
    {
      id: 'nombre',
      label: 'Nombre',
    },
    {
      id: 'prefijo',
      label: 'Prefijo',
    },
    {
      id: 'consecutivo',
      label: 'Consecutivo',
    },
    {
      id: 'submodulo_id',
      label: 'Submodulo',
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

  public readonly getTiposDocuento = new AsyncOperationStore(
    this._navigate,
    async () => {
      const response = await this._tipodocServices.get_tipos_documento()
      this._documentos.setItems(response.data)
    }
  )

  public readonly deleteTiposDocuento = new AsyncOperationStore(
    this._navigate,
    async (id: number) => {
      await this._tipodocServices.delete_tipo_documento(id)
    }
  )

  constructor(
    private readonly _tipodocServices: TipoDocumentoServices,
    private readonly _navigate: NavigateFunction
  ) {
    this.tableStore = new EnhancedTableStore(
      this._columns.items,
    );

    this._disposer.push(
      reaction(
        () => this._documentos.items,
        (vehiculos) => {
          if (Array.isArray(vehiculos)) {
            this.tableStore.setList(vehiculos);
          }
        },
      ),
      reaction(
        () => this.deleteTiposDocuento.status.isDone,
        (status) => {
          if(status){
            toast('EL tipo de documento se elimino con exito', {
              type: 'success'
            })
            this.getTiposDocuento.run()
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

  public get documentos(): Array<ITipoDocumento> {
    return this._documentos.items
  }

  public async dispose(): Promise<void> {
    await this._disposer.dispose();
    await this.tableStore.dispose();
  }
}