document.querySelectorAll('.accordion').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      const panel = button.nextElementSibling;
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }
    });
  });


  document.querySelectorAll('.flip-card__inner').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('is-flipped');
      const expanded = btn.classList.contains('is-flipped');
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

