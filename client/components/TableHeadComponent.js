import React from "react";

import { TableRow, TableCell } from "@mui/material";

const TableHeadComponent = () => {
  return (
    <TableRow className="bg-slate-500 p-4">
      <TableCell
        align="right"
        style={{ fontFamily: "vazirmatn", color: "#ffffff" }}
      >
        شماره
      </TableCell>
      <TableCell
        align="right"
        style={{ fontFamily: "vazirmatn", color: "#ffffff" }}
      >
        نام و نام خانوادگی
      </TableCell>
      <TableCell
        align="right"
        style={{ fontFamily: "vazirmatn", color: "#ffffff" }}
      >
        کدملی
      </TableCell>
      <TableCell
        align="right"
        style={{ fontFamily: "vazirmatn", color: "#ffffff" }}
      >
        سن
      </TableCell>
      <TableCell
        align="right"
        style={{ fontFamily: "vazirmatn", color: "#ffffff" }}
      >
        امتیاز
      </TableCell>
    </TableRow>
  );
};

export default TableHeadComponent;
