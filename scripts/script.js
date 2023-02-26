//Сергей, спасибо большое за развернутые комментарии.
//Очень полезно все расписано.
//Миллион благодарностей за подобный подход

//Обратите внимание на названия переменных и функций. Они должны соответствовать правилам, указанным в чек-листе к вашей работе http://joxi.ru/a2XyJ6XtQG84bA
// Не открывает ссылку, поэтому не могу понять о чем именно вы хотите сообщить

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
//Кнопка закрытия Popup Профиля
const popupCloseProfile = popupProfile.querySelector(".pop-up__close");
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
//Закрытие контейнера с изображение
const popupCloseImage = popupImage.querySelector(".pop-up__close");

const buttonCloseList = document.querySelectorAll(".pop-up__close");

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

profileEditButton.addEventListener("click", editProfile);

function editPopupProfile(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileBioElement.textContent = profileBioInput.value;
  closePopup(popupProfile);
}

popupCloseProfile.addEventListener("click", () => closePopup(popupProfile));

// Редактирования профиля
formProfileElement.addEventListener("submit", editPopupProfile);
// Редактирование карточки
cardAddButton.addEventListener("click", () => openPopup(popupAddCard));

popupCloseCard.addEventListener("click", function () {
  formAddCard.reset(); // форма после добавления открывается вновь очищенной
  closePopup(popupAddCard);
});

// функция создания карточки с фото
function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardPicture = cardElement.querySelector(".element__picture");
  const cardName = cardElement.querySelector(".element__name");
  const cardLike = cardElement.querySelector(".element__like");
  const сardDelete = cardElement.querySelector(".element__trash");
  // const cardLike = cardElement.querySelectorAll(".element__like"); //Uncaught TypeError: cardLike.forEach is not a function если изменить на querySelector
  // const сardDelete = cardElement.querySelectorAll(".element__trash"); //Аналогично 93 строке. А можно кинуть ссылку почитать, почему такой способ - плохо?
  cardName.textContent = item.name;
  cardPicture.src = item.link;
  cardPicture.alt = `Место ${item.name}`;

  // Лайк

  cardLike.addEventListener("click", function (event) {
    cardLike.classList.toggle("element__like_active");
  });

  // Удалить
  сardDelete.addEventListener("click", function (event) {
    const cardItem = сardDelete.closest(".element");
    cardItem.remove();
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

buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".pop-up");
  btn.addEventListener("click", () => closePopup(popup));
}); //способ интересный, но пока не до конца понял в чем фикус. Ранее новые карточки, тоже закрывались через крестик. Но тогда сразу вопрос, лайк и удаление карточки были же реализованы подобной механикой. Почему это ок, а то нет?

// popupCloseImage.addEventListener("click", () => closePopup(popupImage));

// функция добавления новых карточек
function addNewPopupCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  cardContainer.prepend(createCard(newCard));
  evt.target.reset();
  closePopup(popupAddCard);
}

//Добавление карточки
formAddCard.addEventListener("submit", addNewPopupCard);

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
  closePopup(event.currentTarget);
};
popupAddCard.addEventListener("click", closePopupOverlay);
popupProfile.addEventListener("click", closePopupOverlay);
popupImage.addEventListener("click", closePopupOverlay);

//const overlayClosePopup = document.querySelectorAll('.pop-up');

//overlayClosePopup.forEach((??? event) => {
//   const popupClose = ???(".pop-up");
//   ???.addEventListener("click", () => closePopup(event.currentTarget));
// });???
