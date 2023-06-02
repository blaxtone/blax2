import $ from 'jquery';
window.bootstrap = require('bootstrap/dist/js/bootstrap.js');

export const initTooltips = () => {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });
}

export const fillModal = (modal, source)=>{
  $('#img').val(source.find(".card-img-top").html());
  $('#name').val(source.find(".card-title").html());
  $('#description').val(source.find(".card-text").html());
  modal.attr('current-item', source.attr('id'));
};

export const navigateCards = (e) => {
  const modal = $(document).find("#modal");
  const cardsList = $(document).find('.card').toArray().map((item)=>{
    return $(item).attr('id')
  });
  const current = cardsList.findIndex(element => element == modal.attr("current-item"));

  if(current == -1){
    throw new Error("invalid card index");
  }

  if(e.which == 37){ // Left Arrow Key
    const prevSlide = current > 0 ? cardsList[current-1] : cardsList[cardsList.length - 1];
    fillModal(modal, $(document).find(`#${prevSlide}`));
  } else if (e.which == 39){ // Right Arrow Key
    const nextSlide = current < cardsList.length-1 ? cardsList[current+1] : cardsList[0];
    fillModal(modal, $(document).find(`#${nextSlide}`));
  }
}