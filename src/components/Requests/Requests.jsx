/* eslint-disable no-useless-concat */

import React, { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useQuery } from "react-query";


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
          toast.success("Engineer Added successfully!");
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
          <Toaster toastOptions={{ duration: 4000 }} />
          <form onSubmit={formik.handleSubmit}>
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

export default function Requests() {
  const [modalShow2, setModalShow2] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [orderInput, setOrderInput] = useState({
    id: "",
    customerName: "",
    productName: "",
    quantity: "",
    price: "",
    status: "",
  });

  // eslint-disable-next-line no-unused-vars
  const [apiError, setApiError] = useState("");
  const headers = {
    authorization: "a2z " + localStorage.getItem("userToken"),
  };

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      setCategories(categories);

      const orders = await fetchOrders();
      setOrders(orders);
    };

    fetchData();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (categoryInput) {
      try {
        const response = await axios.post(
          "https://a2z-render.onrender.com/admin/addcategory",
          { name: categoryInput },
          { headers }
        );

        if (response.data.message === "Added Done") {
          setCategories([...categories, { name: categoryInput }]);
          setCategoryInput("");
          toast.success("Category added successfully!");
        } else {
          setApiError("Failed to add category.");
        }
      } catch (error) {
        setApiError("Failed to add category.");
      }
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(categories.filter((category) => category.name !== categoryToDelete.name));
  };

  async function fetchcountClients() {
    return await axios.get(`https://a2z-render.onrender.com/admin/getengcount`, { headers });
  }

  const {
    data: userData,
    // eslint-disable-next-line no-unused-vars
    isError: isUserError,
  } = useQuery("user", fetchcountClients, {
    refetchInterval: 1000,
    onError: () => {
      setApiError("Failed to fetch user count.");
    },
  });

  async function fetchcountMoneyCollect() {
    return await axios.get(`https://a2z-render.onrender.com/admin/subtotal`, { headers });
  }

  const {
    data: moneyData,
    // eslint-disable-next-line no-unused-vars
    isError: isMoneyError,
  } = useQuery("money", fetchcountMoneyCollect, {
    refetchInterval: 1000,
    onError: () => {
      setApiError("Failed to fetch money.");
    },
  });

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://a2z-render.onrender.com/admin/get', { headers });
      return response.data.Categories.map(category => ({
        id: category._id,
        name: category.name
      }));
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://a2z-render.onrender.com/admin/getallorder', { headers });
      console.log(response)
      return response.data.order.map(order => ({
        id: order._id,
        customerName: order.userId,
        productName: order.products[0]?.title || 'N/A',
        quantity: order.products[0]?.quantity || 'N/A',
        price: order.products[0]?.price || 'N/A',
        status: order.orderStatus
      }));
      
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      return [];
    }
  };

  return (
    <div className="requests w-100">
      <div className="container p-3">
        <h4 className="mt-3">Dashboard</h4>

        <div className="row mt-5 p-2">
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="tm-block-card1">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        Today's Users
                      </p>
                      {userData && userData.data ? (
                        <h5 className="font-weight-bolder">
                          +{userData.data.count ? userData.data.count : "0"}
                        </h5>
                      ) : (
                        <div>30</div>
                      )}
                      <p className="mb-0">
                        <span className="text-success text-sm font-weight-bolder">
                          +3%
                        </span>
                        since last week
                      </p>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape1 bg-gradient-warning shadow-warning text-center rounded-circle d-flex align-items-center justify-content-center">
                      <i
                        className="fa-solid fa-earth-americas fa-lg opacity-10"
                        style={{ color: "#ffffff" }}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="tm-block-card1">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        New Clients
                      </p>
                      <h5 className="font-weight-bolder">+3,462</h5>
                      <p className="mb-0">
                        <span className="text-danger text-sm font-weight-bolder">
                          -2%
                        </span>
                        since last quarter
                      </p>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape2 bg-gradient-warning shadow-warning text-center rounded-circle d-flex align-items-center justify-content-center">
                      <i
                        className="fa-solid fa-newspaper fa-lg opacity-10"
                        style={{ color: "#ffffff" }}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="tm-block-card1">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        Sales
                      </p>
                      {moneyData && moneyData.data ? (
                        <h5 className="font-weight-bolder">${moneyData.data.subtotals ? moneyData.data.subtotals : "0"}</h5>
                      ) : (
                        <div>$103,430</div>
                      )}
                      <p className="mb-0">
                        <span className="text-success text-sm font-weight-bolder">
                          +5%
                        </span>
                        than last month
                      </p>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape3 bg-gradient-warning shadow-warning text-center rounded-circle d-flex align-items-center justify-content-center">
                      <i
                        className="fa-solid fa-cart-shopping fa-lg opacity-10"
                        style={{ color: "#ffffff" }}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3 p-2">
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
            <div className="tm-block-card py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center mt-2">
                  <div className="col-8">
                    <div className="text-xs h5 font-weight-bold text-uppercase">
                      New Requests
                    </div>
                  </div>
                  <div className="col-4 text-end d-flex">
                    <i className="fas fa-comments fa-2x text-gray-300 io"></i>
                    <span className="badge rounded-pill badge-notification bg-danger io-dan">
                      1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
            <div className="tm-block-card py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center mt-2">
                  <div className="col-8">
                    <div className="text-xs h5 font-weight-bold text-uppercase mb-1">
                      Create Report
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <i className="fas fa-download fa-2x io"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
            <div className="tm-block-card py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center mt-2">
                  <div className="col-8">
                    <div className="text-xs h5 font-weight-bold text-uppercase mb-1">
                      Add Engineer
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <button
                      className="io bg-white"
                      onClick={() => setModalShow2(true)}
                    >
                      <i className="fa-solid fa-circle-plus fa-2x"></i>
                    </button>
                    <MyVerticallyCenteredModal2
                      show={modalShow2}
                      onHide={() => setModalShow2(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
            <div className="tm-block-card py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center mt-2">
                  <div className="col-8">
                    <div className="text-xs h5 font-weight-bold text-uppercase mb-1">
                      Reports
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <i className="fas fa-user-cog fa-2x io"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row p-3">
          <div className="col-lg-12">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <h2 className="tm-block-title d-inline-block">
                Categories
              </h2>
              <form className="d-flex">
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="form-control"
                  placeholder="Add new category"
                />
                <button
                  className="btn btn-add ms-3"
                  onClick={handleAddCategory}
                >
                  Add
                </button>
              </form>
              <div className="table-responsive">
                <table className="table table-hover table-striped mt-3 ">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{category.name}</td>
                        <td>
                          <button
                            className="btn btn-req2 btn-sm"
                            onClick={() => handleDeleteCategory(category)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="row p-3">
          <div className="col-lg-12">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <h2 className="tm-block-title d-inline-block">
                Orders
              </h2>
              <div className="table-responsive">
                <table className="table table-hover table-striped mt-3">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer Name</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{order.customerName}</td>
                        <td>{order.productName}</td>
                        <td>{order.quantity}</td>
                        <td>{order.price}</td>
                        <td>{order.status}</td>
                        <td>
                          <button
                            className="btn btn-req1 btn-sm me-2"
                            onClick={() => setOrderInput(order)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-req2 btn-sm"
                            onClick={() => setOrders(orders.filter((o) => o !== order))}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}