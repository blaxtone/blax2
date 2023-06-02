import $ from 'jquery';
import { initTooltips, fillModal, navigateCards } from './utils';

$(document).ready(() => {
  initTooltips();

  $(document).on('click', '.card', function (e) {
    const modal = $(document).find("#modal");
    fillModal(modal, $(this));
  });

  $(document).on('keydown', navigateCards);

  $(document).on('click', '#modal .slide-btn', function(){
    const modal = $(document).find("#modal");
    const cardsList = $(document).find('.card').toArray().map((item)=>{
      return $(item).attr('id')
    });
    const current = cardsList.findIndex(element => element == modal.attr("current-item"));

    if(current == -1){
      throw new Error("invalid card index");
    }
    
    if($(this).hasClass("btn-prev")){
      const prevSlide = current > 0 ? cardsList[current-1] : cardsList[cardsList.length - 1];
      fillModal(modal, $(document).find(`#${prevSlide}`));
    } else if($(this).hasClass("btn-next")){
      const nextSlide = current < cardsList.length-1 ? cardsList[current+1] : cardsList[0];
      fillModal(modal, $(document).find(`#${nextSlide}`));
    }
  });
});



const loadButton = $('#toastbtn')[0];
const newCardModal = new bootstrap.Modal($('#new-card-modal')[0]);
const newCardForm = $('#new-card-form')[0];
const saveNewButton = $('#save-new-button')[0];
const saveButton = $('#save-button')[0];

$('#toastbtn').on('click', () => {
  $('#new-img, #new-name, #new-description').val('');
  newCardModal.show();
});



import data from '../../data/objects.json';
import template1 from '../../view/comp/cards.hbs';

const objects = [];
objects.push(...data);

function renderCards() {
  const html = template1({ objects });
  cards.innerHTML = html;
}


saveNewButton.addEventListener('click', (event) => {
  const newModal = $('#new-card-modal');
  const newimg = $('#new-img').val();
  const newName = $('#new-name').val();
  const newDescription = $('#new-description').val();

  // if (!newimg || !newName) {
  //   alert("Заполните все поля формы!");
  //   return;
  // }
  // else if (/^\d/.test(newimg)) {
  //   alert("Название не может начинаться с цифры!");
  //   return;
  // }

  const newObject = {
    id: objects.length + 1,
    img: newimg,
    name: newName,
    description: newDescription
  };

  objects.push(newObject);
  let html = template1({objects});
  let app = document.getElementById('cards');
  app.innerHTML = html;

  event.preventDefault();

  const bootstrapModal = bootstrap.Modal.getInstance(newModal);
  bootstrapModal.hide();
});


saveButton.addEventListener('click', (event) => {
  const newModal = $('#card-modal');
  const newimg = $('#img').val();
  const newName = $('#name').val();
  const newDescription = $('#description').val();

  // if (!newimg || !newName) {
  //   alert("Заполните все поля формы!");
  //   return;
  // }
  // else if (/^\d/.test(newimg)) {
  //   alert("Название не может начинаться с цифры!");
  //   return;
  // }

  const id = $('#modal').attr('current-item');
  const elements = id.split('-').slice(1) - 1;
  objects[elements].img = $('#img').val();
  objects[elements].name = $('#name').val();
  objects[elements].description = $('#description').val();
  let html = template1({objects});
  let app = document.getElementById('cards');
  app.innerHTML = html;
});




