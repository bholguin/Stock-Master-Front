import autobind from "autobind-decorator"
import { NavigateFunction } from "react-router-dom"
import { IUsuario, UsuarioServices } from "services/usuario"
import { AsyncOperationStore } from "stores/AsyncOperation"
import { ValueBoxStore } from "stores/ValueBox"

@autobind
export class CuentaStore {

    private readonly _cuenta = new ValueBoxStore<IUsuario>(null)

    public readonly getCuenta = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._usuarioService.get_current_user()
            this._cuenta.set(response.data)
        }
    )

    constructor(
        private readonly _usuarioService: UsuarioServices,
        private readonly _navigate: NavigateFunction
    ) { }

    public get cuenta(): IUsuario {
        return this._cuenta.value
    }
}