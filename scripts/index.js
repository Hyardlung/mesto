const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');

const popupCloseButtons = [...document.querySelectorAll('.popup__close-button')];

const nameInput = document.querySelector('.popup__input[name="profileName"]');
const aboutInput = document.querySelector('.popup__input[name="profileAbout"]');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const addCardButton = document.querySelector('.profile__add-button');
const cardNameInput = document.querySelector('.popup__input[name="cardName"]');
const cardLinkInput = document.querySelector('.popup__input[name="cardLink"]');

const popupFormAddCard = document.querySelector('.popup__form_add-card');

const cardsContainerElement = document.querySelector('.elements__list');

// первоначальный рендер списка карточек
// function renderList() {
//   const cardsList = initialCards.map(composeCard);
//   cardsContainerElement.append(...cardsList);
// }

// // генерация карточки из шаблона
// function composeCard(item) {
//   const newCard = templateCard.content.cloneNode(true);
//   const cardHeading = newCard.querySelector('.card__heading');
//   const cardImage = newCard.querySelector('.card__image');
//   const cardLikeButton = newCard.querySelector('.card__like-button');
//   cardHeading.textContent = item.name;
//   cardImage.alt = item.name;
//   cardImage.src = item.link;

//   // открытие предпросмотра изображения
//   cardImage.addEventListener('click', function () {
//     previewCaption.textContent = item.name;
//     previewImage.alt = item.name;
//     previewImage.src = item.link;
//     openPopup(popupPreview);
//   });

//   cardLikeButton.addEventListener('click', likeCard);
//   addRemoveListenerToCard(newCard);

//   return newCard;
// }

// // сброс полей попапа добавления карточки на значения по умолчанию
// function resetPopupForm() {
//   popupFormAddCard.reset();
// }

// // добавление новых карточек
// function addNewCard () {
//   const cardName = cardNameInput.value;
//   const cardLink = cardLinkInput.value;
//   const addNewCard = composeCard({name: cardName, link: cardLink});
//   cardsContainerElement.prepend(addNewCard);
//   resetPopupForm();
// }

// // инициализация попапа добавления карточки
// function initAddNewCardPopup() {
//   addCardButton.addEventListener('click', function () {
//     resetPopupForm();
//     openPopup(popupAddCard);
//   });
// }

// // подтверждение создания карточки
// function handleAddCardFormSubmit(evt) {
//   evt.preventDefault();
//   addNewCard();
//   closePopup(popupAddCard);
// }

// // удаление карточки
// function removeCard(evt) {
//   const targetCard = evt.target.closest('.card');
//   targetCard.remove();
// }

// // лайк карточки
// function likeCard(evt) {
//   const cardLikeToggle = evt.target;
//   cardLikeToggle.classList.toggle('card__like-button_active');
// }

// // обработчик события удаления карточки
// function addRemoveListenerToCard(item) {
//   const removeButton = item.querySelector('.card__remove-button');
//   removeButton.addEventListener('click', removeCard);
// }

// // инициализация попапа редактирования профиля
// function initEditProfilePopup() {
//   const profileEditButton = document.querySelector('.profile__edit-button');
//   profileEditButton.addEventListener('click', function () {
//   nameInput.value = profileName.textContent;
//   aboutInput.value = profileAbout.textContent;
//   openPopup(popupEditProfile);
//   });
// }

// // сохранение данных в профиле
// function handleEditProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileAbout.textContent = aboutInput.value;
//   closePopup(popupEditProfile);
// }

// // открытие попапа
// function openPopup(popup) {
//   document.addEventListener('keydown', closeByPressingEscape);
//   document.addEventListener('click', closeByClickingOverlay);
//   popup.classList.add('popup_opened');
// }

// // закрытие попапа
// function closePopup(popup) {
//   document.removeEventListener('keydown', closeByPressingEscape);
//   document.removeEventListener('click', closeByClickingOverlay);
//   popup.classList.remove('popup_opened');
// }

// // закрытие попапа по нажатию на Esc
// function closeByPressingEscape(evt) {
//   if (evt.key === 'Escape') {
//     const activePopup = document.querySelector('.popup_opened');
//     closePopup(activePopup);
//   }
// }

// // закрытие попапа по клику мимо окна
// function closeByClickingOverlay(evt) {
//   if (evt.target.classList.contains('popup_opened')) {
//     const activePopup = document.querySelector('.popup_opened');
//     closePopup(activePopup);
//   }
// }

// // обработчик клика по крестику
// popupCloseButtons.forEach((closeButton) => {
//   closeButton.addEventListener('click', function (evt) {
//     closePopup(evt.target.closest('.popup'));
//   });
// })

// formElement.addEventListener('submit', handleEditProfileFormSubmit);
// popupFormAddCard.addEventListener('submit', handleAddCardFormSubmit);

// renderList();
// initEditProfilePopup();
// initAddNewCardPopup();






const popupPreview = document.querySelector('.popup_preview');
const previewImage = popupPreview.querySelector('.preview__image');
const previewCaption = popupPreview.querySelector('.preview__caption');
const previewCloseButton = popupPreview.querySelector('.popup__close-button_preview');
class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  // забираем размеку из HTML и клонируем элемент
  _getTemplate() {
  	const templateCard = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return templateCard;
  }

  // подготовим карточку к публикации
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();
    // Добавим данные
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__heading').textContent = this._name;
    // Вернём элемент наружу
    return this._element;
  }

  // открытие предпросмотра изображения
  _handleOpenPopup() {
    previewImage.src = this._link;
    previewCaption.textContent = this._name;
    popupPreview.classList.add('popup_opened');
  }

  // закрытие предпросмотра по клику на крестик
  _handleClosePopup() {
    previewImage.src = '';
    previewCaption.textContent = '';
    popupPreview.classList.remove('popup_opened');
  }

  // слушатели кликов открытия и закрытия предпросмотра
  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._handleOpenPopup();
    })
    previewCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    })
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '.elements__template');
  const cardElement = card.generateCard();
  document.querySelector('.elements__list').append(cardElement);
})
