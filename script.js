const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const backTop = document.querySelector('.back-top');

window.addEventListener('load', () => document.querySelector('.loader')?.classList.add('loaded'));

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 30);
  backTop?.classList.toggle('visible', window.scrollY > 500);
  document.body.style.setProperty('--parallax-offset', `${window.scrollY * 0.08}px`);
};
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuToggle?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.count);
    const duration = 1300;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = Math.floor(progress * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    observer.unobserve(counter);
  });
}, { threshold: 0.75 });
document.querySelectorAll('[data-count]').forEach((counter) => counterObserver.observe(counter));

/*
  Portfolio catalogue: each image only needs a filter category and image path.
*/
const galleryData = [
 { category: 'wardrobes', image: 'images/wardrobes/wardrobe1.jpeg' },
 { category: 'wardrobes', image: 'images/wardrobes/wardrobe2.jpeg' },
 { category: 'wardrobes', image: 'images/wardrobes/wardrobe3.jpeg' },
 { category: 'wardrobes', image: 'images/wardrobes/wardrobe4.jpeg' },
 { category: 'wardrobes', image: 'images/wardrobes/wardrobe5.jpeg' },
 { category: 'wardrobes', image: 'images/wardrobes/wardrobe6.jpeg' },
 { category: 'wardrobes', image: 'images/wardrobes/wardrobe7.jpeg' },
  { category: 'sliding', image: 'images/sliding/sliding1.jpeg' },
  { category: 'sliding', image: 'images/sliding/sliding2.jpeg' },
  { category: 'sliding', image: 'images/sliding/sliding3.jpeg' },
  { category: 'sliding', image: 'images/sliding/sliding4.jpeg' },
  { category: 'sliding', image: 'images/sliding/sliding5.jpeg' },
  { category: 'sliding', image: 'images/sliding/sliding6.jpeg' },
  { category: 'sliding', image: 'images/sliding/sliding7.jpeg' },
  { category: 'beds', image: 'images/beds/bed1.jpeg' },
  { category: 'beds', image: 'images/beds/bed2.jpeg' },
  { category: 'beds', image: 'images/beds/bed3.jpeg' },
  { category: 'beds', image: 'images/beds/bed4.jpeg' },
  { category: 'beds', image: 'images/beds/bed5.jpeg' },
  { category: 'beds', image: 'images/beds/bed6.jpeg' },
  { category: 'beds', image: 'images/beds/bed7.jpeg' },
  { category: 'beds', image: 'images/beds/bed8.jpeg' },
  { category: 'beds', image: 'images/beds/bed9.jpeg' },
  { category: 'tv', image: 'images/tv/tv1.jpeg' },
  { category: 'tv', image: 'images/tv/tv2.jpeg' },
  { category: 'tv', image: 'images/tv/tv3.jpeg' },
  { category: 'tv', image: 'images/tv/tv4.jpeg' },
  { category: 'tv', image: 'images/tv/tv5.jpeg' },
  { category: 'tv', image: 'images/tv/tv6.jpeg' },
  { category: 'pooja', image: 'images/pooja/pooja1.jpeg' },
  { category: 'pooja', image: 'images/pooja/pooja2.jpeg' },
  { category: 'pooja', image: 'images/pooja/pooja3.jpeg' },
  { category: 'pooja', image: 'images/pooja/pooja4.jpeg' },
  { category: 'pooja', image: 'images/pooja/pooja5.jpeg' },
  { category: 'pooja', image: 'images/pooja/pooja6.jpeg' },
  { category: 'kitchens', image: 'images/kitchens/kitchen1.jpeg' },
  { category: 'kitchens', image: 'images/kitchens/kitchen2.jpeg' },
  { category: 'kitchens', image: 'images/kitchens/kitchen3.jpeg' },
  { category: 'kitchens', image: 'images/kitchens/kitchen4.jpeg' },
  { category: 'kitchens', image: 'images/kitchens/kitchen5.jpeg' },
  { category: 'kitchens', image: 'images/kitchens/kitchen6.jpeg' }
];
const categoryLabels = {
  wardrobes: 'Modular Wardrobes',
  sliding: 'Sliding Wardrobes',
  beds: 'Hydraulic Beds',
  tv: 'TV Units',
  pooja: 'Pooja Units',
  kitchens: 'Modular Kitchens'
};
const galleryGrid = document.querySelector('#portfolio-grid');
const renderGallery = (items) => {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = items.map((project, index) => `
    <button class="project-card reveal ${project.category}" data-filter-category="${project.category}" data-image="${project.image}" data-category="${categoryLabels[project.category]}" aria-label="View ${categoryLabels[project.category]} image">
      <img src="${project.image}" alt="${categoryLabels[project.category]}" loading="lazy">
      <span class="project-caption"><small>${categoryLabels[project.category]}</small><i aria-hidden="true">↗</i></span>
    </button>
  `).join('');
  galleryGrid.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
};
renderGallery(galleryData);

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCategory = lightbox?.querySelector('figcaption span');
let projectCards = [];
const filterButtons = [...document.querySelectorAll('.filter-btn')];
let currentProject = 0;
const visibleProjects = () => projectCards.filter((card) => !card.hidden);
const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.classList.remove('menu-open');
};
const showProject = (index) => {
  projectCards = [...document.querySelectorAll('.project-card')];
  const projects = visibleProjects();
  if (!lightbox || !lightboxImage || !lightboxCategory || !projects.length) return;
  currentProject = (index + projects.length) % projects.length;
  const card = projects[currentProject];
  lightboxImage.src = card.dataset.image;
  lightboxImage.alt = card.querySelector('img')?.alt || 'Furniture image';
  lightboxCategory.textContent = card.dataset.category || '';
  lightbox.hidden = false;
};
const bindProjectCards = () => {
  projectCards = [...document.querySelectorAll('.project-card')];
  projectCards.forEach((card) => card.addEventListener('click', () => showProject(visibleProjects().indexOf(card))));
};
bindProjectCards();
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    projectCards = [...document.querySelectorAll('.project-card')];
    projectCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.filterCategory !== filter;
    });
  });
});
lightbox?.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox?.querySelector('.lightbox-prev').addEventListener('click', () => showProject(currentProject - 1));
lightbox?.querySelector('.lightbox-next').addEventListener('click', () => showProject(currentProject + 1));
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
  if (lightbox && !lightbox.hidden && event.key === 'ArrowLeft') showProject(currentProject - 1);
  if (lightbox && !lightbox.hidden && event.key === 'ArrowRight') showProject(currentProject + 1);
});

