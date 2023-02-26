const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Выводим контейнер, куда поместим карточки
const content = document.querySelector(".content");
// Находим контейнер куда будут добавлятся карточки
const cardContainer = document.querySelector(".elements__grid");

//Имя профиля
const profileNameElement = content.querySelector(".profile__name");
// Вид деятельности профиля
const profileBioElement = content.querySelector(".profile__bio");
//Кнопка редактирования профиля
const editProfileButton = content.querySelector(".profile__edit-btn");
//Кнопка добавить карточку
const addCardButton = content.querySelector(".profile__add-btn");

//Popup Профиля
const popupProfile = document.querySelector("#pop-up_profile");
//Кнопка закрытия Popup Профиля
const сlosePopupProfile = popupProfile.querySelector(".pop-up__close");
//Форма редактирования профиля
const fieldProfileElement = popupProfile.querySelector(".pop-up__field");
//Поле ввода имени
const profileNameInput = popupProfile.querySelector(".pop-up__input_name");
//Поле ввода вид деятельности
const profileBioInput = popupProfile.querySelector(".pop-up__input_bio");

//Popup добавления карточки
const addPopupCard = document.querySelector("#pop-up_cards");
//Кнопка закрытия Popup карточки
const сlosePopupCard = addPopupCard.querySelector(".pop-up__close");
//Форма добавления карточки
const fieldAddCard = addPopupCard.querySelector(".pop-up__field");
//Имя карточки
const cardNameInput = addPopupCard.querySelector(".pop-up__input_add_name");
//Путь к фото
const cardLinkInput = addPopupCard.querySelector(".pop-up__input_add_link");

//Контейнер фото
const popupImage = document.querySelector(".pop-up_card");
// Развернутое изображение
const fullSizePopupImage = popupImage.querySelector(".pop-up__img");
//Название изображения
const popupImageTitle = popupImage.querySelector(".pop-up__img-title");
//Закрытие контейнера с изображение
const closePopupImage = popupImage.querySelector(".pop-up__close");

// Общая функция открытия попапа
function openPopup(popup) {
  popup.classList.add("pop-up_open");
}
// Общая функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("pop-up_open");
}

function editProfile() {
  openPopup(popupProfile);
  profileNameInput.value = profileNameElement.textContent;
  profileBioInput.value = profileBioElement.textContent;
}

editProfileButton.addEventListener("click", editProfile);

function editPopupProfile(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileBioElement.textContent = profileBioInput.value;
  closePopup(popupProfile);
}

сlosePopupProfile.addEventListener("click", () => closePopup(popupProfile));

// Редактирования профиля
fieldProfileElement.addEventListener("submit", editPopupProfile);
// Редактирование карточки
addCardButton.addEventListener("click", () => openPopup(addPopupCard));

сlosePopupCard.addEventListener("click", function () {
  fieldAddCard.reset();
  closePopup(addPopupCard);
});

// функция создания карточки с фото
function createCard(item) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardPicture = cardElement.querySelector(".element__picture");
  const cardName = cardElement.querySelector(".element__name");
  const cardLike = cardElement.querySelectorAll(".element__like");
  const deleteCard = cardElement.querySelectorAll(".element__trash");
  cardName.textContent = item.name;
  cardPicture.src = item.link;
  cardPicture.alt = `Место ${item.name}`;

  // Лайк
  cardLike.forEach(function (cardLike) {
    cardLike.addEventListener("click", function (event) {
      cardLike.classList.toggle("element__like_active");
    });
  });

  // Удалить
  deleteCard.forEach(function (deleteCard) {
    deleteCard.addEventListener("click", function (event) {
      const cardItem = deleteCard.closest(".element");
      cardItem.remove();
    });
  });

  // открытие изображения в большом размере

  //   function getZoom() {
  //   popupImageTitle.textContent = item.name;
  //   fullSizePopupImage.src = cardPicture.src;
  //   fullSizePopupImage.alt = cardPicture.alt;
  //   openPopup(getZoom);
  // }
  // }
  // popupImage.addEventListener("click", getZoom);

  cardPicture.addEventListener("click", function () {
    openPopup(popupImage);
    popupImageTitle.textContent = item.name;
    fullSizePopupImage.src = item.link;
    fullSizePopupImage.alt = cardPicture.alt;
  });
  return cardElement;
}

closePopupImage.addEventListener("click", () => closePopup(popupImage));

// функция добавления новых карточек
function addNewPopupCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  cardContainer.append(createCard(newCard));
  evt.target.reset();
  closePopup(addPopupCard);
}

//Добавление карточки
fieldAddCard.addEventListener("submit", addNewPopupCard);

// рендер карточек на старте
initialCards.forEach(function (item) {
  const newCard = createCard(item);
  cardContainer.append(newCard);
});

//клик за пределами области popup
const closePopupOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};
addPopupCard.addEventListener("click", closePopupOverlay);
popupProfile.addEventListener("click", closePopupOverlay);
// cardPicture.addEventListener("click", closePopupOverlay);???
