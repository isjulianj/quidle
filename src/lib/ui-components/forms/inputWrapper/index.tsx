import {ReactNode} from "react";
import MaterialFormControl, {FormControlProps} from "@mui/material/FormControl"


interface InputWrapperProps extends FormControlProps {
    children: ReactNode
}

export const InputWrapper = ({children, ...rest}: InputWrapperProps) => {
    return (
        <MaterialFormControl margin='dense' {...rest}>{children}</MaterialFormControl>
    )
}
