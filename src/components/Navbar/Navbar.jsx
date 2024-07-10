


import React from "react";


export default function Navbar() {


  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
        <div className="container-fluid px-3">
          <span class="navbar-brand mb-0 h1 link-light">A2Z.</span>

          <div className="d-flex align-items-center">
            <div className="px-3">
              <i className="fas fa-bell"></i>
              <span className="badge rounded-pill badge-notification bg-danger">
                1
              </span>
            </div>
            
              
            
              <div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-circle"
                  height="25"
                  alt="User Avatar"
                  loading="lazy"
                />
              </div>
            
          </div>
        </div>
      </nav>
    </>
  );
}
