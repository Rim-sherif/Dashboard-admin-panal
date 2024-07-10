import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../../assets/images/images/s4.png";
import { EditableText } from "@blueprintjs/core";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function MyVerticallyCenteredModal2(props) {
  const [apiError, setApiError] = useState("");

  const headers = {
    authorization: "a2z" + " " + `${localStorage.getItem("userToken")}`,
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("User name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.number()
      .required("Age is required")
      .min(18, "Age must be at least 18")
      .max(100, "Age must be at most 100"),
    address: Yup.string().required("Address is required"),
    spicalAt: Yup.string().required("Major is required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      phoneNumber: "",
      gender: "",
      age: "",
      address: "",
      spicalAt: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let { data } = await axios.post(
          "https://a2z-render.onrender.com/admin/addengineer",
          values,
          { headers: headers }
        );

        if (data.message === "Done") {
          console.log(data);
          toast.success("Worker aded successfully", { autoClose: 3000 });
          formik.resetForm();
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setApiError(err.response.data.message);
        } else {
          setApiError("An error occurred while processing your request.");
        }
      }
    },
  });

  return (
    <Modal
      {...props}
      size="s"
      aria-labelledby="contained-modal-title-vcenter"
      className="modal-0"
      centered
    >
      <Modal.Body>
        <div>
          {apiError && <div className="alert alert-danger">{apiError}</div>}
          <form onSubmit={formik.handleSubmit}>
          <ToastContainer />
            <div className="row g-3 px-3 add-form">
              <div className="row py-2 mt-3">
                <div className="col-md-10 text-start">
                  <h5>Add Engineer</h5>
                </div>
                <div className="col-md-2 text-end">
                  <button className="btn-close" onClick={props.onHide}></button>
                </div>
              </div>
              <div className="col-12 py-2">
                <input
                  type="text"
                  className="form-control shadow"
                  placeholder="User name"
                  aria-label="User name"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <div className="alert alert-danger py-2 mt-2">
                    {formik.errors.userName}
                  </div>
                ) : null}
              </div>
              <div className="col-12 py-2">
                <input
                  type="email"
                  className="form-control shadow"
                  placeholder="E-mail"
                  aria-label="E-mail"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="alert alert-danger py-2 mt-2">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="col-12 py-2">
                <input
                  type="password"
                  className="form-control shadow"
                  placeholder="Password"
                  aria-label="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="alert alert-danger py-2 mt-2">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="col-12 py-2">
                <input
                  type="number"
                  className="form-control shadow"
                  placeholder="Phone"
                  aria-label="Phone"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="alert alert-danger py-2 mt-2">
                    {formik.errors.phoneNumber}
                  </div>
                ) : null}
              </div>
              <div className="col-12 py-2">
                <input
                  type="number"
                  className="form-control shadow"
                  placeholder="Age"
                  aria-label="Age"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.age && formik.errors.age ? (
                  <div className="alert alert-danger py-2 mt-2">
                    {formik.errors.age}
                  </div>
                ) : null}
              </div>
              <div className="col-12 py-2">
                <input
                  type="text"
                  className="form-control shadow"
                  placeholder="City"
                  aria-label="City"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="alert alert-danger py-2 mt-2">
                    {formik.errors.address}
                  </div>
                ) : null}
              </div>
              <div className="col-12 py-2">
                <select
                  className="form-control shadow"
                  aria-label="Major"
                  name="spicalAt"
                  value={formik.values.spicalAt}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="Select major" />
                  <option value="Major1" label="Major1" />
                  <option value="Major2" label="Major2" />
                  <option value="Major3" label="Major3" />
                  <option value="Major4" label="Major4" />
                </select>
                {formik.touched.spicalAt && formik.errors.spicalAt ? (
                  <div className="alert alert-danger py-2 mt-2">
                    {formik.errors.spicalAt}
                  </div>
                ) : null}
              </div>
              <div className="col-6 ">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={formik.values.gender === "male"}
                    onChange={formik.handleChange}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
              </div>
              <div className="col-6 ">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={formik.values.gender === "female"}
                    onChange={formik.handleChange}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
              <div className="text-center">
                <div className="d-grid gap-2 d-md-block p-3">
                  <button
                    className="btn px-4 btn-save mx-3 shadow"
                    type="submit"
                    style={{
                      backgroundColor: "#242760",
                      color: "#fff",
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default function Engineer() {
  const [modalShow2, setModalShow2] = React.useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [engineers, setEngineers] = useState(() => {
    const savedEngineers = localStorage.getItem("engineers");
    return savedEngineers ? JSON.parse(savedEngineers) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = engineers.filter(user =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const headers = {
    authorization: "a2z" + " " + `${localStorage.getItem("userToken")}`,
  };

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const response = await axios.get(
          "https://a2z-render.onrender.com/admin/getalleng",
          { headers }
        );
        const { Engs } = response.data;
        if (Array.isArray(Engs)) {
          setEngineers(Engs);
          localStorage.setItem("engineers", JSON.stringify(Engs));
        } else {
          console.error("API response does not contain a valid engineer array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching engineers:", error);
      }
    };

    fetchEngineers();

    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(
          "https://a2z-render.onrender.com/admin/getalleng",
          { headers }
        );
        const updatedEngineers = response.data.Engs;

        if (JSON.stringify(updatedEngineers) !== JSON.stringify(engineers)) {
          setEngineers(updatedEngineers);
          localStorage.setItem("engineers", JSON.stringify(updatedEngineers));
        }
      } catch (error) {
        console.error("Error fetching engineers:", error);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [headers, engineers]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://a2z-render.onrender.com/admin/delete/${id}`, { headers });
      const updatedEngineers = engineers.filter((item) => item._id !== id);
      setEngineers(updatedEngineers);
      localStorage.setItem("engineers", JSON.stringify(updatedEngineers));
      toast.success("Worker deleted successfully", { autoClose: 3000 });
    } catch (error) {
      console.error("Error deleting worker:", error);
      toast.error("Error deleting worker", { autoClose: 3000 });
    }
  };

  const updateUser = async (id) => {
    const engineer = engineers.find((engineer) => engineer._id === id);

    if (!engineer) {
      toast.error("Engineer not found", { autoClose: 3000 });
      return;
    }

    try {
      const response = await axios.put(
        `https://a2z-render.onrender.com/admin/update/${id}`,
        engineer,
        { headers }
      );
      const updatedEngineer = response.data;

      // Fetch the updated list of engineers to ensure consistency
      const fetchResponse = await axios.get(
        "https://a2z-render.onrender.com/admin/getalleng",
        { headers }
      );
      const updatedEngineers = fetchResponse.data.Engs;

      setEngineers(updatedEngineers);
      localStorage.setItem("engineers", JSON.stringify(updatedEngineers));
      toast.success("Engineer updated successfully", { autoClose: 3000 });
    } catch (error) {
      console.error("Error updating engineer:", error);
      toast.error("Error updating engineer", { autoClose: 3000 });
    }
  };

  const onChangeHandler = (id, key, value) => {
    setEngineers((values) => {
      return values.map((item) =>
        item._id === id ? { ...item, [key]: value } : item
      );
    });
  };

  const handleGridView = () => setViewMode("grid");
  const handleListView = () => setViewMode("list");

  return (
    <>
      <div className="client-section w-100">
        <ToastContainer />
        <div className="container p-5">
          <div className="main-sec">
            <div className="add-engineer d-flex justify-content-between">
              <div className="d-flex">
                <h2 className="fst-italic">Workers List</h2>
                <button className="btn-req1 mx-4" type="button" onClick={() => setModalShow2(true)}>
                  +
                </button>
                <MyVerticallyCenteredModal2
                  show={modalShow2}
                  onHide={() => setModalShow2(false)}
                />
              </div>

              <form className="w-25" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </form>
              <div className="col-4 d-flex justify-content-end">
                <div className="d-flex all-s">
                  <div
                    className="dts-s d-flex justify-content-center align-items-center icons-view m-2"
                    onClick={handleListView}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-list"
                    >
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </div>
                  <div
                    className="dts-s d-flex justify-content-center align-items-center icons-view m-2"
                    onClick={handleGridView}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="27"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-grid"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="row" style={{ marginTop: "-10px" }}>
                {filteredUsers.map((engineer) => (
                  <div key={engineer._id} className="col-lg-4 col-md-6 div-hov">
                    <div className="req-item p-3 mt-5 shadow">
                      <div className="d-flex justify-content-between">
                        <ul className="fa-ul">
                          <li className="py-1">
                            <span className="fa-li">
                              <i className="fa-solid fa-user"></i>
                            </span>
                            {engineer.userName}
                          </li>
                          <li className="py-1">
                            <span className="fa-li">
                              <i className="fa-solid fa-phone"></i>
                            </span>
                            {engineer.phoneNumber}
                          </li>
                          <li className="py-1">
                            <span className="fa-li">
                              <i className="fa-solid fa-star"></i>
                            </span>
                            {engineer.spicalAt ? engineer.spicalAt : "none"}
                          </li>
                          <li className="py-1 ">
                            <span className="fa-li">
                              <i className="fa-solid fa-envelope"></i>
                            </span>
                            <EditableText
                              value={engineer.email}
                              onChange={(value) =>
                                onChangeHandler(engineer._id, "email", value)
                              }
                            />
                          </li>
                        </ul>
                        <div className="edit">
                          <button
                            className="btn-1 shadow "
                            onClick={() => updateUser(engineer._id)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            className="btn-2 shadow"
                            onClick={() => deleteUser(engineer._id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                      <div className="product-cell image text-center">
                        <img src={img} className="w-100" alt="" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="table-responsive px-5 mt-5"
                style={{ overflowX: "auto" }}
              >
                <table className="main-table text-center table table-bordered">
                  <thead>
                    <tr className="table-info">
                      <th className="w-25">Status</th>
                      <th className="w-25">Id</th>
                      <th className="w-25">Name</th>
                      <th className="w-25">E-mail</th>
                      <th className="w-25">Action</th>
                    </tr>
                  </thead>
                  <tbody className="vert-align-middle">
                    {filteredUsers.map((engineer) => (
                      <tr key={engineer._id}>
                        <td>{engineer.status}</td>
                        <td>{engineer._id}</td>
                        <td>{engineer.userName}</td>
                        <td>{engineer.email}</td>
                        <td>
                          <button
                            className="bg-white warn"
                            style={{ border: "none", outline: "none" }}
                            onClick={() => deleteUser(engineer._id)}
                          >
                            <i className="fa-solid fa-trash bg-white"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}