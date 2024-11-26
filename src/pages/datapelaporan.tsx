import { createSignal, onMount } from "solid-js";
import AgGridSolid from "ag-grid-solid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./datapelaporan.css";
import Sidebar from "./sidebar";

interface Report {
  title: string;
  description: string;
  date: string;
  location: string;
  fileName: string;
  action: string;
}

const ReportsPage = () => {
  const [reports, setReports] = createSignal<Report[]>([]);

  const fetchReports = () => {
    const savedReports = JSON.parse(localStorage.getItem("reports") || "[]").map((report: Report) => ({
      ...report,
      action: report.action || "not_processed",
    }));
    setReports(savedReports);
  };

  const updateReports = (updatedReports: Report[]) => {
    setReports(updatedReports);
    localStorage.setItem("reports", JSON.stringify(updatedReports));
  };

  const handleStatusChange = (reportIndex: number, newStatus: string) => {
    const updatedReports = reports().map((report, index) => {
      if (index === reportIndex) {
        return { ...report, action: newStatus };
      }
      return report;
    });
    updateReports(updatedReports);
  };

  onMount(fetchReports);

  const columnDefs = [
    { headerName: "Judul", field: "title" },
    { headerName: "Deskripsi", field: "description", sortable: true, filter: true },
    { headerName: "Tanggal Kejadian", field: "date", sortable: true, filter: true },
    { headerName: "Lokasi", field: "location", sortable: true, filter: true },
    { headerName: "Lampiran", field: "fileName", sortable: true, filter: true },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (params: any) => {
        const statusOptions = [
          { value: "not_processed", label: "Belum Diterima" },
          { value: "accepted", label: "Diterima" },
          { value: "in_progress", label: "Diproses" },
          { value: "completed", label: "Selesai" },
        ];

        return (
          <select class="ag-cell-action" value={params.value} onChange={(e) => handleStatusChange(params.rowIndex, e.target.value)}>
            {statusOptions.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        );
      },
    },
  ];

  return (
    <section class="reports-page">
      <Sidebar />
      <h2>Daftar Laporan</h2>
      <div class="ag-theme-alpine" style={{ height: "570px", width: "110%" }}>
        {reports().length > 0 ? <AgGridSolid rowData={reports()} columnDefs={columnDefs} /> : <p>Loading...</p>}
      </div>
    </section>
  );
};

export default ReportsPage;
