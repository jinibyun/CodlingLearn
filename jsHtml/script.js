const clockElement = document.getElementById('clock');

function formatTwoDigits(value) {
  return String(value).padStart(2, '0');
}

function updateClock() {
  const now = new Date();
  const hours = formatTwoDigits(now.getHours());
  const minutes = formatTwoDigits(now.getMinutes());
  const seconds = formatTwoDigits(now.getSeconds());

  clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);
