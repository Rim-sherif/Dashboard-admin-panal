// import React, { useState } from 'react'
// import imgg from '../../assets/images/images/Rectangle 61.jpg'
// import img  from '../../assets/images/images/Rectangle 62.jpg'
// import imggg from '../../assets/images/images/Rectangle 63.jpg'
// import { Link } from 'react-router-dom'
// import Modal from 'react-bootstrap/Modal';


// function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="s"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
     
//       <Modal.Body className="req-describtion p-4 m-auto bg-white">
//       <div >
//       <div className="text-center">
//         <img src={imggg} alt="" />
//       </div>
//       <p className="pt-5"><span className="fw-bold">Name:</span> Ahme ali</p>
//       <p><span className="fw-bold">phone:</span> 01234758457</p>
//       <p><span className="fw-bold">E-mail:</span> ahmed-ali@gmail.com</p>
//       <p><span className="fw-bold">City:</span> cairo</p>
//       <div className="d-flex">
//         <label for="formFile" className="form-label fw-bold px-2">ID: </label>
//         <input className="form-control w-25" type="file" id="formFile" />
//       </div>
     
     

//       <div className="d-grid gap-2 d-md-block text-center mt-5">
//         <button className="btn px-4 btn-req1" type="button">Accept</button>
//         <button className="btn px-4 btn-req2" type="button" onClick={props.onHide}>Deny</button>
//       </div>
//     </div>
//       </Modal.Body>
     
//     </Modal>
//   );
// }


// export default function Engineerrequests() {
//   const [modalShow, setModalShow] = React.useState(false);
//   const [viewMode, setViewMode] = useState("grid");

//   const handleGridView = () => setViewMode("grid");
//   const handleListView = () => setViewMode("list");

//   return (
//     <>
//     <div className="client-section w-100">
//       <div className="container p-5">
//         <div className="d-flex justify-content-between">
//           <div className="d-flex">
//             <h3 className="fst h2">Requests</h3>
//           </div>
//           <form className="w-25" role="search">
//             <input
//               className="form-control me-2"
//               type="search"
//               placeholder="Search"
//               aria-label="Search"
//             />
//           </form>
//         </div>
//         <div className="d-flex justify-content-between">
//           <div className="d-flex">
//             <h3 className="fst h3">Workers request list</h3>
           
//           </div>
        
//           <div className="col-4 d-flex justify-content-end">
//             <div className="d-flex all-s">
//               <div
//                 className="dts-s d-flex justify-content-center align-items-center icons-view m-2"
//                 onClick={handleListView}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="28"
//                   height="28"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="feather feather-list"
//                 >
//                   <line x1="8" y1="6" x2="21" y2="6" />
//                   <line x1="8" y1="12" x2="21" y2="12" />
//                   <line x1="8" y1="18" x2="21" y2="18" />
//                   <line x1="3" y1="6" x2="3.01" y2="6" />
//                   <line x1="3" y1="12" x2="3.01" y2="12" />
//                   <line x1="3" y1="18" x2="3.01" y2="18" />
//                 </svg>
//               </div>
//               <div
//                 className="dts-s d-flex justify-content-center align-items-center icons-view m-2"
//                 onClick={handleGridView}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="27"
//                   height="27"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="feather feather-grid"
//                 >
//                   <rect x="3" y="3" width="7" height="7" />
//                   <rect x="14" y="3" width="7" height="7" />
//                   <rect x="14" y="14" width="7" height="7" />
//                   <rect x="3" y="14" width="7" height="7" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//         {viewMode === "grid" ? (
//           <div className="row mt-3 g-4">
//              <div className="row mt-3 g-4">
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imggg} alt="" className="w-75" />
//               <Link onClick={() => setModalShow(true)}><h4 className="py-1">Name</h4></Link>
//               <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imgg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imgg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imgg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imgg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imgg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imgg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid  d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn  btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imgg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn  btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={img} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imggg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imggg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imggg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imggg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imggg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imggg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imggg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={imgg} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="req-item pt-3">
//               <img src={img} alt="" className="w-75" />
//               <h4 className="py-1">Name</h4>
//               <div className="d-grid gap-2 d-md-block m-2">
//                 <button className="btn m-1 btn-req1" type="button">Accept</button>
//                 <button className="btn btn-req2" type="button">Deny</button>
//               </div>
//             </div>
//           </div>
//         </div>
//           </div>
//         ) : (
//           <div className="row">
//             <div className="col-md-6">
//               <div className="request-list">
//                 <div className="request-item">
//                   <img src={imgg} alt="Sierra Ferguson" />
//                   <div className="details">
//                     <strong>Sierra Ferguson</strong>
//                     <br />
//                     +998 (99) 436-46-15
//                   </div>
//                   <div className="buttons">
//                     <button className="btn btn-primary-1">Accept</button>
//                     <button className="btn btn-outline-danger">Reject</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="request-list">
//                 <div className="request-item">
//                   <img src={imggg} alt="Sierra Ferguson" />
//                   <div className="details">
//                     <strong>Sierra Ferguson</strong>
//                     <br />
//                     +998 (99) 436-46-15
//                   </div>
//                   <div className="buttons">
//                     <button className="btn btn-primary-1">Accept</button>
//                     <button className="btn btn-outline-danger">Reject</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   </>
//   )
// }



