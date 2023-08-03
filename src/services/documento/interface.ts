import { IBodega } from "services/bodegas"
import { ITipoDocumento } from "services/tipos-documento"

export interface IDocumento {
    concepto?: string
    consecutivo: number
    creado: string
    id?: number
    bodega: IBodega
    tipodoc: ITipoDocumento
}