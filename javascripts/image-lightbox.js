(() => {
  let lightbox;
  let lightboxImage;
  let lightboxCaption;
  let closeButton;
  let lastTrigger = null;

  function ensureLightbox() {
    if (lightbox) return;

    lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Kép nagyított nézete');

    const panel = document.createElement('div');
    panel.className = 'image-lightbox__panel';

    closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'image-lightbox__close';
    closeButton.setAttribute('aria-label', 'Nagyított kép bezárása');
    closeButton.textContent = '×';

    lightboxImage = document.createElement('img');
    lightboxImage.className = 'image-lightbox__image';
    lightboxImage.alt = '';

    lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'image-lightbox__caption';

    panel.append(closeButton, lightboxImage, lightboxCaption);
    lightbox.append(panel);
    document.body.append(lightbox);

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  function openLightbox(image) {
    ensureLightbox();
    lastTrigger = image;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || '';

    const figure = image.closest('figure');
    const caption = figure?.querySelector('figcaption')?.textContent?.trim() || image.alt || '';
    lightboxCaption.textContent = caption;
    lightboxCaption.hidden = !caption;

    lightbox.classList.add('is-open');
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    lightboxImage.removeAttribute('src');
    if (lastTrigger) lastTrigger.focus();
  }

  function bindZoomableImages(root = document) {
    const images = root.querySelectorAll('.md-content .tool-figure img, .md-content img.zoomable-image');

    images.forEach((image) => {
      if (image.dataset.lightboxBound === 'true') return;
      image.dataset.lightboxBound = 'true';
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `${image.alt || 'Kép'} – nagyítás`);
      image.title = 'Kattints a nagyításhoz!';

      image.addEventListener('click', () => openLightbox(image));
      image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(image);
        }
      });
    });
  }

  if (typeof document$ !== 'undefined') {
    document$.subscribe(() => bindZoomableImages(document));
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => bindZoomableImages(document));
  } else {
    bindZoomableImages(document);
  }
})();
