/* eslint-disable no-useless-concat */
import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useQuery } from "react-query";
import { useFormik } from "formik";
import { toast, Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [apiError, setApiError] = useState("");

  const headers = {
    authorization: "a2z" + " " + `${localStorage.getItem("userToken")}`,
  };

  async function fetchAdminInfo() {
    return await axios.get(
      `https://a2z-render.onrender.com/admin/getadmininfo`,
      {
        headers: headers,
      }
    );
  }

  async function fetchAllAdmins() {
    return await axios.get(
      `https://a2z-render.onrender.com/admin/getalladmin`,
      {
        headers: headers,
      }
    );
  }

  const {isLoading, data: userInfo } = useQuery("user", fetchAdminInfo, {
    refetchInterval: 10000,
    onError: () => {
      setApiError("Failed to fetch admin info.");
    },
  });

  const { data: allAdmins } = useQuery("admins", fetchAllAdmins, {
    refetchInterval: 1000,
    onError: () => {
      setApiError("Failed to fetch all admins info.");
    },
  });

  const profileSchema = Yup.object().shape({
    userName: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be a positive number")
      .integer("Age must be an integer"),
    image: Yup.mixed().required("Profile picture is required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      age: "",
      image: null,
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("gender", values.gender);
      formData.append("age", values.age);
      formData.append("image", values.image);

      try {
        const { data } = await axios.put(
          "https://a2z-render.onrender.com/admin/updateadminprofile",
          formData,
          { headers: { ...headers, "Content-Type": "multipart/form-data" } }
        );
        console.log(data);
        if (data.message === "Done") {
          formik.resetForm();
          toast.success("Engineer Added successfully!");
          console.log(data);
          setEditMode(false);
        }
      } catch (error) {
        console.error(error);
        setApiError("Failed to update profile.");
      }
    },
  });

  const formatDate = (timestamp) => {
    return timestamp.split("T")[0];
  };

  return (
    <div className="w-100">
       <Toaster toastOptions={{ duration: 4000 }} />
      <div className="admin-profile mt-5">
      {!isLoading ? (
        <div className="container">
          {userInfo?.data?.user ? (
            <div className="row" id="user-profile">
              <div className="col-lg-3 col-md-4 col-sm-12 mb-4 mt-3">
                <div className="main-box left-side-profile">
                  <div className="flex-shrink-0 text-center img-profile p-2">
                    <img
                      src={userInfo.data.user.profilePic.secure_url}
                      alt=""
                      className="img-fluid   "
                      style={{ width: "280px", height: "300px", borderRadius: "10px" }}
                    />
                  </div>
                  <div className="profile-status text-center">
                    {userInfo.data.user.isOnline ? "Online" : "Offline"}
                  </div>
                  <div className="profile-stars text-center">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i> <span>Super User</span>
                  </div>
                  <div className="profile-since text-center">
                    Member since: {formatDate(userInfo.data.user.createdAt)}
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-12">
                <div className="main-box clearfix">
                  <div className="profile-header">
                    <h3>
                      <span>Admin info</span>
                    </h3>
                    {editMode ? (
                      <button
                        type="button"
                        className="btn edit-profile"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        className="btn edit-profile"
                        onClick={() => setEditMode(true)}
                      >
                        <i className="fa fa-pencil-square fa-lg"></i> Edit profile
                      </button>
                    )}
                  </div>
                  {apiError && (
                    <div className="alert alert-danger">{apiError}</div>
                  )}
                  <div className="row profile-user-info">
                    <div className="col-sm-12 profile-user-details">
                      {editMode ? (
                        <form onSubmit={formik.handleSubmit}>
                          <div className="row mb-2 mt-4">
                            <div className="col">
                              <div data-mdb-input-init className="form-outline">
                                <input
                                  type="text"
                                  id="userName"
                                  className="form-control"
                                  placeholder="userName"
                                  {...formik.getFieldProps("userName")}
                                />
                                {formik.touched.userName && formik.errors.userName ? (
                                  <div className="text-danger">
                                    {formik.errors.userName}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col">
                              <div data-mdb-input-init className="form-outline">
                                <input
                                  type="number"
                                  id="age"
                                  className="form-control"
                                  placeholder="age"
                                  {...formik.getFieldProps("age")}
                                />
                                {formik.touched.age && formik.errors.age ? (
                                  <div className="text-danger">
                                    {formik.errors.age}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div data-mdb-input-init className="form-outline mb-2">
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              placeholder="email"
                              {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email ? (
                              <div className="text-danger">
                                {formik.errors.email}
                              </div>
                            ) : null}
                          </div>
                          <div data-mdb-input-init className="form-outline mb-4">
                            <input
                              type="text"
                              id="phoneNumber"
                              className="form-control"
                              placeholder="phoneNumber"
                              {...formik.getFieldProps("phoneNumber")}
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                              <div className="text-danger">
                                {formik.errors.phoneNumber}
                              </div>
                            ) : null}
                          </div>
                          <div data-mdb-input-init className="form-outline mb-4">
                            <input
                              type="text"
                              id="gender"
                              className="form-control"
                              placeholder="gender"
                              {...formik.getFieldProps("gender")}
                            />
                            {formik.touched.gender && formik.errors.gender ? (
                              <div className="text-danger">
                                {formik.errors.gender}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="file"
                              id="image"
                              className="form-control"
                              onChange={(event) => {
                                formik.setFieldValue("image", event.currentTarget.files[0]);
                              }}
                            />
                            {formik.touched.image && formik.errors.image ? (
                              <div className="text-danger">
                                {formik.errors.image}
                              </div>
                            ) : null}
                          </div>
                          <button type="submit" className="btn edit-profile">
                            Save
                          </button>
                        </form>
                      ) : (
                        <div className="px-3">
                          <div className="profile-user-details clearfix ">
                            <div className="profile-user-details-label">Name</div>
                            <div className="profile-user-details-value">
                              {userInfo.data.user.userName}
                            </div>
                          </div>
                          <div className="profile-user-details clearfix">
                            <div className="profile-user-details-label">Email</div>
                            <div className="profile-user-details-value">
                              {userInfo.data.user.email}
                            </div>
                          </div>
                          <div className="profile-user-details clearfix">
                            <div className="profile-user-details-label">Phone</div>
                            <div className="profile-user-details-value">
                              {userInfo.data.user.phoneNumber}
                            </div>
                          </div>
                          <div className="profile-user-details clearfix">
                            <div className="profile-user-details-label">Gender</div>
                            <div className="profile-user-details-value">
                              {userInfo.data.user.gender}
                            </div>
                          </div>
                          <div className="profile-user-details clearfix">
                            <div className="profile-user-details-label">Age</div>
                            <div className="profile-user-details-value">
                              {userInfo.data.user.age}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12">
                    <div className="profile-header">
                      <h3>
                        <span>Activation</span>
                      </h3>
                    </div>
                    <div className="table-responsive mb-1" style={{ height: "75vh" }}>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Profile Picture</th>
                            <th>Name</th>
                            <th>PhoneNumber</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allAdmins?.data?.admin?.map((admin) => (
                            <tr key={admin._id}>
                              <td>
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" 
                                  className="rounded-circle"
                                  style={{ width: "40px" }}
                                  alt="Avatar"
                                />
                              </td>
                              <td>{admin.userName}</td>
                              <td>{admin.phoneNumber}</td>
                              <td className="profile-status">{admin.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>No user data available</div>
          )}
        </div>
         ) : (
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <BeatLoader color="#262152" margin={4} size={40} />
          </div>
        )}
      </div>
    </div>
  );
}
