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

  var form = window.userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.save(new FormData(form), onSend, window.onErrorMsg);
    evt.preventDefault();
  });

  var onSend = function () {
    window.userDialog.querySelector('.setup-similar').classList.add('hidden');
    window.closePopup();
  };

  window.autoDelete = function (className) {
    document.querySelector(className).remove();
  };

  window.onErrorMsg = function (errorMessage) {
    var node = document.createElement('div');
    node.style = ' z-index: 100; width: 100%; margin: 0 auto; text-align: center;padding: 50px; ';
    node.style.color = 'yelolow';
    node.style.background = 'rgba(0, 0, 0, 0.3)';
    node.style.position = 'absolute';
    node.style.top = '40%';
    node.id = 'alert';
    node.style.fontSize = '28px';
    node.textContent = 'Ошибка: ' + errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      window.autoDelete('#alert');
    }, 5000);
  };
})();
