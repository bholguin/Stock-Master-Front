import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { EntradaServices } from "services/entrada";
import { AsyncOperationStore } from "stores/AsyncOperation";

@autobind
export class EntradasStore {

    public readonly getEntradas = new AsyncOperationStore(
        this._navigate,
        async () => {
          const response = await this._entradaService.get_entradas()
          console.log(response); 
        }
      )

    constructor(
        private readonly _entradaService: EntradaServices,
        private readonly _navigate: NavigateFunction
    ){}

    public goToCreate() {
      this._navigate('create')
    }
}