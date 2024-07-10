import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal(props) {
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
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
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
      centered
    >
      <Modal.Body>
        <div>
          {apiError && <div className="alert alert-danger">{apiError}</div>}
          <form onSubmit={formik.handleSubmit}>
            <div className="row g-3 px-3 add-form">
              <div className="col-12 py-2 text-end">
                <button
                  className="btn btn-close "
                  onClick={props.onHide}
                ></button>
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
              <div className="col-12 py-2 text-center">
                <button
                  className="btn btn-save shadow"
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
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default function Clients() {
  const [modalShow, setModalShow] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");

  const headers = {
    authorization: "a2z" + " " + `${localStorage.getItem("userToken")}`,
  };

  const fetchData = () => {
    fetch("https://a2z-render.onrender.com/admin/getalluser", { headers: headers })
      .then(response => response.json())
      .then(json => {
        if (json.user && Array.isArray(json.user)) {
          setUsers(json.user);
          localStorage.setItem('users', JSON.stringify(json.user));
        } else {
          console.error('API response does not contain a user array:', json);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch initially on component mount

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000); // Fetch every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const deleteUser = id => {
    fetch(`https://a2z-render.onrender.com/admin/deleteuser/${id}`, {
      method: "DELETE",
      headers: headers
    })
      .then(response => response.json())
      .then(() => {
        const updatedUsers = users.filter(item => item._id !== id);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        toast.success("User deleted successfully", { autoClose: 3000 });
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        toast.error("Error deleting user", { autoClose: 3000 });
      });
  };

  const handleGridView = () => setViewMode("grid");
  const handleListView = () => setViewMode("list");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="client-section w-100">
        <ToastContainer />
        <div className="container p-5">
          <div className="main-sec">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <h2 className="fst">Client List</h2>
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
                {filteredUsers.map(user => (
                  <div key={user._id} className="col-lg-4 col-md-6 div-hov">
                    <div className="req-item shadow p-3 mt-5">
                      <div className="d-flex justify-content-between">
                        <div className="col-md-10">
                          <ul className="fa-ul">
                            <li className="py-1">
                              <span className="fa-li">
                                <i className="fa-solid fa-user"></i>
                              </span>
                              {user.userName}
                            </li>
                            <li className="py-1">
                              <span className="fa-li">
                                <i className="fa-solid fa-phone"></i>
                              </span>
                              {user.status}
                            </li>
                            <li className="py-1">
                              <span className="fa-li">
                                <i className="fa-solid fa-envelope"></i>
                              </span>
                              {user.email}
                            </li>
                          </ul>
                        </div>
                        <div className="edit col-md-2">
                          <button
                            className="btn-2 shadow"
                            onClick={() => deleteUser(user._id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="table-responsive px-5 mt-5" style={{ overflowX: "auto" }}>
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
                    {filteredUsers.map(user => (
                      <tr key={user._id}>
                        <td>{user.status}</td>
                        <td>{user._id}</td>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            className="bg-white"
                            style={{ border: "none", outline: "none", color: "red" }}
                            onClick={() => deleteUser(user._id)}
                          >
                            <i className="fa-solid fa-trash"></i>
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

      <button
        className="btn btn-modal shadow"
        onClick={() => setModalShow(true)}
        style={{
          borderRadius: "100px",
          fontSize: "30px",
          position: "fixed",
          bottom: "50px",
          right: "50px",
          width: "60px",
          height: "60px",
          backgroundColor: "#242760",
          color: "#fff",
        }}
      >
        +
      </button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
