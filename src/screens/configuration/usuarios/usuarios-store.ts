import { NavigateFunction } from "react-router-dom";
import { UsuarioServices } from "services/usuario";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";

export class UsuariosStore {

    private readonly _usuarios = new ArrayStore<any>([])

    public readonly getUsuarios = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._usuarioService.get_usuarios()
            console.log(response);
        }
    )

    constructor(
        private readonly _usuarioService: UsuarioServices,
        private readonly _navigate: NavigateFunction
    ) { }

    public get usuarios() {
        return this._usuarios.items
    }
}