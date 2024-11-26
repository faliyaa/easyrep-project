import { createSignal, onMount } from "solid-js";
import "./tentang.css";
import Navbar from "./Navbar";

import logo from "../../public/img/logoweb.png";
import x from "../../public/img/twitter-icon.png";
import fb from "../../public/img/facebook-icon.png";
import instagram from "../../public/img/instagram-icon.png";

export default function Tentang() {
  return (
    <section class="landing-page">
      <Navbar />
      <div class="content-containeer">
        <div class="title">
          <div class="title-text">Apa itu Easyrep?</div>
          <div class="title-line"></div>
        </div>
        <div class="text">
          Easyrep adalah platform online yang memudahkan warga untuk melaporkan masalah infrastruktur di lingkungan mereka, seperti jalan rusak, lampu jalan mati, atau fasilitas umum lainnya yang perlu diperbaiki. Dengan antarmuka yang
          mudah digunakan dan proses pelaporan yang cepat, EZRep memastikan setiap laporan langsung diteruskan ke pihak berwenang untuk tindakan segera.
        </div>
      </div>

      <div class="tentang-container">
        <div class="tentang">
          <div class="tentang-content">
            <h1>Visi</h1>
            <p> Visi kami adalah menciptakan lingkungan yang lebih baik dan berkelanjutan dengan memanfaatkan teknologi untuk memberdayakan masyarakat dalam pelaporan dan penanganan kerusakan.</p>
          </div>
        </div>
        <div class="tentang">
          <div class="tentang-content">
            <h1>Misi</h1>
            <p>
              Misi kami adalah menyediakan platform yang dapat diandalkan dan mudah digunakan untuk melaporkan setiap kerusakan dengan detail yang jelas dan dokumentasi yang akurat. Kami berkomitmen untuk bekerja sama dengan pemerintah,
              lembaga, dan masyarakat umum untuk mencapai lingkungan yang lebih baik.
            </p>
          </div>
        </div>
      </div>
      <div class="containeer">
        <div class="text-wrapper">
          <div class="text-content">
            <span>Setiap laporan yang Anda buat merupakan langkah kecil </span>
            <span>yang berarti untuk menciptakan perubahan baru.</span>
          </div>
        </div>
        <div class="button-wrapper">
          <div class="button">Laporkan kerusakan</div>
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
                  <a href="./landingpage.tsx">Beranda</a>
                </li>
                <li>
                  <a href="#about">Tentang</a>
                </li>
                <li>
                  <a href="#tatacara">Tata Cara</a>
                </li>
                <li>
                  <a href="#contact">Kontak</a>
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
