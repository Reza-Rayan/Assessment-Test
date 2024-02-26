"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCookies } from "react-cookie";
import axios from "axios";
import * as yup from "yup";
import { BaseUrl } from "@/utils/BaseUrl";
import {
  TextField,
  FormControl,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  IconButton,
  Button,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import SuccessAlert from "@/components/SuccessAlert";
import ErrorAlert from "@/components/ErrorAlert";

// Validation
const validationSchema = yup.object({
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  password: yup.string().required("رمز عبور الزامی است"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [successSnack, setSuccessSnack] = useState(false);

  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [token, setToken] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const router = useRouter();

  //   Submit Form Handler
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${BaseUrl}/api/auth/login`, values);
      const { token, user } = response.data;
      // Save Data in Local Storage
      if (typeof localStorage !== "undefined") {
        // Access localStorage here
        localStorage.setItem("username", user.username);
      } else {
        // Handle case where localStorage is not available
        console.log("localStorage is not available");
      }
      //   Set Token in Cookie
      setToken(token);
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours
      setCookie("accessToken", token, {
        path: "/",
        secure: true,
        httpOnly: false,
        expires: expirationDate,
      });
      setSuccessSnack(true);
      setTimeout(() => {
        router.push("/panel");
      }, 3000);
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data.message;
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    }
  };

  // Snackbar Handler
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <main className="flex flex-col justify-center items-center mx-auto min-h-screen">
      {/* Error Message */}
      <ErrorAlert
        handleSnackbarClose={handleSnackbarClose}
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
      />
      {/* Success Message */}
      <SuccessAlert
        handleSnackbarClose={handleSnackbarClose}
        successSnack={successSnack}
      />
      <div className="flex flex-col gap-10">
        <h1 className="text-center text-3xl font-semibold">
          ورود به پنل کاربری
        </h1>
        <div className="bg-white rounded-lg p-6 lg:w-[500px] mx-auto">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <Field
                    as={TextField}
                    fullWidth
                    id="email"
                    name="email"
                    label="ایمیل"
                    variant="outlined"
                  />
                  <div className="text-rose-500 text-sm mt-2">
                    <ErrorMessage
                      name="email"
                      className="text-red-500 font-thin text-[12px] mt-2"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <FormControl variant="outlined" fullWidth className="w-full">
                    <InputLabel htmlFor="password">رمز عبـور</InputLabel>
                    <Field
                      as={OutlinedInput}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      startAdornment={
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="رمز عبور"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="start"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <div className="text-rose-500 text-sm mt-2">
                      <ErrorMessage
                        name="password"
                        className="text-red-500 font-thin text-[12px] mt-2"
                      />
                    </div>
                  </FormControl>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outlined"
                    type="submit"
                    fullWidth
                    className="py-3 font-semibold"
                    disabled={isSubmitting}
                  >
                    ورود به پنل
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default Login;
