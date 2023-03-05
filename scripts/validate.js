enableValidation({
  formSelector: ".pop-up__field",
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__btn",
  inactiveButtonClass: "pop-up__btn_disabled",
  inputErrorClass: "pop-up__input_type_error",
  errorClass: "pop-up__error_visible",
});

//функция выводит сообщение об ошибке
function showError(formElement, inputElement, errorMessage, item) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(item.inputErrorClass);
  //Текст ошибки
  errorElement.textContent = errorMessage;
  // Показываем текст ошибки
  errorElement.classList.add(item.errorClass);
}
//функция скрывающает сообщения об ошибке
function hideError(formElement, inputElement, item) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(item.inputErrorClass);
  // Скрываем текст ошибки
  errorElement.classList.remove(item.errorClass);
  //Clear
  errorElement.textContent = "";
}

//функция проверяет форму
function checkInputValidity(formElement, inputElement, item) {
  if (inputElement.validity.valid) {
    hideError(formElement, inputElement, item);
  } else {
    showError(formElement, inputElement, inputElement.validationMessage, item);
  }
}

//функция проверяет невалидные поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//функция вкл/выкл submit кнопки
function toggleButtonState(inputList, buttonElement, item) {
  if (hasInvalidInput(inputList)) {
    //выкл
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(item.inactiveButtonClass);
  } else {
    //вкл
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(item.inactiveButtonClass);
  }
}
//функция добавляет обработчик каждому полю ввода
function setEventListeners(formElement, item) {
  const inputList = Array.from(
    formElement.querySelectorAll(item.inputSelector)
  );
  const buttonElement = formElement.querySelector(item.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, item);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, item);
      toggleButtonState(inputList, buttonElement, item);
    });
  });
}
//функция включает валидацию всех форм
function enableValidation(item) {
  const formList = Array.from(document.querySelectorAll(item.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, item);
  });
}
enableValidation();
