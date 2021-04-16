import React from 'react';
import {Link} from 'react-router-dom';

export default function Sidebar() {
  return (
    <ul
      className="navbar-nav bg-gradient-info sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <li className="nav-item mt-5">
        <Link className="nav-link" to="/">
          <i className="fas fa-box mr-2"></i>
          <span>Nhà xe</span>
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/car">
          <i className="fas fa-box mr-2"></i>
          <span>Xe</span>
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/station">
          <i className="fas fa-box mr-2"></i>
          <span>Trạm xe</span>
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/trip">
          <i className="fas fa-box mr-2"></i>
          <span>Chuyến xe</span>
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/ticket">
          <i className="fas fa-box mr-2"></i>
          <span>Vé xe</span>
        </Link>
      </li>
    </ul>
  );
}
