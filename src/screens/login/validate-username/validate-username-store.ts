import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { EmpresaServices } from "services/empresa";
import { HandlerError } from "utilities/handler-error/handler-error";

@autobind
export class ValidateUsernameStore {

    private readonly _handlerError: HandlerError

    public readonly empresasByusername = new AsyncOperationStore(
        async (username: string) => {
            try {
                const response = await this._empresaService.empresas_by_username(username);
                this._navigate('login', {
                    state: {
                        empresas: response.data,
                        username: username
                    }
                })
            } catch (e: any) {
                this._handlerError.takeError(e)
            }
        }
    )

    constructor(
        private readonly _navigate: NavigateFunction,
        private readonly _empresaService: EmpresaServices,
    ) {
       this._handlerError = new HandlerError(this._navigate)
    }
}