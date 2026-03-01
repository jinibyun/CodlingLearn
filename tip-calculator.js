const priceInput = document.getElementById('price');
const tipButtons = document.querySelectorAll('.tip-btn');
const totalPriceElement = document.getElementById('totalPrice');
const hstAmountElement = document.getElementById('hstAmount');

let selectedTip = 10;

function formatCAD(value) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function calculateTotal() {
  let basePrice = Number(priceInput.value) || 0;
  
  // 0 미만의 값은 0으로 강제 설정
  if (basePrice < 0) {
    basePrice = 0;
    priceInput.value = 0;
  }
  
  const hst = basePrice * 0.13;
  const priceWithHST = basePrice + hst;
  const tip = priceWithHST * (selectedTip / 100);
  const totalPrice = priceWithHST + tip;
  
  hstAmountElement.textContent = formatCAD(hst);
  totalPriceElement.textContent = formatCAD(totalPrice);
}

function setActiveButton(clickedButton) {
  tipButtons.forEach((button) => {
    button.classList.toggle('active', button === clickedButton);
  });
}

tipButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedTip = Number(button.dataset.tip);
    setActiveButton(button);
    calculateTotal();
  });
});

priceInput.addEventListener('input', calculateTotal);

if (tipButtons.length > 0) {
  setActiveButton(tipButtons[0]);
}
calculateTotal();
