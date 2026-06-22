/* Fade-in on scroll */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* Filter tabs */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('.media-item').forEach(item => {
            const show = f === 'all' || item.dataset.category === f;
            item.style.transition = 'opacity 0.4s, transform 0.4s';
            item.style.opacity = show ? '1' : '0';
            item.style.transform = show ? 'scale(1)' : 'scale(0.95)';
            item.style.pointerEvents = show ? 'auto' : 'none';
            setTimeout(() => {
                item.style.display = show ? 'block' : 'none';
                if (show) { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }
            }, show ? 0 : 380);
        });
    });
});

/* Lightbox — clicks are bound automatically, no manual index needed */
const allItems = Array.from(document.querySelectorAll('.media-item'));
let currentIdx = 0;

allItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));

function openLightbox(idx) {
    currentIdx = idx;
    renderLightbox(idx);
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function renderLightbox(idx) {
    const item = allItems[idx];
    const caption = item.dataset.caption || '';
    const tag = (item.querySelector('.media-tag') || {}).textContent || '';
    const video = item.querySelector('video');
    const img = item.querySelector('img');
    const lb = document.getElementById('lightboxContent');
    lb.innerHTML = video
        ? `<video src="${video.src}" controls autoplay style="max-width:100%;max-height:75vh;"></video>`
        : `<img src="${img.src}" alt="${caption}" />`;
    document.getElementById('lightboxCaption').textContent = caption;
    document.getElementById('lightboxTag').textContent = tag;
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
    document.getElementById('lightboxContent').innerHTML = '';
}
function closeLightboxBg(e) { if (e.target === document.getElementById('lightbox')) closeLightbox(); }
function navLightbox(dir) {
    const visible = allItems.filter(i => i.style.display !== 'none');
    const ci = visible.indexOf(allItems[currentIdx]);
    const next = (ci + dir + visible.length) % visible.length;
    currentIdx = allItems.indexOf(visible[next]);
    renderLightbox(currentIdx);
}
document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navLightbox(1);
    if (e.key === 'ArrowLeft') navLightbox(-1);
});