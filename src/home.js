import restaurantImg from './images/katlyn-giberson-OkhcMbf3vQ0-unsplash.jpg';

export function renderHome() {
  const content = document.getElementById('content');
  const h1 = document.createElement('h1');
  const h4 = document.createElement('h4');
  const p = document.createElement('p');
  const imgContainer = document.createElement('div');
  const img = document.createElement('img');
  const linkContainer = document.createElement('div');
  const a = document.createElement('a');

  h1.textContent = 'Odin Burger';
  h4.textContent = '- Est. 2025 -';
  p.setAttribute('class', 'welcome-p');
  p.textContent = 'Welcome to the best burger restaurant in the world!';
  imgContainer.setAttribute('class', 'img-container');
  img.setAttribute('src', restaurantImg);
  imgContainer.appendChild(img);
  linkContainer.setAttribute('class', 'link-container');
  a.setAttribute('href', 'https://unsplash.com/photos/two-square-brown-wooden-dining-tables-near-brown-brick-wall-OkhcMbf3vQ0');
  a.setAttribute('target', '_blank');
  a.textContent = 'Photo by Katlyn Giberson on Unsplash';
  linkContainer.appendChild(a);
  content.appendChild(h1);
  content.appendChild(h4);
  content.appendChild(p);
  content.appendChild(imgContainer);
  content.appendChild(linkContainer);
}