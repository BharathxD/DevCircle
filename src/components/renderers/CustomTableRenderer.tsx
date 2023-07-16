"use client";

import type { OutputBlockData } from "@editorjs/editorjs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";

const TableHeaderRow = ({ headers }: { headers?: string[] }) => (
  <TableRow>
    {headers?.map((header) => (
      <TableHead key={header}>{header}</TableHead>
    ))}
  </TableRow>
);

const TableRowData = ({ rowData }: { rowData: string[] }) => (
  <TableRow>
    {rowData.map((data, index) => (
      <TableCell key={index}>{data}</TableCell>
    ))}
  </TableRow>
);

const CustomTableRenderer = ({ data }: OutputBlockData) => {
  const [tableHead, ...tableRows] = data.content as string[][];
  return (
    <Table>
      <TableHeader>
        <TableHeaderRow headers={tableHead} />
      </TableHeader>
      <TableBody>
        {tableRows.map((row, index) => (
          <TableRowData key={index} rowData={row} />
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTableRenderer;
