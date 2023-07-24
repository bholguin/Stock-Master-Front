import autobind from "autobind-decorator";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { IUsuario, UsuarioServices } from "services/usuario";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { ValueBoxStore } from "stores/ValueBox";
import { VisibilityStore } from "stores/Visibility";

@autobind
export class UpdateUsuarioStore {
    public readonly show = new VisibilityStore(true)

    private readonly _usuario = new ValueBoxStore<IUsuario>(null)

    private readonly _disposer = new DisposableStore();

    public readonly getUsuario = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._usuarioServices.get_usuario(this._usuarioId)
            this._usuario.set(response.data)
        }
    )

    public readonly putUsuario = new AsyncOperationStore(
        this._navigate,
        async (data: IUsuario) => {
            await this._usuarioServices.put_usuario(data)
        }
    )

    constructor(
        private readonly _usuarioServices: UsuarioServices,
        private readonly _navigate: NavigateFunction,
        private readonly _usuarioId: string
    ) {
        this._disposer.push(
            reaction(
                () => this.putUsuario.status.isDone,
                (status) => {
                    if (status) {
                        toast('El usuario se actualizo con exito.', {
                            type: 'success'
                        })
                        this.goBack()
                    }
                }
            )
        )
    }

    public goBack() {
        this._navigate('/app/configuracion/usuarios')
    }

    public get usuario(): IUsuario {
        return this._usuario.value
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
    }
}