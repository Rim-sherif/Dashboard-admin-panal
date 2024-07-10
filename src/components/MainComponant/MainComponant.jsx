import React, { useState } from 'react';
import Sidebar from '../SideBar/sidebar';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';


export default function MainComponent() {
  const [expanded, setExpanded] = useState(false);


  return (
    <>
      <Navbar />
      <div className="containe mt-5">
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
        <div className={`app-container mt-3 ${expanded && "app-container-expanded"}`}>
        <Outlet />
        </div>
      </div>
    </>
  );
}

