import { TextField, TextFieldProps } from "@mui/material"
import { Ref, forwardRef } from "react"


export const InputText = forwardRef((props: TextFieldProps, ref: Ref<HTMLDivElement>) => {
    return(
        <TextField
          {...props}
          ref={ref}
          variant="standard"
        />
    )
})