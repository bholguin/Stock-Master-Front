import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";

@autobind
export class HomeStore {

    constructor(
        private readonly _navigate: NavigateFunction
    ) {
    }

    public goToConfig() {
        this._navigate('configuracion/empresas')
    }

    public goToProductos() {
        this._navigate('productos/details')
    }

    public goToInventario() {
        this._navigate('inventario/entradas')
    }
}