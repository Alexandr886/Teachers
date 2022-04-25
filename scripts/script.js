//----------СЛАЙДЕР вертикальный---------
new Swiper('.slider-vertical', {
   direction: 'vertical',
   //изначально показ только одно слайда и потом через breakpoints добавим
   slidesPerView: '2.39',
   //расстояние между слайдами
   spaceBetween: 0,
   //чтобы срабатывало перетаскивание слайдов мышью.
   simulateTouch: true,
   //слайды круттся по скроллу колеса мыши
   mousewheel: {
      sensitivity: 1,
   },
   grabCursor: true,
   //бесконечная прокрутка слайдов
   loop: true,
});

//----------СЛАЙДЕР для фото---------
new Swiper('.slider', {
   //изначально показ только одно слайда и потом через breakpoints добавим
   slidesPerView: '5',
   //расстояние между слайдами
   spaceBetween: 0,
   slidesPerView: 'auto',
   //вывод пагинации
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },
   //кнопки-стрелки для прокрутки слайдера
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   //чтобы срабатывало перетаскивание слайдов мышью.
   simulateTouch: true,
   //слайды круттся по скроллу колеса мыши
   mousewheel: {
      sensitivity: 1,
   },
   grabCursor: true,
   //бесконечная прокрутка слайдов
   loop: true,
});

//----------СЛАЙДЕР для открыток---------
new Swiper('.slider-postcards', {
   //изначально показ только одно слайда и потом через breakpoints добавим
   slidesPerView: '1',
   //расстояние между слайдами
   spaceBetween: 33,
   //вывод пагинации
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },
   //кнопки-стрелки для прокрутки слайдера
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   //чтобы срабатывало перетаскивание слайдов мышью.
   simulateTouch: true,
   //слайды круттся по скроллу колеса мыши
   mousewheel: {
      sensitivity: 1,
   },
   grabCursor: true,
   //бесконечная прокрутка слайдов
   loop: true,
   breakpoints: {
      768: {slidesPerView: '2',},
      1024: {slidesPerView: '3', centeredSlides: true,},
   }
});

//-----------БУРГЕР МЕНЮ-----------
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
   
   button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openCloseModal(modal);
   
   })
})

overlay.addEventListener('click', () => {
   const modals = document.querySelectorAll('.modal.active');
   modals.forEach(modal => {
      openCloseModal(modal)
   })
})

closeModalButtons.forEach(button => {
   button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      openCloseModal(modal);
   })
})

function openCloseModal(modal) {
   modal.classList.toggle('active');
   overlay.classList.toggle('active');
   document.body.classList.toggle('modal-is-active');
}

//-----------МОДАЛЬНОЕ ОКНО С ВИДЕО-------
const openPopupModalButtons = document.querySelectorAll('[data-popupmodal-target]');
const closePopupModalButtons = document.querySelectorAll('[data-popupclose-button]');
const popupOverlay = document.getElementById('popupoverlay');
const iframe = document.querySelector('.iframe');

openPopupModalButtons.forEach(button => {
   button.addEventListener('click', () => {
      const popupmodal = document.querySelector(button.dataset.popupmodalTarget);
      openPopupModal(popupmodal);
   })
})

popupOverlay.addEventListener('click', () => {
   const popupmodal = document.querySelectorAll('.popupmodal.active');
   popupmodal.forEach(popupmodal => {
      closePopupModal(popupmodal);
   })
})

closePopupModalButtons.forEach(button => {
   button.addEventListener('click', () => {
      const popupmodal = button.closest('.popupmodal');
      closePopupModal(popupmodal);
   })
})

function openPopupModal(popupmodal) {
   popupmodal.classList.add('active');
   popupOverlay.classList.add('active');
   document.body.classList.add('modal-is-active');
   iframe.src = 'https://www.youtube.com/embed/15FchEr1oGU'
}

function closePopupModal(popupmodal) {
   popupmodal.classList.remove('active');
   popupOverlay.classList.remove('active');
   document.body.classList.remove('modal-is-active');
   iframe.src = ''
}