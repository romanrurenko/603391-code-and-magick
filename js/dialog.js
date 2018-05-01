'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameEditor = setup.querySelector('.setup-user-name');
  var dialogHandle = setup.querySelector('.upload');
  var defaultCoords = dialogHandle.style;

  var setupWizardEyes = document.querySelector('.wizard-eyes');
  var setupFireball = document.querySelector('.setup-fireball-wrap');

  // открываем окно настроек
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupWizardEyes.addEventListener('click', window.changeEyesColor);
    setupFireball.addEventListener('click', window.changeFireballColor);
    window.backend.load(window.onLoadSuccess, window.onErrorMsg);
  };

  // закрываем окно настроек
  window.closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupWizardEyes.removeEventListener('click', window.changeEyesColor);
    setupFireball.removeEventListener('click', window.changeFireballColor);
    setup.style = defaultCoords;
  };

  // обработчик клавишы ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameEditor) {
      window.closePopup();
    }
  };

  // обработчик клика по аватарке
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  // обработчик нажатия Enter на аватарке
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  // обработчик клика по изображению крестика в окне
  setupClose.addEventListener('click', function () {
    window.closePopup();
  });

  // обработчик нажатия Enter по изображению крестика в окне
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.closePopup();
    }
  });
})();
