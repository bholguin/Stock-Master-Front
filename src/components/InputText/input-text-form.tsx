import { TextFieldProps } from '@mui/material';
import { InputText } from './input-text'
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

type Props<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    inputProps?: TextFieldProps;
    rules?: Omit<RegisterOptions<T, Path<T>>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">
}

export function InputTextForm<T extends FieldValues>(props: Props<T>) {
    const { control, name, inputProps, rules } = props
    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field, formState }) => {
                    console.log(formState.errors[field.name]?.message);

                    return <InputText
                        {...inputProps}
                        error={!!formState.errors[field.name]}
                        value={field.value}
                        helperText={formState?.errors[field.name]?.message as string}
                        onChange={(event) => {
                            inputProps?.onChange && inputProps.onChange(event)
                            field.onChange(event)
                        }}
                    />
                }}
            />
        </>
    )
}

