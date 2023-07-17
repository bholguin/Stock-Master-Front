import {styled} from '@mui/material';
import {TableContainer, TableRow, TableCell} from '@mui/material';

export namespace StyledBodyTable {
export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const TableContainerStyled = styled(TableContainer)({
  borderRadius: '4px 4px 0px 0px',
});

export const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'white',
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.grey['A100'],
  },
}));

export const StyledTableCell = styled(TableCell)(() => ({
  fontSize: '0.9rem',
  fontWeight: '400',
}));
}
