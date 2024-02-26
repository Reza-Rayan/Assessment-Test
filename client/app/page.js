"use client";
import { useState } from "react";

// MUI Components
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Custom Components
import RealRegisterBox from "@/components/RealRegisterBox";
export default function Home() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Snackbar Handler
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <main className="w-[80%] mx-auto">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="error"
          style={{
            fontFamily: "vazirmatn",
          }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <div className="container mx-auto flex flex-col gap-10 lg:w-[700px] min-h-screen items-center justify-center ">
        <h1 className="text-center vazir-font text-3xl font-black">
          آزمون سنجش میزان ریسک پذیری
        </h1>
        <Box
          sx={{
            border: "1px solid #fff",
            padding: "30px 20px",
            borderRadius: "20px",
          }}
          className="lg:min-w-[700px] min-w-[350px]"
        >
          <RealRegisterBox
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage}
          />
        </Box>
      </div>
    </main>
  );
}
