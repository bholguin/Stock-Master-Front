import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { UsuarioServices } from "services/usuario";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { HandlerError } from "utilities/handler-error/handler-error";

@autobind
export class LayoutStore {

    private readonly _handlerError: HandlerError

    public readonly getUsuario = new AsyncOperationStore(
        async () => {
            try {
                const response = await this._usuarioService.get_current_user()
                console.log(response);
            } catch (e: any) {
                this._handlerError.takeError(e)
            }

        }
    )

    constructor(
        private readonly _usuarioService: UsuarioServices,
        private readonly _navigate: NavigateFunction
    ){
        this._handlerError = new HandlerError(this._navigate)
    }
}