import autobind from "autobind-decorator"
import { reaction } from "mobx"
import { NavigateFunction } from "react-router-dom"
import { toast } from "react-toastify"
import { IUsuario, UsuarioServices } from "services/usuario"
import { AsyncOperationStore } from "stores/AsyncOperation"
import { DisposableStore } from "stores/Dispose"
import { ValueBoxStore } from "stores/ValueBox"

@autobind
export class CuentaStore {

    private readonly _disposer = new DisposableStore();

    private readonly _cuenta = new ValueBoxStore<IUsuario>(null)

    public readonly getCuenta = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._usuarioService.get_current_user()
            this._cuenta.set(response.data)
        }
    )

    public readonly putCuenta = new AsyncOperationStore(
        this._navigate,
        async (data: IUsuario) => {
            const response = await this._usuarioService.put_usuario(data)
            this._cuenta.set(response.data)
        }
    )

    constructor(
        private readonly _usuarioService: UsuarioServices,
        private readonly _navigate: NavigateFunction
    ) {
        this._disposer.push(
            reaction(
                () => this.putCuenta.status.isDone,
                (status) => {
                    if (status) {
                        toast('La cuenta se actualizo con exito.', {
                            type: 'success'
                        })
                    }
                }
            )
        )

    }

    public get cuenta(): IUsuario {
        return this._cuenta.value
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
    }
}