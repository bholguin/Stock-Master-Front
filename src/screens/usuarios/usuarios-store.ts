import { UsuarioServices } from "services/usuario";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";

export class UsuariosStore {
    private readonly _usuarios = new ArrayStore<any>([])

    public readonly getUsuarios = new AsyncOperationStore(
        async () => {
            try {
                const response = await this._usuarioService.get_usuarios()
                console.log(response);
            } catch (e) {

            }

        }
    )

    constructor(
        private readonly _usuarioService: UsuarioServices
    ) { }

    public get usuarios() {
        return this._usuarios.items
    }
}