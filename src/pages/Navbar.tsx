import { createSignal, onMount } from "solid-js";
import { HiOutlineBars3 } from 'solid-icons/hi';
import logo from "../../public/img/logoweb.png";
import "./Navbar.css";

export default function Navbar() {
    const [loggedInUser, setLoggedInUser] = createSignal<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = createSignal(false);

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen());
    };

    return (
        <section class="landing-page">
            <nav class={`navbar ${isMenuOpen() ? "responsive" : ""}`}>
                <div class="logo">
                    <img src={logo} alt="Logoweb" />
                </div>
                <div class="menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen() ? <HiOutlineBars3 size={24} /> : <HiOutlineBars3 size={24} />} {/* Ikon garis tiga atau silang */}
                </div>
                <div class="close-menu" onClick={toggleMenu}>
                    &times;
                </div>
                <ul class="nav-links">
                    <li>
                        <a href="/">Beranda</a>
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
                            <a href="/register" class="register">
                                Register
                            </a>
                        </>
                    )}
                </div>
            </nav>
        </section>
    );
}
