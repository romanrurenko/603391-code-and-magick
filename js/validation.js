'use strict';

(function () {
  var MIN_LENGTH = 2;
  var MAX_LENGTH = 25;
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
})();
