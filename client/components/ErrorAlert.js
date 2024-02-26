import React from "react";

// MUI Components
import { Snackbar, Alert } from "@mui/material";
const ErrorAlert = ({ snackbarOpen, handleSnackbarClose, snackbarMessage }) => {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity="error"
        sx={{ fontFamily: "vazirmatn , sans-serif" }}
      >
        <span className="mx-3 ">{snackbarMessage}</span>
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
