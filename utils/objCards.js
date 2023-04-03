const initialCards = [
  {
    name: "Бухта Тихая",
    link: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/4d/40/5e/caption.jpg?w=800&h=-1&s=1",
  },
  {
    name: "Останец Лягушка",
    link: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/de/01/a7/photo2jpg.jpg?w=1200&h=-1&s=1",
  },
  {
    name: "Маяк Анива",
    link: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/37/67/cc/getlstd-property-photo.jpg?w=1200&h=-1&s=1",
  },
  {
    name: "Чертов мост",
    link: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/46/58/68/caption.jpg?w=800&h=-1&s=1",
  },
  {
    name: "Скалы Три Брата",
    link: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/6b/eb/78/caption.jpg?w=1000&h=-1&s=1",
  },
  {
    name: "Курильские острова",
    link: "https://must-see.top/wp-content/uploads/2018/06/kurilskie-ostrova-768x509.jpg",
  },
];

const enableValidation = {
  formSelector: ".pop-up__field",
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__btn",
  inactiveButtonClass: "pop-up__btn_disabled",
  inputErrorClass: "pop-up__input_type_error",
  errorClass: "pop-up__error_visible",
};

export { initialCards, enableValidation };
