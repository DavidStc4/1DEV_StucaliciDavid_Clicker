import { state } from './data.js';
import { checkAchievements } from './achievements.js';
import { renderCatShop } from './cats.js';
import { clickSound, soundOn } from './script.js';
import { checkBuffUnlock } from './buffsUnlock.js'; 

export function incrementCat(showAnimation = true) { //atunci cand dai click  pe pisica1) clickcount preia value la pisica curenta apoi se face update la clickdisplay
  state.clickCount += state.currentCat.clickValue; // adaugarea clicului dupa ce motan si valuoarea lui
  updateClickDisplay();
  checkBuffUnlock();  // verificarea buff-ului de autoclicker
  checkAchievements(state.clickCount);

  if (soundOn) {
    clickSound.currentTime = 0;
    clickSound.play();
  }

  if (showAnimation) createPlusOne();
  renderCatShop();
}

export function updateClickDisplay() {
  document.querySelector('.cat-cost').innerText = state.clickCount;
}

export function createPlusOne() { 
  const plusOne = document.createElement('div'); 
  plusOne.innerText = `+${state.currentCat.clickValue}`; // afisarea click-ului de valuarea motanului
  plusOne.classList.add('plus-one'); // adaugarea clasei plus one pentru a putea fi stilizat in css
  document.body.appendChild(plusOne); 

  const x = Math.random() * window.innerWidth * 0.8; // face animatia de +1 pe pagina in diapazonul calculat dintreecranul de browser, 80% din latimea ferestrei, nr random intre 0 si 1
  const y = Math.random() * window.innerHeight * 0.8; 
  plusOne.style.left = `${x}px`;
  plusOne.style.top = `${y}px`;

  setTimeout(() => plusOne.remove(), 1000);// 1 secunda pentru a disparea animatia
}
