const popupElement = document.querySelector(".pop-up");
const popupCloseButtonElement = popupElement.querySelector(".pop-up__close");
const popupOpenButtonElement = document.querySelector(".pop-up_open");

let formElement = document.querySelector(".pop-up__field");
let nameInput = formElement.querySelector(".pop-up__name");
let jobInput = formElement.querySelector(".pop-up__bio");

const openPopup = function (event) {
  popupElement.classList.add("pop-up_open");
  nameInput.value = nameInput.textContent;
  jobInput.value = jobInput.textContent;
};

const closePopup = function () {
  popupElement.classList.remove("pop-up_open");
};
const closePopupOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
popupElement.addEventListener("click", closePopupOverlay);

// Я предполагаю, что код ниже, возможно, илишний для 4 спринта.
// Но мне было жуть как интересно реализовать это на JS И У МЕНЯ ПОЛУЧИЛОСЬ!!!
// Я доволен как слон! :)

const likeElement = document.querySelectorAll(".element__like");
const blackLikeElement = document.querySelector(".element__like_active");

// const addLike = function () {
//   likeElement.classList.toggle("element__like_active");
// };

likeElement.forEach(function (likeElement) {
  likeElement.addEventListener("click", function (e) {
    likeElement.classList.toggle("element__like_active");
  });
});

// likeElement.addEventListener("click", addLike);

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameInput.textContent = nameInput.value;
  jobInput.textContent = jobInput.value;
}

formElement.addEventListener("submit", handleFormSubmit);
