import axios from "axios";
import { action, makeObservable, observable } from 'mobx'
import { makePersistable } from "mobx-persist-store";
import { NavigateFunction } from "react-router-dom";

type Credentials = {
    username: string;
    password: string
}

export class AuthStore {
    @observable 
    public token: string = ''

    constructor(
        private readonly navigate: NavigateFunction
    ) {
        makeObservable(this)
        makePersistable(this, {
            name: 'auth',
            properties: ['token'],
            storage: window.sessionStorage,
          });
    }

    @action
    public async login(data: Credentials) {
        try{
            const response = await axios({
                method: 'post',
                url: '/login',
                data
            });
            this.token = response.data.token
           // this.navigate('/empresa')
        }catch(error){
            this.token= ''
        }
    }

    @action
    public async empresas_by_username(username: string) {
        try{
            const response = await axios({
                method: 'get',
                url: `/empresas`,
            });
            this.token = response.data.token
           // this.navigate('/empresa')
        }catch(error){
            this.token= ''
        }
    }
}