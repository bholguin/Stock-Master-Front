import { LoginPage } from "pages/login/login-page";
import { ValidateUsernamePage } from 'pages/login/validate-username-page'
import { ValidateLoginPage } from 'pages/login/validate-login-page'
import { UsuariosPage } from "pages/usuarios";
import { Route, Routes } from "react-router-dom";
import { Home } from "screens/home";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />}>
                <Route index element={<ValidateUsernamePage />}></Route>
                <Route path="/login" element={<ValidateLoginPage />}></Route>
            </Route>
            <Route path="/usuarios" element={<UsuariosPage />}></Route>
            <Route path="/home" element={<Home />}></Route>
        </Routes>
    )
};
