import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { EmpresaServices } from "services/empresa";

@autobind
export class ValidateUsernameStore {

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

            }
        }
    )

    constructor(
        private readonly _navigate: NavigateFunction,
        private readonly _empresaService: EmpresaServices,
    ) {
       
    }
}