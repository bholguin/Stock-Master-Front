import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { VisibilityStore } from "stores/Visibility";
import { EntradaServices, IItem } from "services/documento/entrada";
import { ValueBoxStore } from "stores/ValueBox";
import { IDocumento } from "services/documento/interface";

@autobind
export class ViewEntradaBodegaStore {
    public readonly show = new VisibilityStore(true)

    private readonly _disposer = new DisposableStore();

    private readonly _entrada = new ValueBoxStore<IDocumento>(null)

    private readonly _items = new ArrayStore<IItem>([])

    public readonly getEntrada = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._entradaService.get_entrada(this._entradaId)
            this._entrada.set(response.data)
        }
    )

    public readonly getEntradaItems = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._entradaService.get_entrada_items(this._entradaId)
            this._items.setItems(response.data)
        }
    )

    public readonly init = new AsyncOperationStore(
        this._navigate,
        async () => {
            await Promise.all([
                this.getEntrada.run(),
                this.getEntradaItems.run()
            ])
        }
    )

    constructor(
        private readonly _entradaService: EntradaServices,
        private readonly _navigate: NavigateFunction,
        private readonly _entradaId: string
    ) {

    }

    public goBack() {
        this._navigate('/app/inventario/entradas')
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
    }

    public get entrada(): IDocumento {
        return this._entrada.value
    }

    public get items(): Array<IItem> {
        return this._items.items
    }

}