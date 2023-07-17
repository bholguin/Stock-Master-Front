import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { VehiculosServices } from "services/vehiculos";
import { VisibilityStore } from "stores/Visibility";

@autobind
export class CreateVehiculoStore {
    public readonly show = new VisibilityStore(true)

    constructor(
        private readonly _vehiculosServices: VehiculosServices,
        private readonly _navigate: NavigateFunction
    ){}

    public goBack(){
        this._navigate('/app/configuration/vehiculos')
    }
}