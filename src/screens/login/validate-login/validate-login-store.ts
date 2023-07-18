import autobind from "autobind-decorator";
import { Location, NavigateFunction } from "react-router-dom";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { LoginForm, ValidateLoginData } from "./interfaces";
import { AuthServices } from "services/auth";
import { ValueBoxStore } from "stores/ValueBox";

@autobind
export class ValidateLoginStore {

    private readonly _data = new ValueBoxStore<ValidateLoginData>({
        empresas: [],
        username: ''
    })

    public readonly login = new AsyncOperationStore(
        this._navigate,
        async (data: LoginForm) => {
            const response = await this._authService.login({
                username: data.username,
                password: data.password,
                empresa_id: data.empresa
            });
            sessionStorage.setItem('app-token', response.data)
            this._navigate('/app')
        }
    )

    constructor(
        private readonly _navigate: NavigateFunction,
        private readonly _authService: AuthServices,
        private readonly _location: Location
    ) {
        if (this._location.state) {
            this._data.set({
                empresas: this._location.state.empresas,
                username: this._location.state.username
            })
        } else {
            this._navigate('/')
        }
    }

    public goToRoot() {
        this._navigate('/')
    }

    public get data(): ValidateLoginData {
        return this._data.value
    }
}