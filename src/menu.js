import eggImg from './images/foods/egg-attack.jpg';
import baconImg from './images/foods/bacon-overflow.jpg';
import dinerImg from './images/foods/diner-double.jpg';
import oreoImg from './images/foods/oreo-milkshake.jpg';
import strawberryImg from './images/foods/strawberry-milkshake.jpg';
import mangoImg from './images/foods/Mango-Shake-Thumbnail.jpg';

export function renderMenu() {
  const content = document.getElementById('content');
  const h2 = document.createElement('h2');
  const h3Burgers = document.createElement('h3');
  const ulBurgers = document.createElement('ul');
  const h3Shakes = document.createElement('h3');
  const ulShakes = document.createElement('ul');

  ulBurgers.setAttribute('class', 'menu-items');
  ulShakes.setAttribute('class', 'menu-items');
  h2.textContent = 'Our Menu';
  h3Burgers.textContent = 'Burgers';
  h3Shakes.textContent = 'Shakes';

  const burgers = [
    {
      src: eggImg,
      alt: 'egg-attack',
      name: 'Egg Attack',
      price: '7.99'
    }, {
      src: baconImg,
      alt: 'bacon-overflow',
      name: 'Bacon Overflow',
      price: '8.99',
      class: 'position-left'
    }, {
      src: dinerImg,
      alt: 'diner-double',
      name: 'Diner Double',
      price: '9.99'
    }, 
  ];

  let burgersHTML = '';
  
  burgers.forEach((burger) => {
    burgersHTML += `
      <li class="menu-item">
        <img src="${burger.src}" alt="${burger.alt}" class="${burger.class}">
        <p class="menu-name">${burger.name}</p>
        <p class="price">$${burger.price}</p>
      </li>
    `;
  });

  ulBurgers.innerHTML = burgersHTML;

  const shakes = [
    {
      src: oreoImg,
      alt: 'oreo-milkshake',
      name: 'Oreo Dream',
      price: '5.99'
    }, {
      src: strawberryImg,
      alt: 'strawberry-milkshake',
      name: 'Strawberry Heaven',
      price: '6.99'
    }, {
      src: mangoImg,
      alt: 'mango-shake',
      name: 'Mango paradise',
      price: '6.99'
    }, 
  ];

  let shakesHTML = '';
  
  shakes.forEach((shake) => {
    shakesHTML += `
      <li class="menu-item">
        <img src="${shake.src}" alt="${shake.alt}">
        <p class="menu-name">${shake.name}</p>
        <p class="price">$${shake.price}</p>
      </li>
    `;
  });

  ulShakes.innerHTML = shakesHTML;

  content.appendChild(h2);
  content.appendChild(h3Burgers);
  content.appendChild(ulBurgers);
  content.appendChild(h3Shakes);
  content.appendChild(ulShakes);
}