const wedding = new Date('2026-08-29T00:00:00');

function updateDays() {
  const now = new Date();
  const diff = wedding - now;
  const days = diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  document.getElementById('days-count').textContent = days;
}

updateDays();
setInterval(updateDays, 60 * 1000);
