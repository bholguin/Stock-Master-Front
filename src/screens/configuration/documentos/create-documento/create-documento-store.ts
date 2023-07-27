import autobind from "autobind-decorator";
import { SelectItem } from "components/SelectComponent/SelectComponent.interfaces";
import { reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { ModulosServices } from "services/modulos";
import { ITipoDocumento, TipoDocumentoServices } from "services/tipos-documento";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { VisibilityStore } from "stores/Visibility";

@autobind
export class CreateDocumentoStore {
    public readonly show = new VisibilityStore(true)

    private readonly _disposer = new DisposableStore();

    private readonly _submodulos = new ArrayStore<SelectItem>([])

    public readonly postDocumento = new AsyncOperationStore(
        this._navigate,
        async (data: ITipoDocumento) => {
            await this._tipodocServices.post_tipo_documento({
                ...data,
                submodulo_id: data.submodulo.value
            })
        }
    )

    public readonly getModulos = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._moduloService.get_submodulos()
            this._submodulos.setItems(
                response.data.map((item) => ({
                    label: item.id,
                    value: item.id,
                    group: item.modulo_id
                })).sort((a, b) => -b.group.localeCompare(a.group))
            )
        }
    )

    constructor(
        private readonly _tipodocServices: TipoDocumentoServices,
        private readonly _moduloService: ModulosServices,
        private readonly _navigate: NavigateFunction
    ){
        this._disposer.push(
            reaction(
                () => this.postDocumento.status.isDone,
                (status) => {
                    if (status) {
                        toast('El tipo de documento se creo con exito.', {
                            type: 'success'
                        })
                        this.goBack()
                    }
                }
            )
        )
    }

    public goBack(){
        this._navigate('/app/configuracion/documentos')
    }

    public get submodulos(): Array<SelectItem> {
        return this._submodulos.items
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
      }
}