import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { ValidatorServices } from "services/validator";
import { AsyncOperationStore } from "stores/AsyncOperation";

@autobind
export class LoginScreenStore {

    public readonly testToken = new AsyncOperationStore(
        this._navigate,
        async () => {
            /* const response = await this._validatorService.test_token()
            if (response.data) {
                this._navigate('/app')
            } */
        }
    )

    constructor(
        private readonly _validatorService: ValidatorServices,
        private readonly _navigate: NavigateFunction
    ) {
    }
}