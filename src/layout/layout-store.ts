import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { AuthServices } from "services/auth";
import { IUsuario, UsuarioServices } from "services/usuario";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { ValueBoxStore } from "stores/ValueBox";

@autobind
export class LayoutStore {

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
            sessionStorage.removeItem('app-token')
            this._navigate('/')
        }
    )

    constructor(
        private readonly _usuarioService: UsuarioServices,
        private readonly _authServices: AuthServices,
        private readonly _navigate: NavigateFunction
    ) { }

    public goToPerfil() {
        this._navigate('app/perfil/cuenta')
    }

    public get name(): string {
        return `${this._usuario.value?.nombre} ${this._usuario.value?.apellido}`
    }
}