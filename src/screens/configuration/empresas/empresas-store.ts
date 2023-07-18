import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { EmpresaServices, IEmpresa } from "services/empresa";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { ValueBoxStore } from "stores/ValueBox";

@autobind
export class EmpresasStore {

    private readonly _empresa = new ValueBoxStore<IEmpresa>(null)

    public readonly getEmpresa = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._empresaService.get_empresa()
            this._empresa.set(response.data)
        }
    )

    public readonly updateEmpresa = new AsyncOperationStore(
        this._navigate,
        async (empresa: IEmpresa) => {
            const response = await this._empresaService.put_empresa(empresa)
            this._empresa.set(response.data)
            toast('Se actualizo con exito.', {
                type: 'success'
            })
        }
    )

    constructor(
        private readonly _empresaService: EmpresaServices,
        private readonly _navigate: NavigateFunction
    ) { }

    public get empresa(): IEmpresa {
        return this._empresa.value
    }
}