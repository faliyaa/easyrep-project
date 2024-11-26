import { createSignal } from "solid-js";
import "./register.css";

export default function Register() {
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [terms, setTermscb] = createSignal(false);
  const [showPassword, setShowPassword] = createSignal(false); // New state for password visibility

  const handleRegister = (e) => {
    e.preventDefault();

    // Store password as plaintext
    const userData = {
      username: username(),
      email: email(),
      password: password(),
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some((user) => user.email === email());
    if (emailExists) {
      alert("Email sudah terdaftar. Silakan gunakan email lain.");
      return;
    }

    users.push(userData);

    localStorage.setItem("users", JSON.stringify(users));
    alert("Data telah disimpan ke localStorage!");

    setUsername("");
    setEmail("");
    setPassword("");
    setTermscb(false);

    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <section>
      <div class="container">
        <div class="form-containerr">
          <img class="navbarrr" src="public/img/logoweb.png" alt="logo" />
          <h1>Buat akun Anda!</h1>
          <p class="desc">Selamat datang! Silahkan masukkan informasi Anda</p>
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
            <div class="separator-line"></div>
            <div class="separator-text">ATAU</div>
            <div class="separator-line"></div>
          </div>
          <form onSubmit={handleRegister}>
            <div>
              <p>Username</p>
              <label for="username"></label>
              <input type="text" id="username" value={username()} onInput={(e) => setUsername(e.target.value)} placeholder="Masukkan username Anda" required />
            </div>
            <div>
              <p>Email</p>
              <label for="email"></label>
              <input type="email" id="email" value={email()} onInput={(e) => setEmail(e.target.value)} placeholder="Masukkan email Anda" required />
            </div>
            <div class="password-container">
              <p>Password</p>
              <label for="password"></label>
              <div class="password-wrapper">
                <input
                  type={showPassword() ? "text" : "password"} // Toggle between text and password
                  id="password"
                  value={password()}
                  onInput={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password Anda"
                  required
                />
                <i
                  class={`bx ${showPassword() ? "bx-show" : "bx-hide"}`} // Toggle icon class
                  onClick={() => setShowPassword(!showPassword())} // Toggle visibility
                ></i>
              </div>
            </div>
            <div class="checkbox-containerr">
              <div class="checkboxx">
                <input type="checkbox" id="terms" checked={terms()} onChange={(e) => setTermscb(e.target.checked)} required />
              </div>
              <label for="terms">
                Saya telah membaca dan menyetujui{" "}
                <span style="color: #AE8EF1;">
                  <a href="#">Syarat dan Ketentuan Layanan</a>
                </span>
              </label>
            </div>
            <button type="submit" class="submit-btn">
              Buat Akun
            </button>
          </form>
          <div class="login-link">
            Sudah punya akun? <a href="/login"> Masuk sekarang!</a>
          </div>
        </div>
        <div class="image-container">
          <h2>Easyrep</h2>
          <p>
            Easyrep memudahkan Anda melaporkan masalah infrastruktur seperti jalan rusak atau lampu mati. Dengan beberapa klik saja, laporan Anda langsung diteruskan untuk perbaikan cepat. Pantau perkembangan secara real-time dan bantu
            lingkungan tetap aman dan nyaman.
          </p>
        </div>
      </div>
    </section>
  );
}
