import React from "react";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Select from "react-select";

function MyVerticallyCenteredModal(props) {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedCoverImage, setSelectedCoverImage] = useState("");

  const handleImageChange = (e) => {
    formik.setFieldValue('images', Array.from(e.target.files));
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleCoverImageChange = (e) => {
    formik.setFieldValue('imageCover', e.target.files[0]);
    setSelectedCoverImage(URL.createObjectURL(e.target.files[0]));
  };

  const headers = {
    authorization: "a2z" + " " + `${localStorage.getItem("userToken")}`,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    desc: Yup.string().required("Description is required"),
    colors: Yup.array().of(Yup.string()).required("Colors are required"),
    sizes: Yup.array().of(Yup.string()).required("Sizes are required"),
    price: Yup.number().required("Price is required"),
    appliedDiscount: Yup.number().required("Applied discount is required"),
    stock: Yup.number().required("Stock is required"),
    name: Yup.string().required("Category name is required"),
    imageCover: Yup.mixed().required("Cover image is required"),
    images: Yup.array().min(1, "At least one image is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      colors: [],
      sizes: "",
      price: "",
      appliedDiscount: "",
      stock: "",
      name: "",
      imageCover: null,
      images: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('desc', values.desc);
      formData.append('colors', JSON.stringify(values.colors));
      formData.append('sizes', JSON.stringify(values.sizes));
      formData.append('price', values.price);
      formData.append('appliedDiscount', values.appliedDiscount);
      formData.append('stock', values.stock);
      formData.append('name', values.name);
      formData.append('imageCover', values.imageCover);
      values.images.forEach((image, index) => formData.append(`images[${index}]`, image));

      try {
        const res = await axios.post("https://a2z-render.onrender.com/admin/addproduct", formData, {
          headers: { headers },
        });
        if(res.data.message === "Done"){
        toast.success(res.data.message);
        formik.resetForm();
        }else{
          console.log(res)
        }
      } catch (error) {
        console.error("Error response:", error.response); // Log the error response
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      }
    },
  });

  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "black", label: "Black" },
    { value: "orange", label: "Orange" },
    { value: "yellow", label: "Yellow" },
  ];

  const categoryOptions = [
    { value: "bathrooms", label: "Bathrooms" },
    { value: "bedRooms", label: "BedRooms" },
    { value: "furniture", label: "Furniture" },
    { value: "decoration", label: "Decoration" },
    { value: "kitchen", label: "Kitchen" },
    { value: "livingRoom", label: "Living Room" },
  ];

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      className="modal-0"
      centered
    >
      <Modal.Body>
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <form onSubmit={formik.handleSubmit}>
            <div className="addproduct mb-3 col-12">
              <div className="row">
                <div className="col-xl-12 col-lg-10 col-md-12 col-sm-12 mx-auto">
                  <div className="tm-bg-primary-dark tm-block-h-auto">
                    <div className="row">
                      <div className="col-12">
                        <h3 className="text-titel-top text-center mb-3">
                          Add Product
                        </h3>
                        <hr />
                      </div>
                    </div>
                    <div className="row tm-edit-product-row">
                      <div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="form-group mb-3">
                          <label className="font-color" htmlFor="title">
                            Product Title
                          </label>
                          <input
                            id="title"
                            name="title"
                            type="text"
                            className="form-control validate"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="font-color" htmlFor="desc">
                            Description
                          </label>
                          <textarea
                            id="desc"
                            name="desc"
                            className="form-control validate"
                            rows="3"
                            onChange={formik.handleChange}
                            value={formik.values.desc}
                            required
                          ></textarea>
                        </div>
                        <div className="form-group mb-3">
                          <label className="font-color" htmlFor="category">
                            Category
                          </label>
                          <select
                            id="category"
                            name="name"
                            className="form-control validate mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            required
                          >
                            <option value="" label="Select category" />
                            {categoryOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="row">
                          <div className="form-group mb-3 col-xs-12 col-sm-6">
                            <label className="font-color" htmlFor="sizes">
                              Sizes
                            </label>
                            <input
                              id="sizes"
                              name="sizes"
                              type="text"
                              className="form-control validate"
                              onChange={formik.handleChange}
                              value={formik.values.sizes}
                              required
                            />
                          </div>
                          <div className="form-group mb-3 col-xs-12 col-sm-6">
                            <label className="font-color" htmlFor="stock">
                              Units In Stock
                            </label>
                            <input
                              id="stock"
                              name="stock"
                              type="number"
                              className="form-control validate"
                              onChange={formik.handleChange}
                              value={formik.values.stock}
                              required
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group mb-3 col-xs-12 col-sm-6">
                            <label className="font-color" htmlFor="price">
                              Price
                            </label>
                            <input
                              id="price"
                              name="price"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.price}
                              className="form-control validate"
                              data-large-mode="true"
                              required
                            />
                          </div>
                          <div className="form-group mb-3 col-xs-12 col-sm-6">
                            <label className="font-color" htmlFor="appliedDiscount">
                              Applied Discount
                            </label>
                            <input
                              id="appliedDiscount"
                              name="appliedDiscount"
                              type="number"
                              className="form-control validate"
                              onChange={formik.handleChange}
                              value={formik.values.appliedDiscount}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                        <div className="form-group mb-3">
                          <label className="font-color" htmlFor="colors">
                            Colors
                          </label>
                          <Select
                            className="form-control validate"
                            id="colors"
                            name="colors"
                            options={colorOptions}
                            isMulti
                            onChange={(selectedOptions) =>
                              formik.setFieldValue(
                                "colors",
                                selectedOptions.map((option) => option.value)
                              )
                            }
                            value={colorOptions.filter((option) =>
                              formik.values.colors.includes(option.value)
                            )}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="font-color" htmlFor="imageCover">
                            Cover Image
                          </label>
                          <div className="d-flex justify-content-center mb-2">
                            <img
                              id="selectedCoverImage"
                              src={selectedCoverImage}
                              alt="Cover Preview"
                              style={{ width: "100px", height: "100px" }}
                            />
                          </div>
                          <input
                            type="file"
                            id="imageCover"
                            name="imageCover"
                            className="form-control validate"
                            onChange={handleCoverImageChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="font-color" htmlFor="images">
                            Additional Images
                          </label>
                          <div className="d-flex justify-content-center mb-2">
                            <img
                              id="selectedImage"
                              src={selectedImage}
                              alt="Image Preview"
                              style={{ width: "100px", height: "100px" }}
                            />
                          </div>
                          <input
                            type="file"
                            id="images"
                            name="images"
                            className="form-control validate"
                            onChange={handleImageChange}
                            multiple
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block text-uppercase"
                        >
                          Add Product Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}


