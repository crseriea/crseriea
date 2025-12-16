document.addEventListener('DOMContentLoaded', function() {
    // Promo bar click handler
    const promoBar = document.getElementById('promoBar');
    const promoModal = document.getElementById('promoModal');
    const closeModal = document.getElementById('closeModal');
    const understandBtn = document.getElementById('understandBtn');

    promoBar.addEventListener('click', function() {
        promoModal.classList.remove('hidden');
        promoModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    });

    function closePromoModal() {
        promoModal.classList.add('hidden');
        promoModal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', closePromoModal);
    understandBtn.addEventListener('click', closePromoModal);

    // Close modal when clicking outside
    promoModal.addEventListener('click', function(e) {
        if (e.target === promoModal) {
            closePromoModal();
        }
    });

    // Initialize feather icons
    feather.replace();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});