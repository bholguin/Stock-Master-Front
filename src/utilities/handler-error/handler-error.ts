import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

export class HandlerError {

    constructor(
        private readonly _navigate: NavigateFunction,
    ) { }

    public takeError(error: XMLHttpRequest, redirect401: boolean = true) {
        if(error.response.status === 401 && redirect401){
            this._navigate('/')
        }else{
            toast(error.response.data, {
                type: 'error'
            })
        }
    }
}
