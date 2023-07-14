import { NavigateFunction } from "react-router-dom";
import { UsuarioServices } from "services/usuario";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { HandlerError } from "utilities/handler-error/handler-error";

export class UsuariosStore {
    private readonly _handlerError: HandlerError

    private readonly _usuarios = new ArrayStore<any>([])

    public readonly getUsuarios = new AsyncOperationStore(
        async () => {
            try {
                const response = await this._usuarioService.get_usuarios()
                console.log(response);
            } catch (e: any) {
                this._handlerError.takeError(e)
            }

        }
    )

    constructor(
        private readonly _usuarioService: UsuarioServices,
        private readonly _navigate: NavigateFunction
    ) { 
        this._handlerError = new HandlerError(this._navigate)
    }

    public get usuarios() {
        return this._usuarios.items
    }
}