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

(function() {
  const source = Array.from(document.querySelectorAll('#workSource img'));
  if (!source.length) return;

  let i = 0;                   // active index (center)
  const total = source.length;

  // Slots
  const imgPrev   = document.getElementById('slidePrev');
  const imgActive = document.getElementById('slideActive');
  const imgNext   = document.getElementById('slideNext');

  // Caption targets (describe ACTIVE slide)
  const oTitle = document.getElementById('oTitle');
  const oRole  = document.getElementById('oRole');
  const oDesc  = document.getElementById('oDesc');
  const oLink  = document.getElementById('oLink');

  const track = document.getElementById('showcase');
  let sliding = false, timer;

  function idx(n){ return (n + total) % total; }

  function apply() {
    const prev = source[idx(i - 1)];
    const curr = source[idx(i)];
    const next = source[idx(i + 1)];

    imgPrev.src   = prev.src;  imgPrev.alt   = prev.alt || '';
    imgActive.src = curr.src;  imgActive.alt = curr.alt || '';
    imgNext.src   = next.src;  imgNext.alt   = next.alt || '';

    oTitle.textContent = curr.dataset.title || '';
    oRole.textContent  = curr.dataset.role  || '';
    oDesc.textContent  = curr.dataset.desc  || '';
    const href = curr.dataset.link || '#';
    oLink.href = href;
    oLink.style.display = href === '#' ? 'none' : 'inline-block';
  }

  function slide(dir = 1) {
    if (sliding) return;
    sliding = true;

    // animate track by one pane (33.333…%)
    const delta = dir === 1 ? '-33.3333%' : '33.3333%';
    track.style.transform = `translateX(${delta})`;

    track.addEventListener('transitionend', () => {
      // update index, swap images, and snap back to 0 (no visible jump)
      i = idx(i + (dir === 1 ? 1 : -1));
      apply();
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      // force reflow, then restore transition for next slide
      void track.offsetWidth;
      track.style.transition = 'transform 560ms cubic-bezier(.25,.8,.25,1)';
      sliding = false;
    }, { once: true });
  }

  function next(){ slide(1); }
  function prev(){ slide(-1); }

  // autoplay (pause on hover)
  function start(){ timer = setInterval(next, 6000); }
  function stop(){ clearInterval(timer); }
  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);

  // init
  apply();
  start();

  // If you have Prev/Next buttons uncomment:
  // document.getElementById('prevBtn')?.addEventListener('click', () => { stop(); prev(); start(); });
  // document.getElementById('nextBtn')?.addEventListener('click', () => { stop(); next(); start(); });
})();

