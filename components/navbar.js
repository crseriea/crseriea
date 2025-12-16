class CustomNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 28px;
          left: 0;
          right: 0;
          z-index: 1000;
          background-color: #0a0a0a;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          height: 40px;
        }
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
          max-width: 1200px;
          margin: 0 auto;
          height: 100%;
        }
        .logo {
          color: #D4AF37;
          font-weight: 700;
          font-size: 1.2rem;
          text-decoration: none;
          white-space: nowrap;
        }
        .nav-links {
          display: flex;
          gap: 1.5rem;
          height: 100%;
          align-items: center;
        }
        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
          white-space: nowrap;
        }
.nav-links a:hover {
          color: #D4AF37;
        }
        .menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          background-color: #1a1a1a;
          padding: 1rem;
          position: fixed;
          top: 98px; /* navbar + promobar height */
          left: 0;
          right: 0;
          z-index: 1000;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }
.mobile-menu a {
          color: white;
          text-decoration: none;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .mobile-menu a:last-child {
          border-bottom: none;
        }
        @media (max-width: 768px) {
          nav {
            padding: 0 1rem;
          }
          .nav-links {
            display: none;
          }
          .menu-btn {
            display: block;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
          }
        }
      </style>
<nav>
  <a href="/crseriea/index.html" class="logo">Crescer Rápido</a>

  <div class="nav-links">
    <a href="/crseriea/index.html">Início</a>
    <a href="/crseriea/instagram.html">Instagram</a>
    <a href="/crseriea/tiktok.html">TikTok</a>
    <a href="/crseriea/others.html">Outras Redes</a>
    <a href="/crseriea/contato.html">Contato</a>
  </div>

  <button class="menu-btn" aria-label="Menu">☰</button>

  <div class="mobile-menu">
    <a href="/crseriea/index.html">Início</a>
    <a href="/crseriea/instagram.html">Instagram</a>
    <a href="/crseriea/tiktok.html">TikTok</a>
    <a href="/crseriea/others.html">Outras Redes</a>
    <a href="/crseriea/contato.html">Contato</a>
  </div>
</nav>
`;

    this.menuBtn = this.shadowRoot.querySelector('.menu-btn');
    this.mobileMenu = this.shadowRoot.querySelector('.mobile-menu');

    this.menuBtn.addEventListener('click', () => {
      const isOpen = this.mobileMenu.style.display === 'flex';
      this.mobileMenu.style.display = isOpen ? 'none' : 'flex';
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);
