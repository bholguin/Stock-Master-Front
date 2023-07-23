import autobind from "autobind-decorator";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { AuthServices } from "services/auth";
import { IUsuario, UsuarioServices } from "services/usuario";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { ValueBoxStore } from "stores/ValueBox";

@autobind
export class LayoutStore {

    private readonly _disposer = new DisposableStore();

    private readonly _usuario = new ValueBoxStore<IUsuario>(null)

    public readonly getUsuario = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._usuarioService.get_current_user()
            this._usuario.set(response.data)
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

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
      }
}