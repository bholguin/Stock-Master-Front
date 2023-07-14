import { AxiosInterceptor } from "config/axios";
import { FC, useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { ValidateLogin, ValidateLoginStore } from "screens/login/validate-login"
import { AuthServices } from "services/auth";

export const ValidateLoginPage: FC = () => {

    const navigate = useNavigate();
    const location = useLocation()

    const api = useMemo(() => new AxiosInterceptor(
        navigate
    ), [navigate])

    const auth = useMemo(() => new AuthServices(
        api
    ), [api])

    const store = useMemo(() => new ValidateLoginStore(
        navigate,
        auth, 
        location
    ), [navigate, auth, location])

    return (
        <ValidateLogin store={store} />
    )
}

export default ValidateLoginPage