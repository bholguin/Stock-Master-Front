import { useMemo } from "react"
import { useNavigate } from "react-router-dom";
import { ValidateUsername, ValidateUsernameStore } from "screens/login/validate-username"
import { EmpresaServices } from "services/empresa";

export const ValidateUsernamePage = () => {

    const navigate = useNavigate();
    
    const empresa = useMemo(() => new EmpresaServices(
        navigate
    ), [navigate]) 

    const store = useMemo(() => new ValidateUsernameStore(
        navigate,
        empresa
    ), [navigate, empresa])

    return(
        <ValidateUsername store={store}/>
    )
}