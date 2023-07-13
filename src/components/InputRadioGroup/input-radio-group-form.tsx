import { RadioGroupProps } from '@mui/material';
import { InputRadioGroup } from './input-radio-group'
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

type Props<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    inputProps?: RadioGroupProps;
    rules?: Omit<RegisterOptions<T, Path<T>>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">
    classNeme?: string
}

export function InputRadioGroupForm<T extends FieldValues>(props: Props<T>) {
    const { control, name, inputProps, rules, classNeme } = props
    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field }) => (
                    <InputRadioGroup
                        {...inputProps}
                        value={field.value}
                        className={classNeme}
                        onChange={(event, value) => {
                            inputProps?.onChange && inputProps.onChange(event, value)
                            field.onChange(event)
                        }}
                    />
                )}
            />
        </>
    )
}