export default function Stores() {
  const [modalShow2, setModalShow2] = React.useState(false);

  useEffect(() => {
    document.querySelector(".jsFilter").addEventListener("click", function () {
      document.querySelector(".filter-menu").classList.toggle("active");
    });

    document.querySelector(".grid").addEventListener("click", function () {
      document.querySelector(".list").classList.remove("active");
      document.querySelector(".grid").classList.add("active");
      document
        .querySelector(".products-area-wrapper")
        .classList.add("gridView");
      document
        .querySelector(".products-area-wrapper")
        .classList.remove("tableView");
    });

    document.querySelector(".list").addEventListener("click", function () {
      document.querySelector(".list").classList.add("active");
      document.querySelector(".grid").classList.remove("active");
      document
        .querySelector(".products-area-wrapper")
        .classList.remove("gridView");
      document
        .querySelector(".products-area-wrapper")
        .classList.add("tableView");
    });
  }, []);
  return (
    <>
   
              <div class="app-content py-5 px-5 w-100">
                <div class="app-content-header">
                  <h1 class="app-content-headerText">Products</h1>
                  <button
                    class="app-content-headerButton"
                    onClick={() => setModalShow2(true)}
                  >
                    Add Product
                  </button>
                  <MyVerticallyCenteredModal
                    show={modalShow2}
                    onHide={() => setModalShow2(false)}
                  />
                </div>
                <div class="app-content-actions">
                  <input
                    class="search-bar"
                    placeholder="Search..."
                    type="text"
                  />
                  <div class="app-content-actions-wrapper">
                    <div class="filter-button-wrapper">
                      <button class="action-button filter jsFilter">
                        <span>Filter</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-filter"
                        >
                          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                        </svg>
                      </button>
                      <div class="filter-menu">
                        <label>Category</label>
                        <select>
                          <option>All Categories</option>
                          <option>Furniture</option> <option>Decoration</option>
                          <option>Kitchen</option>
                          <option>Bathroom</option>
                        </select>
                        <label>Status</label>
                        <select>
                          <option>All Status</option>
                          <option>Active</option>
                          <option>Disabled</option>
                        </select>
                        <div class="filter-menu-buttons">
                          <button class="filter-button reset">Reset</button>
                          <button class="filter-button apply">Apply</button>
                        </div>
                      </div>
                    </div>
                    <button class="action-button list active" title="List View">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-list"
                      >
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                      </svg>
                    </button>
                    <button class="action-button grid" title="Grid View">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-grid"
                      >
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="products-area-wrapper tableView">
                  <div class="products-header">
                    <div class="product-cell image">
                      Items
                      <button class="sort-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div class="product-cell category">
                      Category
                      <button class="sort-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div class="product-cell status-cell">
                      Status
                      <button class="sort-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div class="product-cell sales">
                      Sales
                      <button class="sort-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div class="product-cell stock">
                      Stock
                      <button class="sort-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div class="product-cell price">
                      Price
                      <button class="sort-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="products-row">
                    <button class="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div class="product-cell image">
                      <img
                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="product"
                      />
                      <span>Ocean</span>
                    </div>
                    <div class="product-cell category">
                      <span class="cell-label">Category:</span>Furniture
                    </div>
                    <div class="product-cell status-cell">
                      <span class="cell-label">Status:</span>
                      <span class="status active">Active</span>
                    </div>
                    <div class="product-cell sales">
                      <span class="cell-label">Sales:</span>11
                    </div>
                    <div class="product-cell stock">
                      <span class="cell-label">Stock:</span>36
                    </div>
                    <div class="product-cell price">
                      <span class="cell-label">Price:</span>$560
                    </div>
                  </div>
                  <div class="products-row">
                    <button class="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div class="product-cell image">
                      <img
                        src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8a2l0Y2hlbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                        alt="product"
                      />
                      <span>Lou</span>
                    </div>
                    <div class="product-cell category">
                      <span class="cell-label">Category:</span>Kitchen
                    </div>
                    <div class="product-cell status-cell">
                      <span class="cell-label">Status:</span>
                      <span class="status disabled">Disabled</span>
                    </div>
                    <div class="product-cell sales">
                      <span class="cell-label">Sales:</span>6
                    </div>
                    <div class="product-cell stock">
                      <span class="cell-label">Stock:</span>46
                    </div>
                    <div class="product-cell price">
                      <span class="cell-label">Price:</span>$710
                    </div>
                  </div>
                  <div class="products-row">
                    <button class="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div class="product-cell image">
                      <img
                        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
                        alt="product"
                      />
                      <span>Yellow</span>
                    </div>
                    <div class="product-cell category">
                      <span class="cell-label">Category:</span>Decoration
                    </div>
                    <div class="product-cell status-cell">
                      <span class="cell-label">Status:</span>
                      <span class="status active">Active</span>
                    </div>
                    <div class="product-cell sales">
                      <span class="cell-label">Sales:</span>61
                    </div>
                    <div class="product-cell stock">
                      <span class="cell-label">Stock:</span>56
                    </div>
                    <div class="product-cell price">
                      <span class="cell-label">Price:</span>$360
                    </div>
                  </div>
                  <div class="products-row">
                    <button class="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div class="product-cell image">
                      <img
                        src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmVkcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                        alt="product"
                      />
                      <span>Dreamy</span>
                    </div>
                    <div class="product-cell category">
                      <span class="cell-label">Category:</span>Bedroom
                    </div>
                    <div class="product-cell status-cell">
                      <span class="cell-label">Status:</span>
                      <span class="status disabled">Disabled</span>
                    </div>
                    <div class="product-cell sales">
                      <span class="cell-label">Sales:</span>41
                    </div>
                    <div class="product-cell stock">
                      <span class="cell-label">Stock:</span>66
                    </div>
                    <div class="product-cell price">
                      <span class="cell-label">Price:</span>$260
                    </div>
                  </div>
                  <div class="products-row">
                    <button class="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div class="product-cell image">
                      <img
                        src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                        alt="product"
                      />
                      <span>Boheme</span>
                    </div>
                    <div class="product-cell category">
                      <span class="cell-label">Category:</span>Furniture
                    </div>
                    <div class="product-cell status-cell">
                      <span class="cell-label">Status:</span>
                      <span class="status active">Active</span>
                    </div>
                    <div class="product-cell sales">
                      <span class="cell-label">Sales:</span>32
                    </div>
                    <div class="product-cell stock">
                      <span class="cell-label">Stock:</span>40
                    </div>
                    <div class="product-cell price">
                      <span class="cell-label">Price:</span>$350
                    </div>
                  </div>
                  <div class="products-row">
                    <button class="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div class="product-cell image">
                      <img
                        src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGludGVyaW9yfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                        alt="product"
                      />
                      <span>Sky</span>
                    </div>
                    <div class="product-cell category">
                      <span class="cell-label">Category:</span>Bathroom
                    </div>
                    <div class="product-cell status-cell">
                      <span class="cell-label">Status:</span>
                      <span class="status disabled">Disabled</span>
                    </div>
                    <div class="product-cell sales">
                      <span class="cell-label">Sales:</span>22
                    </div>
                    <div class="product-cell stock">
                      <span class="cell-label">Stock:</span>44
                    </div>
                    <div class="product-cell price">
                      <span class="cell-label">Price:</span>$160
                    </div>
                  </div>
                  <div class="products-row">
                    <button class="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div class="product-cell image">
                      <img
                        src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGludGVyaW9yfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                        alt="product"
                      />
                      <span>Midnight</span>
                    </div>
                    <div class="product-cell category">
                      <span class="cell-label">Category:</span>Furniture
                    </div>
                    <div class="product-cell status-cell">
                      <span class="cell-label">Status:</span>
                      <span class="status active">Active</span>
                    </div>
                    <div class="product-cell sales">
                      <span class="cell-label">Sales:</span>23
                    </div>
                    <div class="product-cell stock">
                      <span class="cell-label">Stock:</span>45
                    </div>
                    <div class="product-cell price">
                      <span class="cell-label">Price:</span>$340
                    </div>
                  </div>
                  <div class="products-row">
                    <button class="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div class="product-cell image">
                      <img
                        src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                        alt="product"
                      />
                      <span>Boheme</span>
                    </div>
                    <div class="product-cell category">
                      <span class="cell-label">Category:</span>Furniture
                    </div>
                    <div class="product-cell status-cell">
                      <span class="cell-label">Status:</span>
                      <span class="status active">Active</span>
                    </div>
                    <div class="product-cell sales">
                      <span class="cell-label">Sales:</span>32
                    </div>
                    <div class="product-cell stock">
                      <span class="cell-label">Stock:</span>40
                    </div>
                    <div class="product-cell price">
                      <span class="cell-label">Price:</span>$350
                    </div>
                  </div>
                  <div class="products-row">
                    <button class="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div class="product-cell image">
                      <img
                        src="https://images.unsplash.com/photo-1511389026070-a14ae610a1be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGludGVyaW9yfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
                        alt="product"
                      />
                      <span>Palm</span>
                    </div>
                    <div class="product-cell category">
                      <span class="cell-label">Category:</span>Decoration
                    </div>
                    <div class="product-cell status-cell">
                      <span class="cell-label">Status:</span>
                      <span class="status active">Active</span>
                    </div>
                    <div class="product-cell sales">
                      <span class="cell-label">Sales:</span>24
                    </div>
                    <div class="product-cell stock">
                      <span class="cell-label">Stock:</span>46
                    </div>
                    <div class="product-cell price">
                      <span class="cell-label">Price:</span>$60
                    </div>
                  </div>
                  <div class="products-row">
                    <button class="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div class="product-cell image">
                      <img
                        src="https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGludGVyaW9yfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                        alt="product"
                      />
                      <span>Forest</span>
                    </div>
                    <div class="product-cell category">
                      <span class="cell-label">Category:</span>Living Room
                    </div>
                    <div class="product-cell status-cell">
                      <span class="cell-label">Status:</span>
                      <span class="status active">Active</span>
                    </div>
                    <div class="product-cell sales">
                      <span class="cell-label">Sales:</span>41
                    </div>
                    <div class="product-cell stock">
                      <span class="cell-label">Stock:</span>16
                    </div>
                    <div class="product-cell price">
                      <span class="cell-label">Price:</span>$270
                    </div>
                  </div>
                  <div class="products-row">
                    <button class="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div class="product-cell image">
                      <img
                        src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njd8fGludGVyaW9yfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
                        alt="product"
                      />
                      <span>Sand</span>
                    </div>
                    <div class="product-cell category">
                      <span class="cell-label">Category:</span>Living Room
                    </div>
                    <div class="product-cell status-cell">
                      <span class="cell-label">Status:</span>
                      <span class="status disabled">Disabled</span>
                    </div>
                    <div class="product-cell sales">
                      <span class="cell-label">Sales:</span>52
                    </div>
                    <div class="product-cell stock">
                      <span class="cell-label">Stock:</span>16
                    </div>
                    <div class="product-cell price">
                      <span class="cell-label">Price:</span>$230
                    </div>
                  </div>
                  <div class="products-row">
                    <button class="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div class="product-cell image">
                      <img
                        src="https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODd8fGludGVyaW9yfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                        alt="product"
                      />
                      <span>Autumn</span>
                    </div>
                    <div class="product-cell category">
                      <span class="cell-label">Category:</span>Decoration
                    </div>
                    <div class="product-cell status-cell">
                      <span class="cell-label">Status:</span>
                      <span class="status active">Active</span>
                    </div>
                    <div class="product-cell sales">
                      <span class="cell-label">Sales:</span>21
                    </div>
                    <div class="product-cell stock">
                      <span class="cell-label">Stock:</span>46
                    </div>
                    <div class="product-cell price">
                      <span class="cell-label">Price:</span>$252
                    </div>
                  </div>
                  <div class="products-row">
                    <button class="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div class="product-cell image">
                      <img
                        src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                        alt="product"
                      />
                      <span>Boheme</span>
                    </div>
                    <div class="product-cell category">
                      <span class="cell-label">Category:</span>Furniture
                    </div>
                    <div class="product-cell status-cell">
                      <span class="cell-label">Status:</span>
                      <span class="status active">Active</span>
                    </div>
                    <div class="product-cell sales">
                      <span class="cell-label">Sales:</span>32
                    </div>
                    <div class="product-cell stock">
                      <span class="cell-label">Stock:</span>40
                    </div>
                    <div class="product-cell price">
                      <span class="cell-label">Price:</span>$350
                    </div>
                  </div>
                </div>
              </div>
           
      
    </>
  );
}
