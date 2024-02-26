"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import axios from "axios";
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { BaseUrl } from "@/utils/BaseUrl";

const validationSchema = yup.object().shape({
  fullname: yup.string().required("نام و نام خانوادگی الزامی است"),
  nationalCode: yup
    .string()
    .length(10, "کد ملی باید 10 رقم باشد")
    .matches(/^\d+$/, "کد ملی باید عددی باشد")
    .required("کد ملی الزامی است"),
  age: yup
    .number()
    .required("سن الزامی است")
    .min(18, "سن باید حداقل 18 سال باشد")
    .max(100, "سن باید حداکثر 100 سال باشد"),
});

const RealRegisterBox = ({ setSnackbarOpen, setSnackbarMessage }) => {
  const router = useRouter();

  const initialValues = {
    fullname: "",
    nationalCode: "",
    age: "",
  };

  const onSubmit = async (values) => {
    try {
      // Handle Submission For Real User Creation | POST API
      console.log(values);
      console.log(BaseUrl);
      await axios.post(`${BaseUrl}/api/real-users/create`, values).then(() => {
        // Save Name and Age for use in Result page
        localStorage.setItem("fullname", values.fullname);
        localStorage.setItem("age", values.age);
        localStorage.setItem("nationalCode", values.nationalCode);
      });
      router.push("/quiz");
    } catch (error) {
      const errorMessage = error.response.data.message;
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      className="mt-4"
    >
      <Form className="mt-4">
        <div>
          <label className="text-white font-semibold" htmlFor="fullname">
            نام و نام خانوادگی
          </label>
          <div className="bg-white  rounded-lg mt-2">
            <Field
              type="text"
              name="fullname"
              placeholder="نام و نام خانوادگی"
              className="bg-transparent w-full px-3 py-2 rounded-lg"
            />
          </div>
          <ErrorMessage
            name="fullname"
            component="div"
            className="text-red-500 font-thin text-[12px] mt-2"
          />
        </div>
        <div className="mt-4">
          <label
            className="text-white font-semibold mb-2"
            htmlFor="nationalCode"
          >
            کدملی
          </label>
          <div className="bg-white rounded-lg mt-2">
            <Field
              type="text"
              name="nationalCode"
              placeholder="کد ملی (10 رقمی)"
              className="bg-transparent w-full px-3 py-2 rounded-lg"
            />
          </div>
          <ErrorMessage
            name="nationalCode"
            component="div"
            className="text-red-500 font-thin text-[12px] mt-2"
          />
        </div>
        <div className="mt-4">
          <label className="text-white font-semibold mb-2" htmlFor="age">
            سن
          </label>
          <div className="bg-white rounded-lg mt-2">
            <Field
              type="number"
              name="age"
              placeholder="سن"
              className="bg-transparent w-full px-3 py-2 rounded-lg"
            />
          </div>
          <ErrorMessage
            name="age"
            component="div"
            className="text-red-500 font-thin text-[12px] mt-2"
          />
        </div>

        <div className="flex justify-end w-full text-white">
          <button
            type="submit"
            className="bg-yellow-600 px-6 py-3 rounded-lg border  border-yellow-600 transition-all
                 hover:bg-transparent hover:text-yellow-600 mt-4 "
          >
            شروع آزمون
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default RealRegisterBox;
