import React from "react";

// MUI Components
import { Snackbar, Alert } from "@mui/material";

const SuccessAlert = ({ successSnack, handleSnackbarClose }) => {
  return (
    <Snackbar
      open={successSnack}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity="success"
        sx={{ fontFamily: "vazirmatn, sans-serif" }}
      >
        <span className="mx-4">ورود شما موفقیت آمیز است</span>
      </Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
