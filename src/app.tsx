import { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
// benerin import
import GridPage from "./pages/GridPage";
import LandingPage from "./pages/landingpage";
import RequireAdmin from "./pages/middleware";
import UserManagement from "./pages/GridManagement";
import TentangPage from "./pages/tentang";
import EditData from "./pages/editdata";
import LupaPassword from "./pages/forgotpass";
import ResetPassword from "./pages/resetpass";
import VerifyCode from "./pages/verifycode";
import DataPelaporan from "./pages/datapelaporan";
import DataPesanPengguna from "./pages/datapesan";
import HistoryLaporan from "./pages/historylaporan";
import Navbar from "./pages/Navbar";

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/tentang" component={TentangPage} />
      <Route path="/forgotpassword" component={LupaPassword} />
      <Route path="/resetpassword" component={ResetPassword} />
      <Route path="/verify-code" component={VerifyCode} />
      <Route path="/history" component={HistoryLaporan} />
      <Route path="/navbar" component={Navbar} />

      <Route
        path="/datapelaporan"
        component={() => (
          <RequireAdmin>
            <DataPelaporan />
          </RequireAdmin>
        )}
      />
      <Route
        path="/datapesan"
        component={() => (
          <RequireAdmin>
            <DataPesanPengguna />
          </RequireAdmin>
        )}
      />
      <Route
        path="/useradmin"
        component={() => (
          <RequireAdmin>
            <GridPage />
          </RequireAdmin>
        )}
      />
      <Route
        path="/usermanagement"
        component={() => (
          <RequireAdmin>
            <UserManagement />
          </RequireAdmin>
        )}
      />
      <Route
        path="/editdata/:email"
        component={() => (
          <RequireAdmin>
            <EditData />
          </RequireAdmin>
        )}
      />
    </Routes>
  );
};

export default App;
