class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__picture").src = this._link;
    this._element.querySelector(
      ".element__picture"
    ).alt = `Место ${this._name}`;
    this._element.querySelector(".element__name").textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("element__like_active");
      });

    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._element.remove();
      });

    this._element
      .querySelector(".element__picture")
      .addEventListener("click", () => {
        this._handleCardClick({ name: this._name, link: this._link });
      });
  }
}

export { Card };
