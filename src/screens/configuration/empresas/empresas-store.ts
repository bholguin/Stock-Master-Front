import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { EmpresaServices, IEmpresa } from "services/empresa";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { ValueBoxStore } from "stores/ValueBox";
import { HandlerError } from "utilities/handler-error/handler-error";

@autobind
export class EmpresasStore {
    private readonly _handlerError: HandlerError

    private readonly _empresa = new ValueBoxStore<IEmpresa>(null)

    public readonly getEmpresa = new AsyncOperationStore(
        async () => {
            try {
                const response = await this._empresaService.get_empresa()
                this._empresa.set(response.data)
            } catch (e: any) {
                this._handlerError.takeError(e)
            }

        }
    )

    public readonly updateEmpresa = new AsyncOperationStore(
        async (empresa: IEmpresa) => {
            try {
                const response = await this._empresaService.put_empresa(empresa)
                this._empresa.set(response.data)
                toast('Se actualizo con exito.', {
                    type: 'success'
                })   
            } catch (e: any) {
                this._handlerError.takeError(e)
            }

        }
    )

    constructor(
        private readonly _empresaService: EmpresaServices,
        private readonly _navigate: NavigateFunction
    ) { 
        this._handlerError = new HandlerError(this._navigate)
    }

    public get empresa(): IEmpresa {
        return this._empresa.value
    }
}