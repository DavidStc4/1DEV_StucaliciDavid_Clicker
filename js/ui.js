export function showMessage(text, type = 'error') {
  const messageBox = document.getElementById('messageBox');
  messageBox.innerText = text;
  messageBox.style.backgroundColor = type === 'success' ? '#66bb6a' : '#ef5350';
  messageBox.classList.remove('hidden', 'fade-out');
  messageBox.classList.add('show');
  // adaugarea clasei show pentru a afisa mesajul si a-l face vizibil

  setTimeout(() => {
    messageBox.classList.remove('show');
    setTimeout(() => messageBox.classList.add('hidden'), 400);
  }, 3000); // 3 secunde e mesaj eror ca nu poti cumpara motanul
}

export function notifyUser(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 500);
  }, 3000); // 3 secunde pentru a disparea toast-ul ca dat unlock
}

export function openAchievementPopup(achievement) { // deschiderea popup-ului de achievement
  const popup = document.getElementById('achievementPopup');
  const popupTitle = document.getElementById('popupTitle');
  const popupDescription = document.getElementById('popupDescription'); 
  const popupImage = document.getElementById('test');
 // adaugarea titlului si a descrierii in popup
  popupTitle.textContent = achievement.name;
  popupDescription.textContent = achievement.description ||
    (achievement.unlocked
      ? achievement.description
      : 'Achievement locked. Keep clicking to unlock!');
      // verificarea achievement-ului si a descrierii

  if (achievement.name.includes('Freed')) {
    popup.classList.add('cat-popup');
  } else {
    popup.classList.remove('cat-popup');
  }

  popup.classList.remove('hidden'); 
} 


export function closePopup() {
  document.getElementById('achievementPopup').classList.add('hidden'); // inchiderea popup-ului
}
