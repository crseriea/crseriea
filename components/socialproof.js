class SocialProofPopup extends HTMLElement {
  constructor() {
    super();
    this.services = [
      "1.000 Seguidores no Instagram",
      "2.000 Curtidas no Instagram", 
      "5.000 Visualizações no Instagram",
      "10.000 Seguidores no Instagram",
      "50.000 Visualizações no Instagram",
      "100 Comentários personalizados",
      "5.000 Seguidores no TikTok",
      "10.000 Curtidas no TikTok",
      "100.000 Visualizações no TikTok",
      "500 Salvamentos no TikTok",
      "1.000 Comentários no TikTok",
      "1 hora de Visualizações em LIVE",
      "2 horas de Visualizações em LIVE",
      "5.500 Seguidores no Instagram"
    ];
    this.timeTexts = [
      "há poucos segundos",
      "há 1 minuto",
      "há 2 minutos",
      "há 22 minutos",
      "há 5 minutos",
      "há 8 minutos",
      "há 35 minutos",
      "há 1 hora",
      "há 2 horas"
    ];
this.visible = false;
    this.timeout = null;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: 1.5rem;
          left: 1.5rem;
          z-index: 40;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
          pointer-events: none;
        }
        :host(.visible) {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .popup {
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border-left: 3px solid #D4AF37;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 250px;
        }
        .popup-title {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        .popup-time {
          font-size: 0.75rem;
          color: #aaa;
        }
        .close-btn {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          background: none;
          border: none;
          color: #aaa;
          font-size: 0.7rem;
          cursor: pointer;
          padding: 0.25rem;
        }
      </style>
      <div class="popup">
        <button class="close-btn">✕</button>
        <div class="popup-title"></div>
        <div class="popup-time"></div>
      </div>
    `;

    this.closeBtn = this.shadowRoot.querySelector('.close-btn');
    this.popupTitle = this.shadowRoot.querySelector('.popup-title');
    this.popupTime = this.shadowRoot.querySelector('.popup-time');

    this.closeBtn.addEventListener('click', () => this.hide());
    this.startCycle();
  }

  showRandomNotification() {
    const randomService = this.services[Math.floor(Math.random() * this.services.length)];
    const randomTime = this.timeTexts[Math.floor(Math.random() * this.timeTexts.length)];
    
    this.popupTitle.textContent = `Alguém acabou de comprar ${randomService}`;
    this.popupTime.textContent = randomTime;
    
    this.classList.add('visible');
    this.visible = true;
    
    // Auto-hide after 4-6 seconds
        const hideDelay = 5000 + Math.random() * 5000;
this.timeout = setTimeout(() => this.hide(), hideDelay);
  }

  hide() {
    this.classList.remove('visible');
    this.visible = false;
    clearTimeout(this.timeout);
  }

  startCycle() {
    const showNotification = () => {
      if (!this.visible) {
        this.showRandomNotification();
      }
      // Schedule next notification in 5-30 seconds
      const nextDelay = 5000 + Math.random() * 25000;
setTimeout(showNotification, nextDelay);
    };
    
    // Initial delay before first notification
    setTimeout(showNotification, 5000);
  }
}

customElements.define('social-proof-popup', SocialProofPopup);