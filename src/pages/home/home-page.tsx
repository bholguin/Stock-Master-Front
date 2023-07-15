import { FC, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Home, HomeStore } from "screens/home"

const HomePage: FC = () => {
    const navigate = useNavigate()
    const store = useMemo(() => new HomeStore(
        navigate
    ), [navigate])

    return(
        <Home store={store} />
    )
}

export default HomePage