import autobind from "autobind-decorator";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { AuthServices } from "services/auth";
import { EmpresaServices, IEmpresa } from "services/empresa";
import { IUsuario, UsuarioServices } from "services/usuario";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { ValueBoxStore } from "stores/ValueBox";

@autobind
export class LayoutStore {

    private readonly _disposer = new DisposableStore();

    private readonly _usuario = new ValueBoxStore<IUsuario>(null)
    private readonly _empresa = new ValueBoxStore<IEmpresa>(null)

    public readonly getUsuario = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._usuarioService.get_current_user()
            this._usuario.set(response.data)
        }
    )

    public readonly getEmpresa = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._empresaService.get_empresa()
            this._empresa.set(response.data)
        }
    )

    public readonly init = new AsyncOperationStore(
        this._navigate,
        async () => {
            await Promise.all([
                this.getEmpresa.run(),
                this.getUsuario.run()
            ])
        }
    )

    public readonly logout = new AsyncOperationStore(
        this._navigate,
        async() => {
            await this._authServices.logout()
        }
    )

    constructor(
        private readonly _usuarioService: UsuarioServices,
        private readonly _authServices: AuthServices,
        private readonly _empresaService: EmpresaServices,
        private readonly _navigate: NavigateFunction
    ) { 
        this._disposer.push(
            reaction(
                () => this.logout.status.isDone,
                (status) => {
                    if(status){
                        sessionStorage.removeItem('app-token')
                        this._navigate('/')
                    }
                }
            )
        )
        
    }

    public goToPerfil() {
        this._navigate('app/perfil/cuenta')
    }

    public get name(): string {
        return `${this._usuario.value?.nombre} ${this._usuario.value?.apellido}`
    }

    public get empresaName(): string {
        return this._empresa.value ? this._empresa.value.nombre : ""
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
      }
}