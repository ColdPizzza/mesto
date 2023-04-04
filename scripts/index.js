import { initialCards, enableValidation } from "../utils/objCards.js";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";

// Выводим контейнер, куда поместим карточки
const content = document.querySelector(".content");
// Находим контейнер куда будут добавлятся карточки
const cardContainer = document.querySelector(".elements__grid");

const cardTemplate = document.querySelector("#card").content;

//Имя профиля
const profileNameElement = content.querySelector(".profile__name");
// Вид деятельности профиля
const profileBioElement = content.querySelector(".profile__bio");
//Кнопка редактирования профиля
const profileEditButton = content.querySelector(".profile__edit-btn");
//Кнопка добавить карточку
const cardAddButton = content.querySelector(".profile__add-btn");

//Popup Профиля
const popupProfile = document.querySelector("#pop-up_profile");
//Форма редактирования профиля
const formProfileElement = popupProfile.querySelector(".pop-up__field");
//Поле ввода имени
const profileNameInput = popupProfile.querySelector(".pop-up__input_name");
//Поле ввода вид деятельности
const profileBioInput = popupProfile.querySelector(".pop-up__input_bio");

//Popup добавления карточки
const popupAddCard = document.querySelector("#pop-up_cards");
//Кнопка закрытия Popup карточки
const popupCloseCard = popupAddCard.querySelector(".pop-up__close");
//Форма добавления карточки
const formAddCard = popupAddCard.querySelector(".pop-up__field");
//Имя карточки
const cardNameInput = popupAddCard.querySelector(".pop-up__input_add_name");
//Путь к фото
const cardLinkInput = popupAddCard.querySelector(".pop-up__input_add_link");

//Контейнер фото
const popupImage = document.querySelector(".pop-up_card");
// Развернутое изображение
const fullSizePopupImage = popupImage.querySelector(".pop-up__img");
//Название изображения
const popupImageTitle = popupImage.querySelector(".pop-up__img-title");
// Закрытие контейнера с изображение
const popupCloseImage = popupImage.querySelector(".pop-up__close");

const buttonCloseList = document.querySelectorAll(".pop-up__close");

const popupSafeCard = document.querySelector("#popupSafeCard");

// Общая функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("pop-up_open");
  document.addEventListener("keydown", closePopupPushEsc);
}
// Общая функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("pop-up_open");
  document.removeEventListener("keydown", closePopupPushEsc);
}

// Функция закрытия попап ESC
const closePopupPushEsc = function (evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".pop-up_open");
    closePopup(popupOpen);
  }
};

//Функция открытия поаап профиля с подтягиванием данных
function editProfile() {
  openPopup(popupProfile);
  profileNameInput.value = profileNameElement.textContent;
  profileBioInput.value = profileBioElement.textContent;
}
//Привязали функцию редактирования и открытия к попап профилю
profileEditButton.addEventListener("click", editProfile);

//Функция для внесения изменений в попап данных профиля
function editPopupProfile(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileBioElement.textContent = profileBioInput.value;
  closePopup(popupProfile);
}

// Редактирования профиля
formProfileElement.addEventListener("submit", editPopupProfile);
// Редактирование карточки
cardAddButton.addEventListener("click", function () {
  openPopup(popupAddCard);

  popupSafeCard.classList.add("pop-up__btn_disabled");
  popupSafeCard.disabled = true;
  formAddCard.reset();
});

function handleCardImage(item) {
  openPopup(popupImage);
  popupImageTitle.textContent = item.name;
  fullSizePopupImage.src = item.link;
  fullSizePopupImage.alt = `Место ${item.name}`;
}

//клик за пределами области popup
const closePopupOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(event.currentTarget);
};

buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".pop-up");
  popup.addEventListener("click", closePopupOverlay);
  btn.addEventListener("click", () => closePopup(popup));
});

// Добавление новой карточки с помощью экземпляра класса Card:

function addNewPopupCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  cardContainer.prepend(
    new Card(newCard, "#card", handleCardImage).generateCard()
  );
  closePopup(popupAddCard);
}
function createCard(cardData, handleCardImage) {
  const card = new Card(cardData, "#card", handleCardImage);
  return card.generateCard();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, handleCardImage);
  cardContainer.append(cardElement);
});

// //Добавление карточки
formAddCard.addEventListener("submit", addNewPopupCard);

const handleValidAddCard = new FormValidator(enableValidation, popupAddCard);
handleValidAddCard.enableValidation();

const handleValidProfile = new FormValidator(enableValidation, popupProfile);
handleValidProfile.enableValidation();
