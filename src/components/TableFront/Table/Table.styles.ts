import {styled, TableContainer} from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

export namespace Styled {
  export const Container = styled('div')(({theme}) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),

  }));

  export const TableStyled = styled(Table)({
    marginBottom: '30px',
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

  export const StyledTableCell = styled(TableCell)(({theme}) => ({
    fontSize: '0.9rem',
    padding: `${theme.spacing(0.5)} ${ theme.spacing(1)}`,
  }));

  export const TableBodyStyled = styled(TableBody)({

  });
}
