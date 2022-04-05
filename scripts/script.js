//----------СЛАЙДЕР для фото---------
new Swiper('.slider', {
   //изначально показ только одно слайда и потом через breakpoints добавим
   slidesPerView: '1',
   //расстояние между слайдами
   spaceBetween: 0,
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
   //бесконечная прокрутка слайдов
   loop: true,
   breakpoints: {
      768: {slidesPerView: '2',},
      1150: {slidesPerView: '3',},
      1500: {slidesPerView: '4',},
      1920: {slidesPerView: '5',},
   }
});

//----------СЛАЙДЕР для открыток---------
new Swiper('.slider-postcards', {
   //изначально показ только одно слайда и потом через breakpoints добавим
   slidesPerView: '1',
   //расстояние между слайдами
   spaceBetween: 0,
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
}

//-----------МОДАЛЬНОЕ ОКНО С ВИДЕО-------
const openPopupModalButtons = document.querySelectorAll('[data-popupmodal-target]');
const closePopupModalButtons = document.querySelectorAll('[data-popupclose-button]');
const popupOverlay = document.getElementById('popupoverlay');

openPopupModalButtons.forEach(button => {
   button.addEventListener('click', () => {
      const popupmodal = document.querySelector(button.dataset.popupmodalTarget);
      openClosePopupModal(popupmodal);
   })
})

popupOverlay.addEventListener('click', () => {
   const popupmodal = document.querySelectorAll('.popupmodal.active');
   popupmodal.forEach(popupmodal => {
      openClosePopupModal(popupmodal);
   })
})

closePopupModalButtons.forEach(button => {
   button.addEventListener('click', () => {
      const popupmodal = button.closest('.popupmodal');
      openClosePopupModal(popupmodal);
   })
})

function openClosePopupModal(popupmodal) {
   popupmodal.classList.toggle('active');
   popupOverlay.classList.toggle('active');
}