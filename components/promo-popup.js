class PromoPopup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('promoPopupShown');
    
    if (!popupShown) {
      setTimeout(() => {
        this.showPopup();
        sessionStorage.setItem('promoPopupShown', 'true');
      }, 1000); // Show after 1 second
    }

    this.initTimer();
  }

  initTimer() {
    // Initialize persistent timer
    const savedEndTime = localStorage.getItem('promoEndTime');
    const now = Date.now();

    if (!savedEndTime || now > parseInt(savedEndTime)) {
      // Set new timer for 20 minutes
      const endTime = now + (20 * 60 * 1000);
      localStorage.setItem('promoEndTime', endTime.toString());
    }
  }

  showPopup() {
    this.shadowRoot.innerHTML = `
      <style>
        .promo-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease-out;
          backdrop-filter: blur(3px);
        }

        .promo-popup-content {
          background: linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%);
          border: 2px solid #D4AF37;
          border-radius: 12px;
          padding: 2rem;
          max-width: 450px;
          width: 90%;
          text-align: center;
          position: relative;
          box-shadow: 0 10px 40px rgba(212, 175, 55, 0.3);
          animation: slideUp 0.4s ease-out;
        }

        .promo-header {
          margin-bottom: 1.5rem;
        }

        .promo-badge {
          display: inline-block;
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
          color: #000;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1rem;
          animation: pulse 2s infinite;
        }

        .promo-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #FFD700;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
        }

        .promo-subtitle {
          font-size: 1.1rem;
          color: #fff;
          margin-bottom: 1.5rem;
          line-height: 1.5;
          font-weight: 500;
        }

        .promo-timer-container {
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .promo-timer-label {
          font-size: 0.85rem;
          color: #D4AF37;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .promo-timer {
          font-size: 2rem;
          font-weight: 700;
          color: #FFD700;
          font-family: 'Courier New', monospace;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }

        .promo-buttons {
          display: flex;
          gap: 0.8rem;
          margin-top: 1.5rem;
        }

        .promo-btn {
          flex: 1;
          padding: 0.9rem 1.2rem;
          border: none;
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .promo-btn-primary {
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
          color: #000;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
        }

        .promo-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
        }

        .promo-btn-secondary {
          background: transparent;
          color: #D4AF37;
          border: 2px solid #D4AF37;
        }

        .promo-btn-secondary:hover {
          background: rgba(212, 175, 55, 0.1);
          transform: translateY(-2px);
        }

        .promo-urgency {
          font-size: 0.8rem;
          color: #ff6b6b;
          margin-top: 1rem;
          font-weight: 600;
          animation: blink 2s infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes blink {
          0%, 50%, 100% {
            opacity: 1;
          }
          25%, 75% {
            opacity: 0.5;
          }
        }

        @media (max-width: 480px) {
          .promo-popup-content {
            padding: 1.5rem;
          }

          .promo-title {
            font-size: 1.3rem;
          }

          .promo-subtitle {
            font-size: 0.95rem;
          }

          .promo-timer {
            font-size: 1.6rem;
          }

          .promo-buttons {
            flex-direction: column;
          }
        }
      </style>

      <div class="promo-popup-overlay">
        <div class="promo-popup-content">
          <div class="promo-header">
            <div class="promo-badge">🔥 Oferta Limitada</div>
            <h2 class="promo-title">PROMOÇÃO POR TEMPO LIMITADO</h2>
            <p class="promo-subtitle">Corra! Temos promoções limitadas ativas!</p>
          </div>

          <div class="promo-timer-container">
            <div class="promo-timer-label">⏰ Tempo Restante:</div>
            <div class="promo-timer" id="popupTimer">20:00</div>
          </div>

          <div class="promo-buttons">
            <button class="promo-btn promo-btn-secondary" id="closePopupBtn">OK</button>
            <button class="promo-btn promo-btn-primary" id="viewPromosBtn">🎁 VER PROMOÇÕES</button>
          </div>

          <p class="promo-urgency">⚡ Não perca esta oportunidade única!</p>
        </div>
      </div>
    `;

    this.startTimer();
    this.attachEventListeners();
  }

  startTimer() {
    const timerEl = this.shadowRoot.getElementById('popupTimer');
    if (!timerEl) return;

    const updateTimer = () => {
      const endTime = parseInt(localStorage.getItem('promoEndTime'));
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);

      timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      if (remaining <= 0) {
        // Reset timer
        const newEndTime = Date.now() + (20 * 60 * 1000);
        localStorage.setItem('promoEndTime', newEndTime.toString());
      }
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  attachEventListeners() {
    const closeBtn = this.shadowRoot.getElementById('closePopupBtn');
    const viewBtn = this.shadowRoot.getElementById('viewPromosBtn');
    const overlay = this.shadowRoot.querySelector('.promo-popup-overlay');

    closeBtn.addEventListener('click', () => this.closePopup());
    
    viewBtn.addEventListener('click', () => {
      // Check if we're on instagram.html page
      if (window.location.pathname.includes('instagram.html')) {
        this.closePopup();
        setTimeout(() => {
          document.getElementById('promo-section')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 300);
      } else {
        // Redirect to instagram page with hash
        window.location.href = '/crseriea/instagram.html#promocoes';
      }
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.closePopup();
      }
    });
  }

  closePopup() {
    const overlay = this.shadowRoot.querySelector('.promo-popup-overlay');
    if (overlay) {
      overlay.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => {
        this.shadowRoot.innerHTML = '';
      }, 300);
    }
  }
}

customElements.define('promo-popup', PromoPopup);
