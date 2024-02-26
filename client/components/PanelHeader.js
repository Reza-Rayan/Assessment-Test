import React from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

// MUI Components
import { Box, Typography, Button } from "@mui/material";

const PanelHeader = ({ username }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const router = useRouter();
  // Logout Handler Fn
  const logoutHandler = () => {
    setTimeout(() => {
      localStorage.removeItem("username");
      removeCookie("accessToken");
      router.push("/login");
    }, 500);
  };

  return (
    <Box
      sx={{ margin: "20px 0", color: "#ffffff" }}
      className="flex justify-between items-center"
    >
      <Typography style={{ fontFamily: "vazirmatn" }}>
        {username} عزیز خوش آمدید
      </Typography>
      <button
        className="bg-yellow-600 px-4 py-2 rounded-lg border  border-yellow-600 transition-all
                 hover:bg-transparent hover:text-yellow-600  "
        onClick={logoutHandler}
      >
        خروج
      </button>
    </Box>
  );
};

export default PanelHeader;
