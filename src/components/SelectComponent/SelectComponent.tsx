import {forwardRef} from 'react';
import {MUIStyledCommonProps, Theme} from '@mui/system';
import {ISelectComponent} from './SelectComponent.interfaces';
import {Styled} from './SelectComponent.styles';
import { InputText } from 'components/InputText';

export const SelectComponent = forwardRef((props: ISelectComponent & MUIStyledCommonProps<Theme>, ref) => {
  const {options, renderInput, placeholder, id, className} =props;
  return (
    <Styled.AutocompleteStyled
      {...props} 
      id={id}
      ref={ref}
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
});
