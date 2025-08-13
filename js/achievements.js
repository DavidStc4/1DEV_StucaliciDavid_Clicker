import { achievements } from './data.js';
import { notifyUser, openAchievementPopup } from './ui.js';
import { state } from './data.js'; // folosirea expoert pentru a accesa datele din alt file, si import pentru a prelua

export function renderAchievements() {  
  const list = document.getElementById('achievementList');
  list.innerHTML = '';   //creaza o lista pustie pentru a se incarca mai repede in pagina
  achievements.forEach(ach => {
    const el = document.createElement('div');
    el.className = 'achievement-item ' + (ach.unlocked ? 'unlocked' : 'locked'); //acgievment item + deschis si nu deschis + ccs dizain. un if mai simplu
    el.textContent = ach.name;
    el.onclick = () => openAchievementPopup(ach);
    list.appendChild(el); //pentru vizualizarea si adaugarea el la list
  });
}

export function checkAchievements(clickCount) {// da check la achievement-uri si daca sunt indeplinite le deblocheaza
  achievements.forEach(ach => {
    if (!ach.unlocked && ach.condition(clickCount)) {
      ach.unlocked = true;
      notifyUser(`Unlocked: ${ach.name}`); 
      renderAchievements();
    }
  });

  if (clickCount >= 1500 && !state.gameCompleted) {
    state.gameCompleted = true;
    openAchievementPopup({
      name: 'You Finished the Game!',
      description: 'Congratulations! You’ve reached 1500 clicks and completed the game. You can still continue playing and rescuing cats! ',
      test: 'You can still continue playing and rescuing cats!'
    });
  }
}
