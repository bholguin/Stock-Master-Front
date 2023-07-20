import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { IUsuario, UsuarioServices } from "services/usuario";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { ValueBoxStore } from "stores/ValueBox";

@autobind
export class LayoutStore {

    private readonly _usuario = new ValueBoxStore<IUsuario>(null)

    public readonly getUsuario = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._usuarioService.get_current_user()
            this._usuario.set(response.data)
        }
    )

    constructor(
        private readonly _usuarioService: UsuarioServices,
        private readonly _navigate: NavigateFunction
    ) { }

    public get name(): string {
        return `${this._usuario.value?.nombre} ${this._usuario.value?.apellido}`
    }
}