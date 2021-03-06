export default class Card {
  constructor(data, user, {handleOpenPreview, deleteHandler, setLike, removeLike}, cardSelector) {
    this._likes = data.likes;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.ownerId;
    this._user = user;
    this._handleOpenPreview = handleOpenPreview;
    this._cardSelector = cardSelector;
    this._deleteHandler = deleteHandler;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._likeButton = this._likeButton.bind(this);
  }

  // метод забирающий разметку из HTML и клонирующий элемент
  _getTemplate() {
    const cardTemplate = this._cardSelector
      .content
      .querySelector('.card')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardTemplate;
  }

  _likeButton(evt) {
    if (!evt.target.classList.contains('card__like-button_active')) {
      this._element.querySelector('.card__like-button').classList.add('card__like-button_active');
      this._setLike();
    } else {
      this._element.querySelector('.card__like-button').classList.remove('card__like-button_active');
      this._removeLike();
    }
  }

  // счётчик лайков
  changeLikeCounter(counter) {
    this._element.querySelector('.card__like-counter').textContent = counter;
  }


  // метод удаления карточки из вёрстки
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  // собсна, возвращает id карточки
  returnCardId() {
    return this._id;
  }

  // метод генерирующий карточку и готовящий её к публикации
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    // Добавим данные
    this._cardImage = this._element.querySelector('.card__image');
    this._cardCaption = this._element.querySelector('.card__heading');
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;
    this._likes.forEach(item => {
      if (item._id === this._user._id) {
        this._element.querySelector('.card__like-button').classList.add('card__like-button_active');
      }
    })

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardCaption.textContent = this._name;

    this._setEventListeners();
    this._showTrashCan();

    return this._element;
  }

  /* метод для проверки хозяина карточки и показа/скрытия иконки удаления карточки
   в зависимости от результата проверки */
  _showTrashCan() {
    if (this._ownerId === this._user._id) {
      this._removeButton.classList.add('card__remove-button_active');
    }
  }

  // слушатели кликов
  _setEventListeners() {
    this._removeButton = this._element.querySelector('.card__remove-button');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardLike = this._element.querySelector('.card__like-button');

    // слушатель клика по картинке карточки
    this._cardImage.addEventListener('click', () => {this._handleOpenPreview(this._element)});

    // слушатель клика по кнопке лайка
    this._cardLike.addEventListener('click', this._likeButton);

    // слушатель клика по корзине (кнопке удаления карточки)
    this._removeButton.addEventListener('click', this._deleteHandler);
  }
}
