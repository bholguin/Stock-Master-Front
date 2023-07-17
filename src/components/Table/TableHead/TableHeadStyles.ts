import {styled} from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';

export namespace Styled {
  export const TableHeadStyled = styled(TableHead)(({theme}) => ({
    background: `transparent linear-gradient(268deg, ${theme.palette.primary['200']} 0%, ${theme.palette.grey['100']} 32%, ${theme.palette.primary['200']} 74%, ${theme.palette.primary['200']} 100%) 0% 0% no-repeat padding-box`,
    borderRadius: '4px 4px 0px 0px',
  }));

  export const TableSortLabelStyled = styled(TableSortLabel)({
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '0px',
    textAlign: 'left',
  });
}
