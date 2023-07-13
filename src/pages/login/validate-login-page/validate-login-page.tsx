import { useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { ValidateLogin, ValidateLoginStore } from "screens/login/validate-login"
import { AuthServices } from "services/auth";

export const ValidateLoginPage = () => {

    const navigate = useNavigate();
    const location = useLocation()

    const auth = useMemo(() => new AuthServices(
        navigate
    ), [navigate])

    const store = useMemo(() => new ValidateLoginStore(
        navigate,
        auth, 
        location
    ), [navigate, auth, location])

    return (
        <ValidateLogin store={store} />
    )
}