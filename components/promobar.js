
class PromoBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #D4AF37;
          color: #000;
          text-align: center;
          padding: 0.5rem;
          font-size: 0.9rem;
          cursor: pointer;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1001;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          height: 28px;
          box-sizing: border-box;
        }
        :host(:hover) {
          opacity: 0.9;
        }
      </style>
      <div><strong>🎁 Brindes & Descontos </strong></div>
    `;
    
    this.addEventListener('click', this.showModal);
  }

  showModal() {
    const modal = document.createElement('div');
    modal.className = 'promo-modal';
    modal.innerHTML = `
      <style>
        .promo-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          opacity: 0;
          animation: fadeIn 0.3s forwards;
          backdrop-filter: blur(2px);
        }
        .modal-content {
          background: #0a0a0a;
          color: white;
          border-radius: 8px;
          border: 1px solid #D4AF37;
          padding: 1.5rem;
          max-width: 320px;
          width: 90%;
          text-align: center;
          position: relative;
          margin-top: -60px; /* Offset for navbar */
        }
        .modal-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: #D4AF37;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }
        .modal-text {
          margin-bottom: 1.5rem;
          line-height: 1.5;
          font-size: 0.95rem;
        }
        .modal-footer {
          font-size: 0.8rem;
          color: #aaa;
          margin-bottom: 1.5rem;
          font-style: italic;
        }
        .modal-button {
          background: #D4AF37;
          color: black;
          border: none;
          border-radius: 4px;
          padding: 0.75rem 1rem;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s ease;
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
        }
        .modal-button:hover {
          background: #e6c766;
          transform: translateY(-1px);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      </style>
      <div class="modal-content">
        <div class="modal-title">Brindes e Descontos</div>
        <div class="modal-text">
          Ao finalizar seu pedido, pergunte ao atendente se há possibilidade de desconto ou brinde.
        </div>
        <div class="modal-footer">
          Condições variam conforme disponibilidade.
        </div>
        <button class="modal-button">Entendi</button>
      </div>
`;

    const closeModal = () => {
      modal.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => modal.remove(), 300);
    };

    modal.querySelector('.modal-button').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.body.appendChild(modal);
  }
}

customElements.define('promo-bar', PromoBar);