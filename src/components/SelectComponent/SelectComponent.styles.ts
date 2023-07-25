import {styled} from '@mui/system';
import {Autocomplete} from '@mui/material';

export namespace Styled {
  export const AutocompleteStyled = styled(Autocomplete)({
    'width': '100%',
    '& .MuiInputBase-root': {
      'padding': '0',
      '& .MuiAutocomplete-input': {
        'padding': '0',
      },
    },
  });
}
;
