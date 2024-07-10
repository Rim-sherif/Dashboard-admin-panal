import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import  { useState } from 'react';
import { useNavigate } from "react-router-dom";
import OtpInput from 'react18-input-otp';
import img from '../../assets/images/images/image_processing20200908-23070-1areanr 1.jpg';
import { useFormik } from 'formik';
import axios from "axios";
import * as Yup from 'yup'
import {UserContext} from '../context/userToken'


export default function Otp() {
  let {setUserToken} = useContext(UserContext)
  let navigate = useNavigate()
  const [apiError, setApiError] = useState('');
  const phoneNumber = localStorage.getItem('phoneNumber');

  const validationSchema = Yup.object({
    OTP: Yup.string().required('OTP is required'),
  });

  const formik = useFormik({
    initialValues: {
      OTP: '',
      phoneNumber: phoneNumber || '',
    },
    onSubmit: OtpCode,
    validationSchema,
  });

  async function OtpCode(values) {
   
    try {
      let {data} = await axios.post("https://a2z-render.onrender.com/admin/OTP", values);
      console.log(data);
      if (data.message === 'loggin Done') {
        navigate('/maincomponat')
        localStorage.setItem('userToken',data.adminUpdated.token)
        setUserToken(localStorage.setItem('userToken'))
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('An error occurred while processing your request.');
      }
    }
  }

  return (
    <div className="admin-login py-5" id='ootp'>
      
  <div className="">
    <div className="row">
      <div className="col-lg-6">
        <div className="admin-login-form text-center">
          <h1>welcome to our commuinty</h1>
          <img className="img1"  src={img} alt=""></img>
          <h2>OTP Verification</h2>
          <p className="py-3">
            We have sent you access code via SMS for Mobile
            Verification.
          </p>
        
        <form action="" onSubmit={formik.handleSubmit}>
        <div className="otp-number d-flex justify-content-center gx-2" >
        {apiError ? <div className="alert alert-danger ">{apiError}</div>
          : ""}
           <OtpInput className="otp-input mx-2" value={formik.values.OTP} onChange={(otp) => formik.setFieldValue('OTP', otp)}   numInputs={6} />
           {formik.errors.OTP && formik.touched.OTP ? <div className='alert alert-danger py-2'>{formik.errors.OTP}</div> : ""}

          </div>

          <div className="d-grid my-5 col-6 mx-auto">
            <button className="btn admin-btn" type="submit"
             >Verify</button>
          </div>


          {/* <button type='submit' disabled={!(Formik.isValid && Formik.dirty)} className='btn btn-success mt-3'>Register</button> */}
        </form>
          {/* <Link to="/navbar" className='Link'> */}
          
          {/* </Link> */}
          <p className="my-1">Didn’t Received the OTP?</p>
          <Link href="#" className="text-decoration-none ">Resend Code</Link>
        </div>
      </div>
      <div className="col-lg-6">
        <img
          src={img}
          className="w-100 mt-4"
          alt=""
        />
      </div>
    </div>
  </div>
</div>
  );
}
