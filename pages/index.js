const openButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup')
const closeButton = document.querySelector('.popup__close-button');
const formPopup = document.querySelector('.popup__info');
let fioInput = document.querySelector('.popup__input_fio');
let jobInput = document.querySelector('.popup__input_job');
let fio = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

openButton.addEventListener('click', function() {
    popup.classList.remove('popup__hidden');
    fioInput.value = fio.textContent;
    jobInput.value = job.textContent;
})

closeButton.addEventListener('click', function() {
    popup.classList.add('popup__hidden');
})

formPopup.addEventListener('submit', function(e) {
    e.preventDefault();
    fio.textContent = fioInput.value;
    job.textContent = jobInput.value;
    popup.classList.add('popup__hidden');
})