import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from ".././../assets/images/images/image_processing20200908-23070-1areanr 1 (1).jpg";
import icon from "../../assets/images/icons/egypt 1.png";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

export default function Login() {
  let navigate = useNavigate();
  let [apiError, setapiError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  let validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required("phone is required")
      .matches(/^01[0-5]\d{1,8}$/, "phone is not correct"),
  });

  let formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    onSubmit: getCodeApi,
    validationSchema,
  });

  async function getCodeApi(value) {
    setLoading(true);
    let req = await axios
      .post("https://a2z-render.onrender.com/admin/phonenumber", value)
      .catch((err) => {
        setapiError(err.response.data.message);
      });
    console.log(req);
    if (req.data.message === "OTP sended") {
      console.log(req);
      localStorage.setItem("phoneNumber", value.phoneNumber);
      setPhoneNumber(value.phoneNumber);
      setLoading(false);
      navigate("/otp");
    }
  }

  return (
    <>
      <div className="admin-login py-5 bg-white" id="loginn">
        <div className="">
          <div className="row ">
            <div className="col-lg-6">
              <div className="admin-phone text-center">
                <h1>welcome to our commuinty</h1>

                <img className="img1" src={img} alt=""></img>

                <h2>Verify your number</h2>
                <p className="py-3">
                  Please enter your mobile number to receive verification code.
                </p>

                <div className="">
                  {apiError ? (
                    <div className="alert alert-danger w-100 ">{apiError}</div>
                  ) : (
                    ""
                  )}
                  <form action="" onSubmit={formik.handleSubmit}>
                    <div className="input-group mb-1">
                      <div className=" m-2  ">
                        <img src={icon} alt="Icon" className="icon" />
                      </div>
                      <input
                        type="tel"
                        className={`form-control m-2 rounded-pill `}
                        placeholder="+201XXX XXX38"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      {formik.errors.phoneNumber &&
                      formik.touched.phoneNumber ? (
                        <div className="alert alert-danger py-2">
                          {formik.errors.phoneNumber}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="d-grid my-4 col-6 mx-auto">
                      <button
                        className="btn admin-btn position-relative "
                        type="submit"
                      >
                        Get OTP
                      </button>
                      {loading && (
                        <div className="spinner-container">
                          <div className="spinner"></div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={img} alt="" className="w-100" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
