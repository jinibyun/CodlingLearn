const fetchBtn = document.getElementById('fetchBtn');
const dogImage = document.getElementById('dogImage');
const loadingText = document.getElementById('loadingText');
const placeholder = document.getElementById('placeholder');

const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';


function showLoading() {
  placeholder.classList.add('hidden');
  dogImage.classList.add('hidden');
  loadingText.classList.remove('hidden');
  fetchBtn.disabled = true;
}

function showImage(url) {
  dogImage.src = url;
  dogImage.onload = () => {
    loadingText.classList.add('hidden');
    dogImage.classList.remove('hidden');
    fetchBtn.disabled = false;
  };
  dogImage.onerror = () => {
    loadingText.classList.add('hidden');
    placeholder.textContent = '이미지를 불러오지 못했어요. 다시 시도해 주세요.';
    placeholder.classList.remove('hidden');
    fetchBtn.disabled = false;
  };
}

async function fetchDog() {
  showLoading();
  try {
    const response = await fetch(DOG_API_URL);
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    showImage(data.message);
  } catch {
    loadingText.classList.add('hidden');
    placeholder.textContent = '네트워크 오류가 발생했어요. 다시 시도해 주세요.';
    placeholder.classList.remove('hidden');
    fetchBtn.disabled = false;
  }
}

fetchBtn.addEventListener('click', fetchDog);
