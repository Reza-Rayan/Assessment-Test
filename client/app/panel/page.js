"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCookies } from "react-cookie";
import { BaseUrl } from "@/utils/BaseUrl";

// MUI Components
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  TablePagination,
  IconButton,
  Stack,
  Pagination,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

// Customized components
import TableHeadComponent from "@/components/TableHeadComponent";
import TableRowComponent from "@/components/TableRowComponent";
import PanelHeader from "@/components/PanelHeader";

export default function AccessibleTable() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [loading, setLoading] = useState(true);

  const [cookies] = useCookies(["accessToken"]);
  const router = useRouter();

  // Fetch Data of Admin from local storage
  const username =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("username")
      : null;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/api/real-users?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      );
      setData(response.data.data.items);
      setTotalDocs(response.data.data.totalDocs);
      setTotalPages(response.data.data.totalPages);
      setPage(response.data.data.page);
      setLoading(false); // Set loading to false after data is fetched
      console.log(response.data.data.page);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Pagination Handler
  const handleNextPage = (event, newPage) => {
    if (totalPages < page + 1) {
      return;
    }
    setPage(page + 1);
  };

  // Previous Page Handler
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(page);
  };

  useEffect(() => {
    if (!cookies.accessToken) {
      router.push("/login");
    }
    console.log(data);
  }, [cookies.accessToken, router]);

  if (!cookies.accessToken || loading) {
    return <div>Loading...</div>;
  }

  // Check Cookie for being in page
  if (!cookies.accessToken) {
    router.push("/login");
  }

  return (
    <div className="w-[70%] mx-auto">
      <PanelHeader username={username} />
      <TableContainer
        component={Paper}
        className=" mx-auto mt-20 rounded-lg min-h-[650px] flex flex-col justify-between"
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableHeadComponent />
          </TableHead>
          <TableBody className="overflow-y-hidden">
            {data.map((row, index) => (
              <TableRowComponent
                key={index}
                index={index}
                fullname={row.fullname}
                nationalCode={row.nationalCode}
                age={row.age}
                score={row.score}
              />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalDocs}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleNextPage}
          className="px-5"
          nextIconButtonProps={{ disabled: page >= totalPages }}
          backIconButtonProps={{ disabled: page <= 1 }}
          ActionsComponent={() => (
            <div className="flex ">
              <IconButton
                className="rotate-180"
                onClick={handlePrevPage}
                disabled={page <= 1}
              >
                <KeyboardArrowLeft />
              </IconButton>
              <IconButton
                className="rotate-180"
                onClick={handleNextPage}
                disabled={page >= totalPages}
              >
                <KeyboardArrowRight />
              </IconButton>
            </div>
          )}
        />
      </TableContainer>
    </div>
  );
}