const contactForm = document.querySelector('#contact-form');
const whatsappSubmit = document.querySelector('#whatsapp-submit');
const contactStatus = contactForm?.querySelector('.form-status');

// Log native email submissions while allowing the browser to submit to FormSubmit.
contactForm?.addEventListener('submit', () => {
  console.log('Email submission:', Object.fromEntries(new FormData(contactForm).entries()));
});

whatsappSubmit?.addEventListener('click', (event) => {
  event.preventDefault();
  const form = contactForm;
  const status = contactStatus;
  const name = form.querySelector('#name').value.trim();
  const phone = form.querySelector('#phone').value.trim();
  const message = form.querySelector('#message').value.trim();

  // Validate the required customer fields before the WhatsApp submission.
  if (!name || !phone) {
    status.textContent = 'Please enter your name and phone number to continue.';
    return;
  }

  // Generate the WhatsApp message from the enquiry details.
  const whatsappMessage = `New RK Furniture Enquiry\n\nName: ${name}\nPhone: ${phone}\n\nProject Details:\n${message}`;
  const whatsappUrl = `https://wa.me/919731088800?text=${encodeURIComponent(whatsappMessage)}`;

  // Open the pre-filled enquiry in WhatsApp without requiring a backend.
  console.log('WhatsApp submission:', { name, phone, message });
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  form.reset();
  status.textContent = 'Redirecting to WhatsApp...';
});

backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
