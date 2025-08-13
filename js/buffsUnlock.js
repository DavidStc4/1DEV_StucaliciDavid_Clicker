import { state } from './data.js';

export function checkBuffUnlock() {
  const secClicker = document.getElementById('autoClickerBtn');
  const buffDot = document.getElementById('buffDot');


  if (!secClicker || !buffDot) { //verificarea daca este o eroare, 
    return; //daca una din ele e falsa apu returnam dar daca amandoua sunt tru at continuam
  }


  if (state.clickCount >= 20 && !secClicker.classList.contains('unlocked')) { //verificarea costului si starii butonului
    secClicker.classList.add('unlocked');
    secClicker.innerText = 'Unlock: Auto Click Cost 20'; //se schimba textul butonului
  }

  if (secClicker.classList.contains('unlocked') && !secClicker.classList.contains('active')) { //verificarea starii butonului
    buffDot.classList.remove('hidden');
  } else {
    buffDot.classList.add('hidden');
  }
}
