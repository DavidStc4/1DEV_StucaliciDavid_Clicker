import { cats, state } from './data.js';
import { updateClickDisplay } from './clicks.js';
import { showMessage, openAchievementPopup } from './ui.js';
import { checkAchievements } from './achievements.js';

export function renderCatShop() {
  const list = document.getElementById('catList');
  list.innerHTML = ''; // facem lista pustie pentru ca se incarce mai repede in browser

  cats.forEach((cat, index) => {
    const div = document.createElement('div');
    div.className = 'cat-item';

    if (cat === state.currentCat) div.classList.add('selected');
    else if (cat.unlocked) div.classList.add('owned');
    else if (state.clickCount >= cat.cost) div.classList.add('buyable');// 3 staturi a unui motan in shop

    div.innerHTML = `
      <div class="cat-wrapper">
        <img class="cat-img" src="${cat.img}" alt="${cat.name}">
        <img class="prison-bars ${cat.unlocked ? 'hidden' : ''}" src="assets/prisonBars.png" alt="bars">
      </div>
      <div>${cat.name}</div>
      <div>${cat.unlocked ? 'Click to select' : `Cost: ${cat.cost}`}</div>
    `;//afisarea numelui, costului si a imaginii, verificarea de jail si verificarea de lock/unlock

    div.onclick = () => { //verificarea click-ului pe un motan
      if (cat.unlocked) {
        selectCat(index);
      } else if (state.clickCount >= cat.cost) {
        state.clickCount -= cat.cost;
        cats[index].unlocked = true;
        selectCat(index);
        checkAchievements(state.clickCount);
        const rescueMessages = [
  "Finally... someone realized I just wanted to be somewhere. Okay, thanks. I guess.",
  "You're saving me from eating broccoli forever... Thank you! Now I can smile again, albeit in a weird way ",
  "Finally... someone realized I just wanted to be somewhere. Okay, thanks. I guess.",
  "I stood alone in this empty world... until you came along. Thank you, now I can walk! ",
  "Together we spin into destiny. Thank you for freeing me, chosen one. " // deblocam motan dupa index, cumparam motanul, scadem costul din clickuri, verificam achievement-urile si afisam mesajul de salvare
];

openAchievementPopup({
  name: `${cat.name} Freed!`,
  description: rescueMessages[index] || "You've rescued this cat!" 
});
      } else {
        showMessage(`Not enough clicks to buy ${cat.name}`, 'error');
      }

      renderCatShop();
      updateClickDisplay();
    };

    list.appendChild(div); //adaugam div in dom(lista de motani)
    
    if (cat.unlocked) {
      const bars = div.querySelector('.prison-bars');
      if (bars && !bars.classList.contains('hidden')) {
        bars.classList.add('animate-exit');
        setTimeout(() => bars.remove(), 600);
      }
    }
  });
} // afisarea shop-ului de motani, adaugarea claselor pentru a putea fi stilizate in css, adaugarea click-ului pe motan, afisarea mesajului de salvare a motanului, etc.


export function selectCat(index) {
  state.currentCat = cats[index]; //schimbarea motanului curent in functie de indexul ales
  document.getElementById('mainCatImage').src = state.currentCat.img;
} //cartinca se schimba cand alegi motan nou dupa index
