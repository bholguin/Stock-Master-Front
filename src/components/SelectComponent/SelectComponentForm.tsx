/* eslint-disable @typescript-eslint/no-explicit-any */
import {FC, SyntheticEvent} from 'react';
import {Control, Controller, ControllerFieldState, ControllerRenderProps, UseFormStateReturn} from 'react-hook-form';
import {AutocompleteChangeDetails, AutocompleteChangeReason} from '@mui/material';
import {SelectComponent} from './SelectComponent';
import {ISelectComponent} from './SelectComponent.interfaces';
import { InputText } from 'components/InputText';

interface ISelectComponentForm extends ISelectComponent {
    control: Control<any>
    rules?: any
    name: string
    id?: string
}

export const SelectComponentForm: FC<ISelectComponentForm> = (props) => {
  const {options, control, rules, name, id, placeholder, label, onChange, groupBy, disabled, className} = props;

  const SelectComponentRender = ({field, fieldState, formState}: {
        field: ControllerRenderProps<any, string>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<any>;
    }) => {
    return (
      <SelectComponent
        id={id}
        value={field.value}
        options={options}
        groupBy={groupBy}
        disabled={disabled}
        getOptionLabel = {(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value }
        onChange={(event: SyntheticEvent<Element, Event>, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any>) => {
          onChange && onChange(event, value, reason, details);
          field.onChange(value);
        }}
        renderInput={
          (params) => <InputText
            {...params}
            label={label}
            className={className}
            placeholder={placeholder}
            helperText={fieldState.error?.message}
            error={!!(fieldState.error)}
          />
        }
      />
    );
  };

  return <Controller
    name={name}
    control={control}
    rules={rules}
    render={SelectComponentRender}
  />;
};
