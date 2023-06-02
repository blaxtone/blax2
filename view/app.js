import template1 from './comp/cards.hbs';
import template2 from './comp/footer.hbs';
import template3 from './comp/header.hbs';
import template4 from './comp/modal.hbs';
import template5 from './comp/modal_new.hbs';
import objects from '../data/objects.json';

const render = () => {
  let html = template1({objects});
  let app = document.getElementById('cards');
  app.innerHTML = html;

  html = template2();
  app = document.getElementById('footer');
  app.innerHTML = html;

  html = template3();
  app = document.getElementById('nav');
  app.innerHTML = html;

  html = template4();
  app = document.getElementById('modal_1');
  app.innerHTML = html;

  html = template5();
  app = document.getElementById('new_modal');
  app.innerHTML = html;
};

export default render;