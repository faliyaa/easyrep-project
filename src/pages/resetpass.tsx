import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import "./forgotpass.css";

const ResetPassword = () => {
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const resetData = JSON.parse(localStorage.getItem("resetCode") || "{}");

    if (!resetData || resetData.expires < Date.now()) {
      alert("Token tidak valid atau telah kedaluwarsa");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((user) => user.email === resetData.email);

    if (userIndex === -1) {
      alert("Pengguna tidak ditemukan");
      return;
    }

    users[userIndex].password = password(); // Jangan di-hash
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("resetCode");

    alert("Password Anda berhasil direset");
    navigate("/login");
  };

  return (
    <section>
      <div class="containerpw">
        <div class="form-containerpw">
          <h2 class="pw">Masukkan Password Baru</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <p>Password Baru</p>
              <label for="password"></label>
              <input type="password" id="password" value={password()} onInput={(e) => setPassword(e.target.value)} placeholder="Masukkan password baru Anda" required />
            </div>
            <button type="submit" class="submit-btnpw">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
