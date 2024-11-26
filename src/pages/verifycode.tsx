// VerifyCode.jsx
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import "./forgotpass.css";

const VerifyCode = () => {
  const [code, setCode] = createSignal("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const resetData = JSON.parse(localStorage.getItem("resetCode") || "{}");

    if (!resetData || resetData.code !== code() || resetData.expires < Date.now()) {
      alert("Kode tidak valid atau telah kedaluwarsa");
      return;
    }

    navigate("/resetpassword");
  };

  return (
    <section>
      <div class="containerpw">
        <div class="form-containerpw">
          <h2 class="pw">Verifikasi Kode</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <p>Kode Verifikasi</p>
              <label for="code"></label>
              <input type="text" id="code" value={code()} onInput={(e) => setCode(e.target.value)} placeholder="Masukkan kode verifikasi Anda" required />
            </div>
            <button type="submit" class="submit-btnpw">
              Verifikasi Kode
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VerifyCode;
