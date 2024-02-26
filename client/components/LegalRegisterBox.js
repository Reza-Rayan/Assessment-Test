import { useRouter } from "next/navigation";
import axios from "axios";
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { BaseUrl } from "@/utils/BaseUrl";

const validationSchema = yup.object().shape({
  fullname: yup.string().required("نام و نام خانوادگی فیلد الزامی می باشد"),
  nationalCode: yup
    .string()
    .length(10, "کد ملی باید 10 رقم باشد")
    .matches(/^\d+$/, "کد ملی باید عددی باشد")
    .required("کد ملی فیلد الزامی می باشد"),
  phone: yup
    .string()
    .required("شماره تلفن ثابت فیلد الزامی است")
    .length(11, "شماره تلفن باید ۱۱ رقم باشد")
    .matches(/^\d+$/, "شماره تلفن  باید عددی باشد"),
  mobile: yup
    .string()
    .required("شماره تلفن همراه فیلد الزامی است")
    .min(11, "شماره موبایل باید ۱۱ رقم باشد")
    .max(11, "شماره موبایل باید ۱۱ رقم باشد")
    .matches(/^\d+$/, "شماره موبایل  باید عددی باشد"),

  company: yup.string().required("نام شرکت فیلد الزامی می باشد"),
  experience: yup.string().required("سابقه شرکت فیلد الزامی می باشد."),
});

const LegalRegisterBox = ({ setSnackbarOpen, setSnackbarMessage }) => {
  const router = useRouter();

  const initialValues = {
    fullname: "",
    nationalCode: "",
    phone: "",
    mobile: "",
    company: "",
    experience: "",
  };

  const onSubmit = async (values) => {
    try {
      // Handle  Submission For Legal User Creation | POST API
      await axios.post(`${BaseUrl}/api/legal-users/create`, values);
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
          <label className="text-white " htmlFor="fullname">
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
            className="text-red-500"
          />
        </div>
        <div className="mt-4">
          <label className="text-white mb-2" htmlFor="nationalCode">
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
            className="text-red-500"
          />
        </div>

        <div className="mt-4">
          <label className="text-white mb-2" htmlFor="phone">
            شماره تلفن ثابت
          </label>
          <div className="bg-white rounded-lg mt-2">
            <Field
              type="text"
              name="phone"
              placeholder="شماره تلفن ثابت"
              className="bg-transparent w-full px-3 py-2 rounded-lg"
            />
          </div>
          <ErrorMessage name="phone" component="div" className="text-red-500" />
        </div>

        <div className="mt-4">
          <label className="text-white mb-2" htmlFor="mobile">
            شماره تلفن همراه
          </label>
          <div className="bg-white rounded-lg mt-2">
            <Field
              type="text"
              name="mobile"
              placeholder="شماره تلفن همراه"
              className="bg-transparent w-full px-3 py-2 rounded-lg"
            />
          </div>
          <ErrorMessage
            name="mobile"
            component="div"
            className="text-red-500"
          />
        </div>

        <div className="mt-4">
          <label className="text-white mb-2" htmlFor="company">
            نام شرکت
          </label>
          <div className="bg-white rounded-lg mt-2">
            <Field
              type="text"
              name="company"
              placeholder="نام شرکت"
              className="bg-transparent w-full px-3 py-2 rounded-lg"
            />
          </div>
          <ErrorMessage
            name="company"
            component="div"
            className="text-red-500"
          />
        </div>

        <div className="mt-4">
          <label className="text-white mb-2" htmlFor="experience">
            سابقه
          </label>
          <div className="bg-white rounded-lg mt-2">
            <Field
              type="textt"
              name="experience"
              placeholder="به سال وارد کنید"
              className="bg-transparent w-full px-3 py-2 rounded-lg"
            />
          </div>
          <ErrorMessage
            name="experience"
            component="div"
            className="text-red-500"
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

export default LegalRegisterBox;
