import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import "./login.css";
import "boxicons/css/boxicons.min.css";

const Login = () => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const [showPopup, setShowPopup] = createSignal(false);
  const [popupMessage, setPopupMessage] = createSignal("");
  const navigate = useNavigate();

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((user: { email: string; password: string; role: string }) => user.email === email());

    if (!user) {
      setPopupMessage("Email yang Anda inputkan tidak ada");
      setShowPopup(true);
      return;
    }

    // Compare password without hashing
    if (user.password === password()) {
      setPopupMessage("Login sukses");
      setShowPopup(true);
      localStorage.setItem("currentUser", JSON.stringify(user));
      // Navigate after user closes the popup
      // No setTimeout needed
    } else {
      setPopupMessage("Password salah");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (user) {
      if (user.role === "Admin") {
        navigate("/useradmin");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <section>
      <div class="container">
        <div class="form-containner">
          <img class="navbarr" src="public/img/logoweb.png" alt="logo" />
          <h2>Masuk ke akun Anda</h2>
          <p>Selamat datang kembali! Pilih metode untuk login:</p>
          <div class="social-login">
            <button class="google">
              <img src="public/img/google.png" alt="google logo" />
              Google
            </button>
            <button class="facebook">
              <img src="public/img/fb.png" alt="facebook logo" />
              Facebook
            </button>
          </div>
          <div class="separator">
            <div class="separator-linee"></div>
            <div class="separator-text">ATAU</div>
            <div class="separator-linee"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <p>Email</p>
              <label for="email"></label>
              <input type="email" id="email" value={email()} onInput={(e) => setEmail(e.target.value)} placeholder="Masukkan email Anda" required />
            </div>
            <div class="passwoord-containerr">
              <p>Password</p>
              <label for="password"></label>
              <input type={showPassword() ? "text" : "password"} id="password" value={password()} onInput={(e) => setPassword(e.target.value)} placeholder="Masukkan password Anda" required />
              <i class={`bx ${showPassword() ? "bx-show" : "bx-hide"}`} onClick={() => setShowPassword(!showPassword())}></i>
            </div>
            <a href="/forgotpassword" class="forgot-passwordd">
              Lupa password?
            </a>
            <button type="submit" class="submit-btn">
              Masuk
            </button>
          </form>
          <div class="login-link">
            Belum punya akun? <a href="/register">Buat sekarang!</a>
          </div>
        </div>
        <div class="image-containerr">
          <h1>Lihat fasilitas </h1>
          <h2>infrastruktur rusak?</h2>
          <h3>Masuk untuk melaporkan sekarang!</h3>
        </div>
      </div>

      {/* Pop-up */}
      {showPopup() && (
        <div class="login-popup-overlay">
          <div class="login-popup">
            <p>{popupMessage()}</p>
            <button onClick={closePopup} class="popup-button confirmm">
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
