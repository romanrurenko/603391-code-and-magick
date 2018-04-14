'use strict';

// задаем количество магов
var WIZARD_COUNT = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MIN_LENGTH = 2;
var MAX_LENGTH = 25;

// создаем массив "волшеники"
var wizards = [];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848]'];
var currentEyesColor = 0;
var currentFireballColor = 0;

// макет данных
var charNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор',
  'Юлия', 'Люпита', 'Вашингтон'];
var charSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко',
  'Топольницкая', 'Нионго', 'Ирвинг'];
var charCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var charEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

// получаем случайное число от 0 до max
function getRandomInRange(max) {
  return Math.floor(Math.random() * (max + 1));
}

//  функция клонируем шаблон и наполняем данными
var renderWizard = function (wizard, similarWizardTemplate) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// функция создаем массив волшебников и наполняем его из макета данными
var createWizards = function (wizardsArray, wizardCount) {
  for (var i = 0; i < wizardCount; i++) {
    var wizardConfig = {
      name: charNames[getRandomInRange(7)] + ' ' + charSurnames[getRandomInRange(7)],
      coatColor: charCoatColors[getRandomInRange(5)],
      eyesColor: charEyesColors[getRandomInRange(4)]
    };
    wizardsArray.push(wizardConfig);
  }
  return wizardsArray;
};

// функция удаления класса у блока
var deleteClass = function (elementSelector, selectedClass) {
  var selectedBlock = document.querySelector(elementSelector);
  if (selectedBlock) {
    selectedBlock.classList.remove(selectedClass);
  }
};

// функция заполнения страницы волшебниками
var insertWizards = function () {
  // находим блок "Похожие персонажи" и извлекаем содержимое элемента
  var similarListElement = document.querySelector('.setup-similar-list');

  // находим блок с шаблоном id  и извлекаем содержимое элемента
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  // создаем пустой фрагмент DOM
  var fragment = document.createDocumentFragment();

  // заполняем фрагмент элементами
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
  }
  // помещаем фрагмент в DOM
  similarListElement.appendChild(fragment);
};

// последовательно меняем цвет глаз
var changeEyesColor = function () {
  currentEyesColor++;
  if (currentEyesColor > (eyesColor.length - 1)) {
    currentEyesColor = 0;
  }
  setupWizardEyes.setAttribute('style', 'fill:' + eyesColor[currentEyesColor]);
  eyesColorInput.setAttribute('value', eyesColor[currentEyesColor]);
};

// последовательно меняем цвет фаербола
var changeFireballColor = function () {
  currentFireballColor++;
  if (currentFireballColor > (fireballColor.length - 1)) {
    currentFireballColor = 0;
  }
  setupFireball.setAttribute('style', 'background: ' + fireballColor[currentFireballColor]);
  fireballColorInput.setAttribute('value', fireballColor[currentFireballColor]);
};

// обработчик клавишы ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameEditor) {
    closePopup();
  }
};

// открываем окно настроек
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupWizardEyes.addEventListener('click', changeEyesColor);
  setupFireball.addEventListener('click', changeFireballColor);
};

// закрываем окно настроек
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupWizardEyes.removeEventListener('click', changeEyesColor);
  setupFireball.removeEventListener('click', changeFireballColor);
};


// Начало.
// заполняем переменные DOM элементами
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameEditor = document.querySelector('.setup-user-name');
var setupWizardEyes = document.querySelector('.wizard-eyes');
var setupFireball = document.querySelector('.setup-fireball-wrap');
var eyesColorInput = document.querySelector('#color-eyes');
var fireballColorInput = document.querySelector('#fireball-color');

// Создаем массив волшебников в количестве WIZARD_COUNT
createWizards(wizards, WIZARD_COUNT);

// Заполнение страницы волшебниками
insertWizards();

// отображаем волшебников в настройках
deleteClass('.setup-similar', 'hidden');

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
  closePopup();
});

// обработчик нажатия Enter по изображению крестика в окне
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// валидация ввода имени персонажжа
var userNameInput = setup.querySelector('.setup-user-name');
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
