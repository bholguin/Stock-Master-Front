import { NavigateFunction } from "react-router-dom";
import { VehiculosServices } from "services/vehiculos";

export class VeiculosStore {
    constructor(
        private readonly _vehiculosServices: VehiculosServices,
        private readonly _navigate: NavigateFunction
    ){}
}