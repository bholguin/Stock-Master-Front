import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { ChangePassword, UsuarioServices } from "services/usuario";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";

export class SeguridadStore {

    private readonly _disposer = new DisposableStore();

    public readonly ChangePassword = new AsyncOperationStore(
        this._navigate,
        async (data: ChangePassword) => {
            await this._usuarioService.change_password(data)
        }
    )

    constructor(
        private readonly _usuarioService: UsuarioServices,
        private readonly _navigate: NavigateFunction
    ) { 
        this._disposer.push(
            reaction(
                () => this.ChangePassword.status.isDone,
                (status) => {
                    if (status) {
                        toast('La contraseña se actualizo con exito.', {
                            type: 'success'
                        })
                    }
                }
            )
        )
    }
    public async dispose(): Promise<void> {
        await this._disposer.dispose();
    }
}