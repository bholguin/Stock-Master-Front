import { FC, useMemo } from "react"
import { Login, LoginScreenStore } from "../../../screens/login"
import { ValidatorServices } from "services/validator"
import { useNavigate } from "react-router-dom"

const LoginPage: FC = () => {
    const navigate = useNavigate()
    const validate = useMemo(() => new ValidatorServices(), [])
    const store = useMemo(() => new LoginScreenStore(
        validate,
        navigate
    ), [validate, navigate])
    
    return (
        <Login store={store}/>
    )
}

export default LoginPage