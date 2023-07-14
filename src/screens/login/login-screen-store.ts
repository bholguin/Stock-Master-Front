import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { ValidatorServices } from "services/validator";
import { AsyncOperationStore } from "stores/AsyncOperation";

@autobind
export class LoginScreenStore {

    public readonly testToken = new AsyncOperationStore(
        async () => {
            try {
                const response = await this._validatorService.test_token()
                if(response.data){
                   this._navigate('/home')
                }
            } catch (e: any) {

            }
        }
    )

    constructor(
        private readonly _validatorService: ValidatorServices,
        private readonly _navigate: NavigateFunction
    ){}
}