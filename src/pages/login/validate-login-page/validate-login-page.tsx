import { FC, useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { ValidateLogin, ValidateLoginStore } from "screens/login/validate-login"
import { AuthServices } from "services/auth";

export const ValidateLoginPage: FC = () => {

    const navigate = useNavigate();
    const location = useLocation()

    const auth = useMemo(() => new AuthServices(), [])

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