/* eslint-disable @typescript-eslint/no-explicit-any */
import {ReactNode, SyntheticEvent} from 'react';
import {AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteRenderInputParams} from '@mui/material';

export type SelectItem = {
  label: string;
  value: string;
  group?: string
}

export interface ISelectComponent {
    options: Array<SelectItem>
    value?: any
    placeholder?: string
    id?: string;
    className?: string;
    label?: string;
    disabled?: boolean;
    groupBy?: (option: any) => string
    getOptionLabel?: (option: any) => any
    isOptionEqualToValue?: (option: any, value: any) => boolean
    renderInput?: (params: AutocompleteRenderInputParams) => ReactNode
    onChange?: (event: SyntheticEvent<Element, Event>, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any>) => void
}
