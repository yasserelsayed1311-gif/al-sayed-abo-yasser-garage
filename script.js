/* ============================================================
   السيد ابو ياسر — Site interactions
   ============================================================ */

/* ---------- Mobile menu ---------- */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );
}

/* ---------- Booking form → WhatsApp ---------- */
const bookingForm = document.querySelector('#booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = (form.get('name') || '').trim();
    const phone = (form.get('phone') || '').trim();
    const service = form.get('service') || 'لم يتم تحديدها';
    const message = (form.get('message') || '').trim();
    const body = `طلب حجز — مركز السيد ابو ياسر\nالاسم: ${name}\nرقم العميل: ${phone}\nالخدمة: ${service}${message ? `\nالتفاصيل: ${message}` : ''}`;
    const encoded = encodeURIComponent(body);
    const numbers = ['201221240531', '201201830807'];
    numbers.forEach(number =>
      window.open(`https://wa.me/${number}?text=${encoded}`, '_blank', 'noopener,noreferrer')
    );
    document.querySelector('#form-note').textContent =
      'فتحنا واتساب للرقمين برسالة جاهزة. اضغط «إرسال» في كل محادثة لتأكيد وصول الحجز.';
  });
}

/* ---------- Gallery lightbox ---------- */
(function initLightbox() {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const box = document.getElementById('lightbox');
  if (!items.length || !box) return;

  const lbImg = box.querySelector('.lb-img');
  const lbCap = box.querySelector('.lb-cap');
  const btnClose = box.querySelector('.lb-close');
  const btnPrev = box.querySelector('.lb-prev');
  const btnNext = box.querySelector('.lb-next');
  let current = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    const item = items[current];
    const img = item.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = item.dataset.caption || img.alt || '';
    box.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function hide() {
    box.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  items.forEach((item, i) =>
    item.addEventListener('click', () => show(i))
  );
  btnClose.addEventListener('click', hide);
  btnPrev.addEventListener('click', e => { e.stopPropagation(); show(current - 1); });
  btnNext.addEventListener('click', e => { e.stopPropagation(); show(current + 1); });

  box.addEventListener('click', e => { if (e.target === box) hide(); });

  document.addEventListener('keydown', e => {
    if (box.hidden) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowRight') show(current - 1);
    if (e.key === 'ArrowLeft') show(current + 1);
  });
})();
