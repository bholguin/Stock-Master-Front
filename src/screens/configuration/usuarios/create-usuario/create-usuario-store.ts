import autobind from "autobind-decorator";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { IUsuario, UsuarioServices } from "services/usuario";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { VisibilityStore } from "stores/Visibility";

@autobind
export class CreateUsuarioStore {
    public readonly show = new VisibilityStore(true)

    private readonly _disposer = new DisposableStore();

    public readonly postUsuario = new AsyncOperationStore(
        this._navigate,
        async (data: IUsuario) => {
            await this._unidadesServices.post_usuario(data)
        }
    )

    constructor(
        private readonly _unidadesServices: UsuarioServices,
        private readonly _navigate: NavigateFunction
    ){
        this._disposer.push(
            reaction(
                () => this.postUsuario.status.isDone,
                (status) => {
                    if (status) {
                        toast('El usuario se creo con exito.', {
                            type: 'success'
                        })
                        this.goBack()
                    }
                }
            )
        )
    }

    public goBack(){
        this._navigate('/app/configuracion/usuarios')
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
      }
}