import React from "react";

// MUI Components
import { TableRow, TableCell } from "@mui/material";

const TableRowComponent = ({ index, fullname, nationalCode, age, score }) => {
  return (
    <TableRow key={index} className="px-10 transition-all hover:bg-slate-100 ">
      <TableCell align="right" style={{ fontFamily: "vazirmatn" }}>
        {index + 1}
      </TableCell>
      <TableCell align="right" style={{ fontFamily: "vazirmatn" }}>
        {fullname}
      </TableCell>
      <TableCell align="right" style={{ fontFamily: "vazirmatn" }}>
        {nationalCode}
      </TableCell>
      <TableCell align="right" style={{ fontFamily: "vazirmatn" }}>
        {age}
      </TableCell>
      <TableCell align="right" style={{ fontFamily: "vazirmatn" }}>
        {score}
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
