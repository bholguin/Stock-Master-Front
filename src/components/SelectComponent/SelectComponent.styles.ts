import {styled} from '@mui/system';
import {Autocomplete} from '@mui/material';

export namespace Styled {
  export const AutocompleteStyled = styled(Autocomplete)({
    'width': '100%',
    '& .MuiInputBase-root': {
      'paddingBottom': '0.5rem',
    },
  });
}
;
