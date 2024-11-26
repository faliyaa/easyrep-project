import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AgGridSolid from "ag-grid-solid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./gridmanagament.css";
import Sidebar from "./sidebar";
import "boxicons/css/boxicons.min.css";
import { FiAlertCircle } from "solid-icons/fi";

const GridManagement = () => {
  const [rowData, setRowData] = createSignal<any[]>([]);
  const [filteredData, setFilteredData] = createSignal<any[]>([]);
  const [searchTerm, setSearchTerm] = createSignal("");
  const [showDeletePopup, setShowDeletePopup] = createSignal(false);
  const [userToDelete, setUserToDelete] = createSignal<any>(null);
  const navigate = useNavigate();

  onMount(() => {
    loadUserData();
    window.addEventListener("storage", handleStorageChange);
  });

  const loadUserData = () => {
    const savedData = localStorage.getItem("users");
    if (savedData) {
      const parsedData = JSON.parse(savedData).map((user: any) => ({
        ...user,
        role: user.role || "User", // Default role to "User" if not specified
      }));
      setRowData(parsedData);
      setFilteredData(parsedData);
    }
  };

  const handleStorageChange = () => {
    loadUserData();
  };

  const updateRowData = (newData: any[]) => {
    setRowData(newData);
    setFilteredData(newData);
    localStorage.setItem("users", JSON.stringify(newData));
    window.dispatchEvent(new Event("storage"));
  };

  const handleSearch = (e: Event) => {
    const searchTerm = (e.target as HTMLInputElement).value;
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setFilteredData(rowData());
    } else {
      const filtered = rowData().filter((user) => Object.values(user).some((val) => String(val).toLowerCase().includes(searchTerm.toLowerCase())));
      setFilteredData(filtered);
    }
  };

  const columnDefs = [
    { field: "username", headerName: "Username", editable: false },
    { field: "email", headerName: "Email", editable: false },
    { field: "password", headerName: "Password", editable: false },
    {
      headerName: "Role",
      field: "role",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Admin", "User"],
      },
    },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => {
        const container = document.createElement("div");
        container.classList.add("action-buttons");

        const updateButton = document.createElement("button");
        updateButton.innerText = "Edit";
        updateButton.classList.add("action-button", "update-button");
        updateButton.addEventListener("click", () => navigate(`/editdata/${params.data.email}`));

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("action-button", "delete-button");
        deleteButton.addEventListener("click", () => confirmDeleteUser(params.data));

        container.appendChild(updateButton);
        container.appendChild(deleteButton);

        return container;
      },
    },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 150,
  };

  const confirmDeleteUser = (user: any) => {
    setUserToDelete(user);
    setShowDeletePopup(true);
  };

  const deleteUser = () => {
    const userToDeleteValue = userToDelete();
    if (userToDeleteValue) {
      const updatedData = rowData().filter((user) => user.email !== userToDeleteValue.email);
      updateRowData(updatedData);
      setShowDeletePopup(false);
    }
  };

  const closePopup = () => {
    setShowDeletePopup(false);
    setUserToDelete(null);
  };

  return (
    <div class="page-container">
      <Sidebar />
      <div class="content-g">
        <h1>User Management</h1>
        <div class="top-bar">
          <input type="text" placeholder="Search..." value={searchTerm()} onInput={handleSearch} class="search-inputt" />
        </div>
        <div class="grid-wrapper ag-theme-alpine">{filteredData().length > 0 ? <AgGridSolid columnDefs={columnDefs} rowData={filteredData()} defaultColDef={defaultColDef} /> : <p>Loading...</p>}</div>
      </div>
      {showDeletePopup() && (
        <div class="popup-overlay">
          <div class="popup">
            <h2>
              <FiAlertCircle size={80} style={{ color: "red" }} />
            </h2>
            <p>Are you sure you want to delete this user?</p>
            <div class="popup-buttons">
              <button onClick={deleteUser} class="popup-button confirm">
                Yes
              </button>
              <button onClick={closePopup} class="popup-button cancel">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridManagement;
