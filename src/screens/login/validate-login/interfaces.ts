import { IEmpresa } from "services/empresa";

export type LoginForm = {
    username: string;
    password: string;
    empresa: any
}


export type ValidateLoginData = {
    username: string;
    empresas: Array<IEmpresa>
}