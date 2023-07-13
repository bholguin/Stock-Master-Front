import { TextField, TextFieldProps } from "@mui/material"
import { FC } from "react"


export const InputText: FC<TextFieldProps> = (props) => {
    return(
        <TextField
          {...props}
          variant="standard"
        />
    )
}