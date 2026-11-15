/* ========================================================
   Gythaaa - Interactive Scripts
======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. Labs Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const labCards = document.querySelectorAll('.lab-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      labCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'flex';
        } else {
          const categories = card.getAttribute('data-category') || '';
          if (categories.split(' ').includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // Close modals on Escape key or outside click
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLabModal();
      closeCryptoModal();
    }
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeLabModal();
        closeCryptoModal();
      }
    });
  });
});

// 4. Lab Modal Functions
function openLabModal(title, platform, difficulty, description) {
  const modal = document.getElementById('lab-modal');
  const modalTitle = document.getElementById('modal-lab-title');
  const modalPlatform = document.getElementById('modal-lab-platform');
  const modalDiff = document.getElementById('modal-lab-difficulty');
  const modalDesc = document.getElementById('modal-lab-desc');

  if (modalTitle) modalTitle.textContent = title;
  if (modalPlatform) {
    modalPlatform.textContent = platform;
    modalPlatform.className = 'platform-badge';
    if (platform.toLowerCase().includes('hackthebox')) modalPlatform.classList.add('htb');
    else if (platform.toLowerCase().includes('tryhackme')) modalPlatform.classList.add('thm');
    else modalPlatform.classList.add('portswigger');
  }
  if (modalDiff) {
    modalDiff.textContent = difficulty;
    modalDiff.className = 'difficulty-badge';
    const diffLower = difficulty.toLowerCase();
    if (diffLower.includes('easy')) modalDiff.classList.add('easy');
    else if (diffLower.includes('medium') || diffLower.includes('practitioner')) modalDiff.classList.add('medium');
    else modalDiff.classList.add('hard');
  }
  if (modalDesc) modalDesc.textContent = description;

  if (modal) modal.classList.add('active');
}

function closeLabModal() {
  const modal = document.getElementById('lab-modal');
  if (modal) modal.classList.remove('active');
}

// 5. Crypto Donation Modal Functions
function openCryptoModal() {
  const modal = document.getElementById('crypto-modal');
  if (modal) modal.classList.add('active');
}

function closeCryptoModal() {
  const modal = document.getElementById('crypto-modal');
  if (modal) modal.classList.remove('active');
}

// 6. Copy to Clipboard Utility
function copyWallet(inputId, btnElement) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.select();
  input.setSelectionRange(0, 99999); // Mobile compatibility

  navigator.clipboard.writeText(input.value).then(() => {
    const originalText = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
    btnElement.style.borderColor = 'var(--accent-green)';
    btnElement.style.color = 'var(--accent-green)';

    setTimeout(() => {
      btnElement.innerHTML = originalText;
      btnElement.style.borderColor = '';
      btnElement.style.color = '';
    }, 2000);
  }).catch(() => {
    alert('Dirección copiada: ' + input.value);
  });
}