import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../../assets/images/images/Rectangle 61.jpg";
import { Modal } from "react-bootstrap";
import axios from "axios";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="s"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="req-describtion p-4 m-auto bg-white">
        <div>
          <div className="text-center">
            <img src={img} alt="" />
          </div>
          <p className="pt-5">
            <span className="fw-bold">Name:</span> Ahme ali
          </p>
          <p>
            <span className="fw-bold">Phone:</span> 01234758457
          </p>
          <p>
            <span className="fw-bold">E-mail:</span> ahmed-ali@gmail.com
          </p>
          <p>
            <span className="fw-bold">City:</span> Cairo
          </p>
          <div className="d-flex">
            <label htmlFor="formFile" className="form-label fw-bold px-2">
              ID:
            </label>
            <input className="form-control w-25" type="file" id="formFile" />
          </div>
          <div className="d-grid gap-2 d-md-block text-center mt-5">
            <button className="btn px-4 btn-req1" type="button">
              Accept
            </button>
            <button
              className="btn px-4 btn-req2"
              type="button"
              onClick={props.onHide}
            >
              Deny
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default function EngineerRequests() {
  const [modalShow2, setModalShow2] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [engineers, setEngineers] = useState(() => {
    const savedEngineers = localStorage.getItem("requests");
    return savedEngineers ? JSON.parse(savedEngineers) : [];
  });

  const headers = {
    authorization: `a2z ${localStorage.getItem("userToken")}`,
  };

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const response = await axios.get(
          "https://a2z-render.onrender.com/admin/getsomeeng",
          { headers }
        );
        const { unverifiedEngineers } = response.data;
        if (Array.isArray(unverifiedEngineers)) {
          setEngineers(unverifiedEngineers);
          localStorage.setItem("requests", JSON.stringify(unverifiedEngineers));
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
          "https://a2z-render.onrender.com/admin/getsomeeng",
          { headers }
        );
        const updatedEngineers = response.data.unverifiedEngineers;

        setEngineers((prevEngineers) => {
          if (JSON.stringify(updatedEngineers) !== JSON.stringify(prevEngineers)) {
            localStorage.setItem("requests", JSON.stringify(updatedEngineers));
            return updatedEngineers;
          }
          return prevEngineers;
        });
      } catch (error) {
        console.error("Error fetching engineers:", error);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [headers]);

  const updateUser = async (id) => {
    const engineer = engineers.find((engineer) => engineer._id === id);

    if (!engineer) {
      toast.error("Engineer not found", { autoClose: 3000 });
      return;
    }

    try {
      await axios.put(
        `https://a2z-render.onrender.com/admin/updateengverify/${id}`,
        { Verify: true },
        { headers }
      );
      const response = await axios.get(
        "https://a2z-render.onrender.com/admin/getsomeeng",
        { headers }
      );
      const updatedEngineers = response.data.unverifiedEngineers;

      setEngineers(updatedEngineers);
      localStorage.setItem("requests", JSON.stringify(updatedEngineers));
      toast.success("Worker verified successfully", { autoClose: 3000 });
    } catch (error) {
      console.error("Error updating engineer:", error);
      toast.error("Error updating engineer", { autoClose: 3000 });
    }
  };
  const handleGridView = () => setViewMode("grid");
  const handleListView = () => setViewMode("list");

  return (
    <>
      <div className="client-section w-100">
        <ToastContainer />
        <div className="container p-5">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <h3 className="fst h2">Requests</h3>
            </div>
            <form className="w-25" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <h3 className="fst h3">Workers request list</h3>
            </div>
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
            <div className="row mt-3 g-4">
              {engineers.map((engineer) => (
                <div key={engineer._id} className="col-lg-3">
                  <div className="req-item pt-3">
                    <img src={img} alt="" className="w-100  h-75vh" />
                    <h4 className="py-1">{engineer.userName}</h4>
                    <div className="d-grid gap-2 d-md-block m-2">
                      <button
                        className="btn m-1 btn-req1"
                        type="button"
                        onClick={() => updateUser(engineer._id)}
                      >
                        Accept
                      </button>
                      <button className="btn btn-req2" type="button">
                        Deny
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-2 row">
              {engineers.map((engineer) => (
                <div key={engineer._id} className="col-md-6">
                  <div className="request-list">
                    <div className="request-item">
                      <img src={img} alt="" />
                      <div className="details">
                        <strong>{engineer.userName}</strong>
                        <br />
                        {engineer.phoneNumber}
                      </div>
                      <div className="buttons d-grid gap-2 d-md-block m-2">
                        <button
                          className="btn btn-primary-1"
                          onClick={() => updateUser(engineer._id)}
                        >
                          Accept
                        </button>
                        <button className="btn btn-outline-danger">Reject</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
