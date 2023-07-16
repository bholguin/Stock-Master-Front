import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";

@autobind
export class HomeStore {

    constructor(
        private readonly _navigate: NavigateFunction
    ) {
    }

    public goToConfig() {
        this._navigate('configuration/empresas')
    }
}