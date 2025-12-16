class CustomFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const year = new Date().getFullYear();
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #0a0a0a;
          color: white;
          padding: 2rem 1rem;
          text-align: center;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        .copyright {
          margin-bottom: 1rem;
          font-size: 0.9rem;
          opacity: 0.8;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 1rem;
        }
        .footer-links a {
          color: white;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: #D4AF37;
        }
        @media (max-width: 480px) {
          .footer-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      </style>
      <div class="footer-content">
        <div class="copyright">© Crescer Rápido — Todos os direitos reservados ${year}</div>
        <div class="footer-links">
          <a href="termos.html">Termos de Uso</a>
          <a href="termos-compra.html">Termos de Compra</a>
          <a href="privacidade.html">Política de Privacidade</a>
          <a href="aviso-legal.html">Aviso Legal</a>
        </div>
</div>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);