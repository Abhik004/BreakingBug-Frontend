import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, styled, tableCellClasses, TablePagination } from '@mui/material';
import ButtonHaver from './ButtonHaver'; // Ensure you have this component or import it correctly

const TableTemplate = ({ columns, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <>
      <TableContainer>
        <Table aria-label="sticky table">
          <StyledTableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label} {/* Add column label if you want to display header names */}
              </StyledTableCell>
            ))}
            <StyledTableCell align="center">Actions</StyledTableCell>
          </StyledTableRow>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
      <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <StyledTableCell key={column.id} align={column.align}>
              {column.format && typeof value === 'number'
                ? column.format(value)
                : value}
            </StyledTableCell>
          );
        })}
        <StyledTableCell align="center">
          <ButtonHaver row={row} />
        </StyledTableCell>
      </StyledTableRow>
    ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length} // Assuming rows is an array
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </>
  );
};

export default TableTemplate;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
