import './home.css';
import './menu.css';
import './contact.css';
import { renderHome } from './home.js';
import { renderMenu } from './menu.js';
import { renderContact } from './contact.js';

function switchPage() {
  const btns = document.querySelectorAll('.btn');
  const content = document.getElementById('content');

  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      content.innerHTML = '';

      if (e.target.classList.contains('home')) {
        renderHome();
      } else if (e.target.classList.contains('menu')) {
        renderMenu();
      } else if (e.target.classList.contains('contact')) {
        renderContact();
      }
    });
  });
}

switchPage();
renderHome();