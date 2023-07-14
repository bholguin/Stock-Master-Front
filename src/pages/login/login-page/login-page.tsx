import { FC, useMemo } from "react"
import { Login, LoginScreenStore } from "../../../screens/login"
import { ValidatorServices } from "services/validator"
import { useNavigate } from "react-router-dom"
import { AxiosInterceptor } from "config/axios"

const LoginPage: FC = () => {

    const navigate = useNavigate()

    const api = useMemo(() => new AxiosInterceptor(
        null,
        false
    ), [])

    const validate = useMemo(() => new ValidatorServices(
        api
    ), [api])

    const store = useMemo(() => new LoginScreenStore(
        validate,
        navigate
    ), [validate, navigate])

    return (
        <Login store={store}/>
    )
}

export default LoginPage