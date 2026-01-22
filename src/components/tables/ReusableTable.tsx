/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";

type Column<T> = {
  header: string;
  accessor: keyof T | string;
  render?: (value: any, row: T) => React.ReactNode;
};

type ReusableTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  caption?: string;
  footer?: React.ReactNode;
};

const ReusableTable = <T,>({
  data,
  columns,
  caption,
  footer,
}: ReusableTableProps<T>) => {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader className="opacity-60">
        <TableRow>
          {columns.map((col, idx) => (
            <TableHead key={idx}>{col.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIdx) => (
          <TableRow key={rowIdx}>
            {columns.map((col, colIdx) => {
              const value = (row as any)[col.accessor];
              return (
                <TableCell key={colIdx}>
                  {col.render ? col.render(value, row) : value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
        {footer && footer}
      </TableBody>
    </Table>
  );
};

export default ReusableTable;
