import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { ValidatorServices } from "services/validator";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { HandlerError } from "utilities/handler-error/handler-error";

@autobind
export class LoginScreenStore {

    private readonly _handlerError: HandlerError

    public readonly testToken = new AsyncOperationStore(
        async () => {
            try {
                const response = await this._validatorService.test_token()
                if (response.data) {
                    this._navigate('/app')
                }
            } catch (e: any) {
                this._handlerError.takeError(e, false)
            }
        }
    )

    constructor(
        private readonly _validatorService: ValidatorServices,
        private readonly _navigate: NavigateFunction
    ) {
        this._handlerError = new HandlerError(this._navigate)
    }
}