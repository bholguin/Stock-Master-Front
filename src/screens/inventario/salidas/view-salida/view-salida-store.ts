import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";
import { ArrayStore } from "stores/ArrayStore";
import { AsyncOperationStore } from "stores/AsyncOperation";
import { DisposableStore } from "stores/Dispose";
import { VisibilityStore } from "stores/Visibility";
import { IEntrada, IItem } from "services/entrada";
import { ValueBoxStore } from "stores/ValueBox";
import { SalidasServices } from "services/salida";

@autobind
export class ViewSalidaBodegaStore {
    public readonly show = new VisibilityStore(true)

    private readonly _disposer = new DisposableStore();

    private readonly _salida = new ValueBoxStore<IEntrada>(null)

    private readonly _items = new ArrayStore<IItem>([])

    public readonly getSalida = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._salidaService.get_salida(this._salidaId)
            this._salida.set(response.data)
        }
    )

    public readonly getSalidaItems = new AsyncOperationStore(
        this._navigate,
        async () => {
            const response = await this._salidaService.get_salida_items(this._salidaId)
            this._items.setItems(response.data)
        }
    )

    public readonly init = new AsyncOperationStore(
        this._navigate,
        async () => {
            await Promise.all([
                this.getSalida.run(),
                this.getSalidaItems.run()
            ])
        }
    )

    constructor(
        private readonly _salidaService: SalidasServices,
        private readonly _navigate: NavigateFunction,
        private readonly _salidaId: string
    ) {

    }

    public goBack() {
        this._navigate('/app/inventario/salidas')
    }

    public async dispose(): Promise<void> {
        await this._disposer.dispose();
    }

    public get salida(): IEntrada {
        return this._salida.value
    }

    public get items(): Array<IItem> {
        return this._items.items
    }

}