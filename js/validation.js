'use strict';

(function () {
  var MIN_LENGTH = 2;
  var MAX_LENGTH = 25;
  var TEN_SECONDS = 10000;
  // валидация поля имени персонажжа
  var userNameInput = document.querySelector('.setup-user-name');
  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из ' + MIN_LENGTH + '-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать ' + MAX_LENGTH + '-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  // контроль минимальной длины имени персонажа для EDGE
  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_LENGTH) {
      target.setCustomValidity('Имя должно состоять минимум из ' + MIN_LENGTH + '-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  var form = window.userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSend, window.onErrorMsg);
    evt.preventDefault();
  });

  var onSend = function () {
    window.userDialog.querySelector('.setup-similar').classList.add('hidden');
    window.closePopup();
  };

  window.autoHide = function (className) {
    document.querySelector(className).classList.add('hidden');
  };

  window.onErrorMsg = function (errorMessage) {
    var node = document.querySelector('.error');
    node.textContent = 'Ошибка: ' + errorMessage;
    node.classList.remove('hidden');
    setTimeout(function () {
      window.autoHide('.error');
    }, TEN_SECONDS);
  };
})();
