import autobind from "autobind-decorator";
import { EnhancedTableStore } from "components/TableFront";
import { HeadCell } from "components/TableFront/Head";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { UsuarioServices, IUsuario } from "services/usuario";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";

@autobind
export class UsuariosStore {

    public readonly tableStore: EnhancedTableStore<IUsuario & { action?: unknown }>;

    private readonly _usuarios = new ArrayStore<IUsuario>([])

    private readonly _disposer = new DisposableStore();

    private readonly _columns = new ArrayStore<HeadCell<IUsuario & { action?: unknown }>>([
      {
        id: 'nombre',
        label: 'Nombre',
      },
      {
        id: 'apellido',
        label: 'Apellido',
      },
      {
        id: 'username',
        label: 'Username',
      },
      {
        id: 'telefono',
        label: 'Telefono',
      },
      {
        id: 'correo',
        label: 'Correo',
      },
      {
        id: 'action',
        label: '',
      },
    ]);

    public readonly getUsuarios = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._usuarioService.get_usuarios()
            this._usuarios.setItems(response.data)
        }
    )

    constructor(
        private readonly _usuarioService: UsuarioServices,
        private readonly _navigate: NavigateFunction
    ) { 
      this.tableStore = new EnhancedTableStore(
        this._columns.items,
      );
      this._disposer.push(
        reaction(
          () => this._usuarios.items,
          (usuarios) => {
            if (Array.isArray(usuarios)) {
              this.tableStore.setList(usuarios);
            }
          },
        ),
      )
    }

    public goToCreate() {
      this._navigate('create')
    }

    public goToUpdate(id: number) {
      this._navigate(`${id}`)
    }

    public get usuarios() {
        return this._usuarios.items
    }
}