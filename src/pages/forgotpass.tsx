import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import CryptoJS from "crypto-js";
import "./forgotpass.css"

const ForgotPassword = () => {
  const [email, setEmail] = createSignal("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((user) => user.email === email());

    if (!user) {
      alert("Email yang Anda inputkan tidak ada");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("resetCode", JSON.stringify({ email: email(), code, expires: Date.now() + 3600000 })); // 1 hour expiration

    alert(`Kode reset password Anda: ${code}`);
    navigate("/verify-code");
  };

  return (
    <section>
      <div class="containerpw">
        <div class="form-containerpw">
          <h2 class="pw">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <p>Email</p>
              <label for="email"></label>
              <input type="email" id="email" value={email()} onInput={(e) => setEmail(e.target.value)} placeholder="Masukkan email Anda" required />
            </div>
            <button type="submit" class="submit-btnpw">Reset Password</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;