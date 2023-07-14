import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

export class HandlerError {

    constructor(
        private readonly _navigate: NavigateFunction,
    ){}

    public takeError(error: XMLHttpRequest, redirect401: boolean = true) {
        switch (error.response.status) {
            case 401:
                if (redirect401) {
                    this._navigate('/')
                }
                break;
            case 403:
                toast(error.response.data, {
                    type: 'error'
                })
                break;
            default:
                break;
        }
    }
}
