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
import { ValueBoxStore } from "stores/ValueBox";
import { VisibilityStore } from "stores/Visibility";

@autobind
export class UpdateDocumentoStore {
    public readonly show = new VisibilityStore(true)

    private readonly _disposer = new DisposableStore();

    private readonly _documento = new ValueBoxStore<ITipoDocumento>(null)

    private readonly _submodulos = new ArrayStore<SelectItem>([])

    public readonly putDocumento = new AsyncOperationStore(
        this._navigate,
        async (data: ITipoDocumento) => {
            await this._tipodocServices.put_tipo_documento({
                ...data,
                submodulo_id: data.submodulo.value
            })
        }
    )

    public readonly getDocumento = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._tipodocServices.get_tipo_documento(
                this._documentoId
            )
            this._documento.set(response.data)
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
        private readonly _navigate: NavigateFunction,
        private readonly _documentoId: string
    ) {
        this._disposer.push(
            reaction(
                () => this.putDocumento.status.isDone,
                (status) => {
                    if (status) {
                        toast('El tipo de documento se modifico con exito.', {
                            type: 'success'
                        })
                        this.goBack()
                    }
                }
            )
        )
    }

    public goBack() {
        this._navigate('/app/configuracion/documentos')
    }

    public get submodulos(): Array<SelectItem> {
        return this._submodulos.items
    }

    public get documento(): ITipoDocumento {
        return this._documento.value
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
    }
}