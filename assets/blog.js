// Simple client-side category filter
const pills = document.querySelectorAll('.filter-pill');
const cards = document.querySelectorAll('.post-card');
pills.forEach(pill => {
    pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const f = pill.dataset.filter;
        cards.forEach(card => {
            card.style.display = (f === 'all' || card.dataset.cat === f) ? '' : 'none';
        });
    });
});