import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material";

const DEFAULT_MAX_HEIGHT = 440;
const DEFAULT_ROWS_PER_PAGE = 10;

export type TableCellAlign =
  | "center"
  | "inherit"
  | "justify"
  | "left"
  | "right";
export const TABLE_CELL_ALIGN = {
  CENTER: "center",
  INHERIT: "inherit",
  JUSTIFY: "justify",
  LEFT: "left",
  RIGHT: "right",
} as const satisfies Record<string, TableCellAlign>;

export type DataTableHeaderColumn = {
  id: string;
  label: string;
  minWidth?: number;
  align?: TableCellAlign;
  format?: (value: number) => string;
};

export type DataTableHeaderColumns = DataTableHeaderColumn[];

export type DataTableRow = {
  [key: string]: string | number;
};

export type DataTableRows = DataTableRow[];

export type DataTableProps = {
  maxHeight?: number;
  ariaLabel?: string;
  headers: DataTableHeaderColumns;
  rows: DataTableRows;
};

export const DataTable: React.FC<DataTableProps> = ({
  maxHeight = DEFAULT_MAX_HEIGHT,
  ariaLabel,
  headers,
  rows,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const theme = useTheme();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight }}>
        <Table
          stickyHeader
          aria-label={ariaLabel}
          style={{
            backgroundColor: theme.palette.background.default,
            border: `2px solid ${theme.palette.divider}`,
          }}
        >
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header.id}
                  align={header.align}
                  style={{ minWidth: header.minWidth }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  {headers.map((header) => {
                    const value = row[header.id];
                    return (
                      <TableCell key={header.id} align={header.align}>
                        {header.format ? header.format(value as number) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
