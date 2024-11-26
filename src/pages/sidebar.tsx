import { createSignal, onMount } from "solid-js";
import AgGridSolid from "ag-grid-solid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./sidebar.css";
import "boxicons/css/boxicons.min.css";

const Sidebar = () => {
  const Auth = { check: true }; // Dummy implementation, replace with your actual authentication logic

  return (
    <section id="sidebar">
      <a href="#" class="brand">
        <i class="bx bxs-smile"></i>
        <span class="text">Admin</span>
      </a>
      <ul class="side-menu top">
        <li>
          <a href="/useradmin">
            <i class="bx bxs-dashboard"></i>
            <span class="text">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/usermanagement">
            <i class="bx bx-user"></i>
            <span class="text">User Management</span>
          </a>
        </li>
        <li>
          <a href="/datapelaporan">
            <i class="bx bxs-file-doc"></i>
            <span class="text">Data pelaporan</span>
          </a>
        </li>
        <li>
          <a href="/datapesan">
            <i class="bx bx-message-rounded-dots"></i>
            <span class="text">Data pesan</span>
          </a>
        </li>
        <li>
          <a href="/">
            <i class="bx bx-home"></i>
            <span class="text">Landing page</span>
          </a>
        </li>
      </ul>
      <ul class="side-menu">
        {Auth.check && (
          <li class="logout-item">
            <a href="/login" class="logout">
              <i class="bx bxs-log-out-circle"></i>
              <span class="text">Logout</span>
            </a>
          </li>
        )}
      </ul>
    </section>
  );
};

export default Sidebar;
