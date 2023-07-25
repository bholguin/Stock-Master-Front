import {FC} from 'react';
import {MUIStyledCommonProps, Theme} from '@mui/system';
import {ISelectComponent} from './SelectComponent.interfaces';
import {Styled} from './SelectComponent.styles';
import { InputText } from 'components/InputText';

export const SelectComponent: FC<ISelectComponent & MUIStyledCommonProps<Theme>> = (props) => {
  const {options, renderInput, placeholder, id, className} =props;
  return (
    <Styled.AutocompleteStyled
      {...props}
      id={id}
      options={options}
      renderInput={renderInput ?
        renderInput :
        (params) => <InputText
          {...params}
          className={className}
          placeholder={placeholder}
        />}
    />
  );
};
