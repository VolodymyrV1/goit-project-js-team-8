document.querySelector('.events-section')?.addEventListener('click', e => {
  const btn = e.target.closest('.js-register');
  if (!btn) return;

  window.dispatchEvent(new CustomEvent('open-register-modal'));
});

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.querySelector('.modal.modal-contacts');
  const closeBtn = modal?.querySelector('.modal_close-btn');
  const form = modal?.querySelector('#contactForm');

  if (!modal || !closeBtn) return;

  window.addEventListener('open-register-modal', function () {
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  });

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    if (form) form.reset();
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      const requiredFields = form.querySelectorAll('input[required]');

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('invalid');
          isValid = false;
        } else {
          field.classList.remove('invalid');
        }
      });

      if (isValid) {
        console.log('Форма отправлена!');
        closeModal();
      }
    });
    form.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', function () {
        this.classList.remove('invalid');
      });
    });
  }
});
