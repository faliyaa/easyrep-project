import { createSignal, onMount } from "solid-js";
import "./landingpage.css";
import { FaSolidLocationDot } from "solid-icons/fa";
import { BsTelephoneFill } from "solid-icons/bs";
import { AiOutlineMail } from "solid-icons/ai";
import Navbar from "./Navbar";

import logo from "../../public/img/logoweb.png";
import x from "../../public/img/twitter-icon.png";
import fb from "../../public/img/facebook-icon.png";
import instagram from "../../public/img/instagram-icon.png";
import illustration from "../../public/img/ilustrasi2.png";
import centang from "../../public/img/centangg.png";

export default function LandingPage() {
  const [loggedInUser, setLoggedInUser] = createSignal<string | null>(null);
  const [fileName, setFileName] = createSignal("Upload Lampiran (Max 10 MB)");
  const [showPopup, setShowPopup] = createSignal(false);
  const [showLoginPopup, setShowLoginPopup] = createSignal(false);
  const [showMessagePopup, setShowMessagePopup] = createSignal(false);
  const [showValidationError, setShowValidationError] = createSignal(false);
  const [validationError, setValidationError] = createSignal("");

  onMount(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (user) {
      setLoggedInUser(user.username);
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setLoggedInUser(null);
  };

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      setFileName(input.files[0].name);
    } else {
      setFileName("Upload Lampiran (Max 10 MB)");
    }
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date");
    const location = formData.get("location");

    if (!title || !description || !date || !location || !fileName()) {
      setValidationError("Semua field harus diisi dan file harus diupload.");
      setShowValidationError(true);
      setTimeout(() => {
        setShowValidationError(false);
      }, 3000);
      return;
    }

    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user) {
      setShowLoginPopup(true);
      setTimeout(() => {
        setShowLoginPopup(false);
      }, 3000);
      return;
    }

    const newReport = {
      id: Date.now(),
      title,
      description,
      date,
      location,
      fileName: fileName(),
      action: "not_processed",
      username: user.username,
    };

    const existingReports = JSON.parse(localStorage.getItem("reports") || "[]");
    existingReports.push(newReport);
    localStorage.setItem("reports", JSON.stringify(existingReports));

    console.log("New report saved: ", newReport);

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      (event.target as HTMLFormElement).reset();
      setFileName("Upload Lampiran (Max 10 MB)");
      window.location.href = "/history";
    }, 3000);
  };

  const handleContactSubmit = (event: Event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const newMessage = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const existingMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    existingMessages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(existingMessages));

    console.log("New message saved: ", newMessage);

    setShowMessagePopup(true);
    setTimeout(() => {
      setShowMessagePopup(false);
      (event.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <section class="landing-page">
      <Navbar />
      <header class="header">
        <div class="header-content" id="home">
          <h1>
            Laporan Anda, <span>Aksi Kami</span>
          </h1>
          <p>Easyrep adalah solusi cepat dan mudah untuk melaporkan masalah infrastruktur di lingkungan Anda.</p>
          <a href="#" class="btn">
            Get Started
          </a>
        </div>
        <img src={illustration} alt="Illustration" class="header-image" />
      </header>
      <div class="form-pagee">
        <div class="form-containeer">
          <div class="form-header">
            <h2>Sampaikan Laporan Anda</h2>
            <p>
              Perhatikan cara penyampaian laporan dengan benar{" "}
              <a href="#" class="tooltip">
                ?
              </a>
            </p>
          </div>
          <form action="#" method="post" enctype="multipart/form-data" onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Ketikkan judul laporanmu disini!" required />
            <textarea name="description" placeholder="Ketikkan isi laporan Anda" rows="5" required></textarea>
            <input type="date" name="date" placeholder="Pilih tanggal kejadian" required />
            <input type="text" name="location" placeholder="Ketik lokasi kejadian" required />
            <div class="file-upload">
              <input type="file" id="file" class="file-input" accept=".jpg,.jpeg,.png,.pdf" required onChange={handleFileChange} />
              <label for="file">{fileName()}</label>
            </div>
            <button type="submit">Lapor Sekarang!</button>
          </form>
          {showPopup() && (
            <div class="popup">
              <img src={centang} alt="Check" class="check-icon" />
              <p>Laporan Anda akan segera diproses</p>
              <button onclick={() => (window.location.href = "/history")} class="btn">
                Cek Laporanmu!
              </button>
            </div>
          )}
          {showLoginPopup() && (
            <div class="popup warning">
              <p>Silahkan login terlebih dahulu untuk dapat melaporkan.</p>
            </div>
          )}
          {showValidationError() && (
            <div class="popup warning">
              <p>{validationError()}</p>
            </div>
          )}
        </div>
      </div>

      <div class="section_container feature_container" id="tatacara">
        <h3 class="section__subheader">Langkah-langkah pelaporan</h3>
        <h2 class="section__header">
          Berikut ini merupakan tata cara melapor melalui <span class="break">website ini</span>
        </h2>
      </div>
      <div class="feature__grid">
        <div class="feature__card">
          <div>.01</div>
          <h4>Tulis Laporan</h4>
          <p>Sampaikan keluhan atau aspirasi Anda dengan jelas, sertakan detail seperti waktu, lokasi, dan bukti pendukung.</p>
        </div>
        <div class="feature__card">
          <div>.02</div>
          <h4>Sampaikan</h4>
          <p>Setelah laporan Anda lengkap, klik tombol 'Lapor Sekarang' untuk mengirimkan laporan Anda kepada kami.</p>
        </div>
        <div class="feature__card">
          <div>.03</div>
          <h4>Tunggu Tanggapan</h4>
          <p>Tunggu tim kami untuk memproses laporan Anda. Anda akan menerima pemberitahuan mengenai status laporan Anda.</p>
        </div>
        <div class="feature__card">
          <div>.04</div>
          <h4>Follow Up</h4>
          <p>Anda dapat mengikuti perkembangan laporan Anda melalui menu 'Laporan Saya' pada dashboard pengguna.</p>
        </div>
      </div>
      <div class="contact-container" id="contact">
        <div class="contact-info">
          <div class="info-item">
            <div class="icon">
              <FaSolidLocationDot size={24} color="#fff" />
            </div>
            <div class="details">
              <h3>Alamat</h3>
              <p>
                Jl. Proklamasi, No 132
                <br />
                Jakarta Pusat
              </p>
            </div>
          </div>
          <div class="info-item">
            <div class="icon">
              <BsTelephoneFill size={24} color="#fff" />
            </div>
            <div class="details">
              <h3>Telepon</h3>
              <p>(021) 23456789</p>
            </div>
          </div>
          <div class="info-item">
            <div class="icon">
              <AiOutlineMail size={24} color="#fff" />
            </div>
            <div class="details">
              <h3>Email</h3>
              <p>info@easyrep.com</p>
            </div>
          </div>
        </div>
        <div class="contact-form">
          <h2>Hubungi Kami</h2>
          <p>Silahkan isi form di bawah ini untuk menghubungi kami</p>
          <form onSubmit={handleContactSubmit}>
            <div class="form-group">
              <input type="text" name="name" placeholder="Nama" required />
            </div>
            <div class="form-group">
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <div class="form-group">
              <textarea name="message" placeholder="Pesan" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn">
              Kirim Pesan
            </button>
          </form>
          {showMessagePopup() && (
            <div class="popup">
              <img src={centang} alt="Check" class="check-icon" />
              <p>Pesan Anda telah terkirim</p>
            </div>
          )}
        </div>
      </div>
      <footer class="footer">
        <div class="footer-top">
          <div class="footer-logo">
            <img src={logo} alt="Logoweb" />
          </div>
          <div class="footer-content">
            <div class="footer-links">
              <h3>Tautan</h3>
              <ul>
                <li>
                  <a href="#home">Beranda</a>
                </li>
                <li>
                  <a href="#tatacara">Tata Cara</a>
                </li>
                <li>
                  <a href="#contact">Kontak</a>
                </li>
                <li>
                  <a href="/tentang">Tentang</a>
                </li>
              </ul>
            </div>
            <div class="footer-contact">
              <h3>Kontak Kami</h3>
              <ul>
                <li>📍 Lokasi: Jl. Proklamasi No.123, Jakarta Pusat, Indonesia</li>
                <li>📞 Telepon: +62 889 9556 7879 atau +62 858 3637 9987</li>
                <li>📧 Email: helloeasyrep@gmail.com</li>
              </ul>
            </div>
            <div class="footer-socials">
              <h3>Ikuti Kami</h3>
              <ul>
                <li>
                  <a href="#">
                    <img src={fb} alt="Facebook" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={x} alt="Twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={instagram} alt="Instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Easyrep. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
