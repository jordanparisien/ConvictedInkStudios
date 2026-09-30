(() => {
  const video = document.querySelector('.hero-video');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  function syncVideo() {
    const posterOnly = reduced.matches;
    video.classList.toggle('poster-only', !!posterOnly);
    if (posterOnly) {
      video.pause();
      if (video.querySelector('source').hasAttribute('src')) {
        video.querySelector('source').removeAttribute('src');
        video.load();
      }
    } else {
      const source = video.querySelector('source');
      if (!source.hasAttribute('src')) { source.src = source.dataset.src; video.load(); }
      video.play().catch(() => {});
    }
  }
  syncVideo();
  reduced.addEventListener('change', syncVideo);

  const links = [...document.querySelectorAll('.gallery .frame')];
  const dialog = document.querySelector('.lightbox');
  const img = dialog.querySelector('img');
  const source = dialog.querySelector('source');
  let index = 0, opener, previousOverflow;
  function show(next) {
    index = (next + links.length) % links.length;
    source.srcset = links[index].dataset.webp;
    img.src = links[index].href;
    img.alt = links[index].querySelector('img').alt;
    dialog.querySelector('.lightbox-caption').textContent = links[index].closest('figure').querySelector('figcaption').textContent + ` · ${index + 1} / ${links.length}`;
  }
  function close() { dialog.close(); }
  links.forEach((link, i) => link.addEventListener('click', event => {
    event.preventDefault(); opener = link; show(i); previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; dialog.showModal();
  }));
  dialog.querySelector('.lightbox-close').addEventListener('click', close);
  dialog.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
  dialog.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
  dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; opener?.focus(); });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom || event.target.classList.contains('lightbox-inner')) close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
  });
  let startX, startY;
  dialog.addEventListener('touchstart', event => { startX = event.changedTouches[0].clientX; startY = event.changedTouches[0].clientY; }, {passive:true});
  dialog.addEventListener('touchend', event => {
    const dx = event.changedTouches[0].clientX - startX, dy = event.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
  }, {passive:true});
})();
