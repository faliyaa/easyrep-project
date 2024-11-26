import { createSignal, onMount } from "solid-js";
import AgGridSolid from "ag-grid-solid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Sidebar from "./sidebar";
import ".//datapesan.css";


const MessagesPage = () => {
  const [messages, setMessages] = createSignal<any[]>([]);
  const [columnDefs] = createSignal([
    { headerName: "Nama", field: "name", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Pesan", field: "message", sortable: true, filter: true },
  ]);

  onMount(() => {
    // Ambil data pesan dari localStorage
    const savedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    console.log("Fetched messages from localStorage: ", savedMessages); // Debugging line
    setMessages(savedMessages);
  });

  return (
    <section class="messages-page">
      <Sidebar />
      <h2>Daftar Pesan Pengguna</h2>
      <div class="ag-theme-alpine" style={{ height: "600px", width: "100%" }}>
        {messages().length > 0 ? <AgGridSolid rowData={messages()} columnDefs={columnDefs()} pagination={true} paginationPageSize={10} defaultColDef={{ sortable: true, filter: true }} /> : <p>Loading...</p>}
      </div>
    </section>
  );
};

export default MessagesPage;
