import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { BeatLoader } from "react-spinners";


export default function EngineerProfile() {
  let params = useParams()
  const headers = {
    authorization: "a2z" + " " + `${localStorage.getItem("userToken")}`,
  };

  async function getProfileEng(id){
    return await axios.get(`https://a2z-render.onrender.com/admin/getengbyid?engid=${id}`,{ headers: headers })
  }

 let {data,isLoading} = useQuery("details",()=>getProfileEng(params.id))
 console.log(data?.data.eng)

  return (
    <div className="store-section">
    <div className="container">
      <div className="main-sec">
       {isLoading?(
             <div className="vh-100 d-flex justify-content-center align-items-center">
             <BeatLoader color="#262152" margin={4} size={50} />
           </div>
       ):(
        <section className="">
        <div className="">
          <div className="">
            <div className="">
              <div className="">
                <div className="rounded-top  d-flex flex-row" >
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: '150px', zIndex: 1 }}
                    />
                    <button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-dark text-body"
                      data-mdb-ripple-color="dark"
                      style={{ zIndex: 1 }}
                    >
                      Edit profile
                    </button>
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px' }}>
                    <h5>{data?.data.eng.userName}</h5>
                    <p>{data?.data.eng.address}</p>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5 text-body">
                  <div class="card-body p-4">
                  <h6>Information</h6>
                  <hr class="mt-0 mb-4"/>
                  <div class="row pt-1">
                    <div class="col-md-4 mb-3">
                      <h6>Email</h6>
                      <p class="text-muted">{data?.data.eng.email}</p>
                    </div>
                    <div class="col-md-4 mb-3">
                      <h6>Phone</h6>
                      <p class="text-muted">{data?.data.eng.phoneNumber}</p>
                    </div>
                    <div class="col-md-4 mb-3">
                      <h6>id</h6>
                      <p class="text-muted">{data?.data.eng._id}</p>
                    </div>
                  </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4 text-body">
                    <p className="lead fw-normal mb-0">Recent photos</p>
                    <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
                  </div>
                  <div className="row g-2">
                    <div className="col mb-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                        alt="image1"
                        className="w-100 rounded-3"
                      />
                    </div>
                    <div className="col mb-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                        alt="image1"
                        className="w-100 rounded-3"
                      />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                        alt="image1"
                        className="w-100 rounded-3"
                      />
                    </div>
                    <div className="col">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                        alt="image1"
                        className="w-100 rounded-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
                 </section>
       )}
        </div>
        </div>
        </div>
 
  )
}
