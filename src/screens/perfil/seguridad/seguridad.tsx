import { FC, useState } from "react"
import { SeguridadStore } from "./seguridad-store"
import { Styled } from './styles'
import { HeaderModule } from "components/HeaderModule"
import { InputTextForm } from "components/InputText"
import { useForm } from "react-hook-form"
import PasswordStrengthBar from 'react-password-strength-bar';
import { IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

export type Form = {
    password: string
    newPassword: string
    validatePassword: string
}

type Props = {
    store: SeguridadStore
}

export const Seguridad: FC<Props> = (props) => {
    const { control, handleSubmit, watch, formState: { isValid } } = useForm<Form>({
        mode: 'onChange'
    })

    const [showPass, setShowPass] = useState<boolean>(false)
    const [showPass2, setShowPass2] = useState<boolean>(false)

    const form = watch();

    return (
        <Styled.Content>
            <HeaderModule
                title="Seguridad"
            />
            <Styled.Form onSubmit={handleSubmit(() => { })}>
                <InputTextForm
                    control={control}
                    name="password"
                    rules={{
                        required: "Campo requerido"
                    }}
                    inputProps={{
                        label: "Password",
                        type: showPass ? 'text' : 'password',
                        InputProps: {
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPass(!showPass)}
                                    >
                                        {showPass ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                        }
                    }}
                />
                <Styled.DividerStyled />
                <InputTextForm
                    control={control}
                    name="newPassword"
                    rules={{
                        required: "Campo requerido"
                    }}
                    inputProps={{
                        label: "Nuevo Password",
                        type: showPass2 ? 'text' : 'password',
                        InputProps: {
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPass2(!showPass2)}
                                    >
                                        {showPass2 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                        }
                    }}
                />
                <PasswordStrengthBar
                    password={form.newPassword}
                    minLength={8}
                    shortScoreWord="Weak"
                    barColors={[
                        '#ddd',
                        '#F57C00',
                        '#F57C00',
                        '#2b90ef',
                        '#30d68b',
                    ]}
                />
                <InputTextForm
                    control={control}
                    name="validatePassword"
                    rules={{
                        required: "Campo requerido"
                    }}
                    inputProps={{
                        label: "Repetir Password",
                        type: showPass2 ? 'text' : 'password',
                        InputProps: {
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPass2(!showPass2)}
                                    >
                                        {showPass2 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                        }
                    }}
                />
                <PasswordStrengthBar
                    password={form.validatePassword}
                    minLength={8}
                    shortScoreWord="Weak"
                    barColors={[
                        '#ddd',
                        '#F57C00',
                        '#F57C00',
                        '#2b90ef',
                        '#30d68b',
                    ]}
                />
                <Styled.ButtonContent>
                    <Styled.Button
                        type='submit'
                        variant="contained"
                        disabled={!isValid}
                    >
                        Guardar
                    </Styled.Button>
                </Styled.ButtonContent>
            </Styled.Form>
        </Styled.Content>
    )
}