import { createSignal, onMount, createMemo } from "solid-js";
import "./historylaporan.css";
import { FaRegularTrashCan } from "solid-icons/fa";

const HistoryLaporan = () => {
  const [reports, setReports] = createSignal<any[]>([]);
  const [loggedInUser, setLoggedInUser] = createSignal<string | null>(null);
  const [showDeletePopup, setShowDeletePopup] = createSignal(false);
  const [reportToDelete, setReportToDelete] = createSignal<any>(null);

  onMount(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (user) {
      setLoggedInUser(user.username);
      fetchUserReports(user.username);
    }

    window.addEventListener("storage", () => {
      if (user) {
        fetchUserReports(user.username);
      }
    });
  });

  const fetchUserReports = (username: string) => {
    const savedReports = JSON.parse(localStorage.getItem("reports") || "[]");
    const userReports = savedReports.filter((report) => report.username === username);
    setReports(userReports);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setLoggedInUser(null);
    window.location.href = "/";
  };

  const deleteReport = (report: any) => {
    setReportToDelete(report);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    const reportToDeleteValue = reportToDelete();
    if (reportToDeleteValue) {
      const savedReports = JSON.parse(localStorage.getItem("reports") || "[]");
      const updatedReports = savedReports.filter((report: any) => report.id !== reportToDeleteValue.id); // Asumsi ada field id
      localStorage.setItem("reports", JSON.stringify(updatedReports));

      const savedDataReports = JSON.parse(localStorage.getItem("datapelaporan") || "[]");
      const updatedDataReports = savedDataReports.filter((report: any) => report.id !== reportToDeleteValue.id); // Asumsi ada field id
      localStorage.setItem("datapelaporan", JSON.stringify(updatedDataReports));

      fetchUserReports(loggedInUser() || "");
      setShowDeletePopup(false);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setReportToDelete(null);
  };

  const reportList = createMemo(() => reports());

  return (
    <section class="history-page">
      <nav class="navbar">
        <div class="logo">
          <img src="public/img/logoweb.png" alt="Logoweb" />
        </div>
        <ul class="nav-links">
          <li>
            <a href="/">Beranda</a>
          </li>
          <li>
            <a href="/landingpage#tatacara">Tata Cara</a>
          </li>
          <li>
            <a href="/landingpage#contact">Kontak</a>
          </li>
          <li>
            <a href="/tentang">Tentang</a>
          </li>
          <li>
            <a href="/history">Laporan</a>
          </li>
        </ul>
        <div class="auth-buttons">
          {loggedInUser() ? (
            <>
              <span>Halo, {loggedInUser()}</span>
              <button onClick={handleLogout} class="logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" class="login">
                Login
              </a>
              <a href="/" class="register">
                Register
              </a>
            </>
          )}
        </div>
      </nav>
      <h2 class="reports-title">Riwayat Laporan Anda</h2>
      <div class="reports-container">
        {reportList().map((report) => (
          <div class="report-card">
            <div class="report-header">
              <h3>{report.title}</h3>
              <p>{new Date(report.date).toLocaleDateString()}</p>
              <button class="delete-buttonn" onClick={() => deleteReport(report)}>
                <FaRegularTrashCan />
              </button>
            </div>
            <p class="report-description">{report.description}</p>
            <div class="report-footer">
              <span class="report-location">{report.location}</span>
              <span class="report-status">{report.action}</span>
            </div>
            {report.fileName && (
              <div class="report-attachment">
                <a href={`path/to/attachments/${report.fileName}`} target="_blank" rel="noopener noreferrer">
                  Lampiran: {report.fileName}
                </a>
              </div>
            )}
          </div>
        ))}
        {reportList().length === 0 && <p class="reports-p">Belum ada laporan yang dibuat.</p>}
      </div>
      {showDeletePopup() && (
        <div class="popup-overlay">
          <div class="popup">
            <h2>Konfirmasi Penghapusan</h2>
            <p>Apakah Anda yakin ingin menghapus laporan ini?</p>
            <div class="popup-buttons">
              <button onClick={confirmDelete} class="popup-button confirm">
                Ya
              </button>
              <button onClick={cancelDelete} class="popup-button cancel">
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HistoryLaporan;
