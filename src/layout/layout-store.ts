import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { UsuarioServices } from "services/usuario";
import { AsyncOperationStore } from "stores/AsyncOperation";

@autobind
export class LayoutStore {

    public readonly getUsuario = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._usuarioService.get_current_user()
            console.log(response);
        }
    )

    constructor(
        private readonly _usuarioService: UsuarioServices,
        private readonly _navigate: NavigateFunction
    ) { }
}