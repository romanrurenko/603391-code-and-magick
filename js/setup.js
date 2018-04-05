'use strict';

// задаем количество магов
var WIZARD_COUNT = 4;

// создаем массив "волшеники"
var wizards = [];


// макет данных
var charNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var charSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var charCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var charEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

// получаем случайное число от 0 до max
function getRandomInRange(max) {
  return Math.floor(Math.random() * (max + 1));
}

// функция создаем массив волшебников и наполняем его из макета данными
var createWizards = function (wizardsArray, wizardCount) {
  for (var i = 0; i < wizardCount; i++) {
    var wizardconfig = {
      name: charNames[getRandomInRange(7)] + ' ' + charSurnames[getRandomInRange(7)],
      coatColor: charCoatColors[getRandomInRange(5)],
      eyesColor: charEyesColors[getRandomInRange(4)]
    };
    wizardsArray.push(wizardconfig);
  }
  return wizardsArray;
};

// функция отображения блока c заданным классом
var show = function (classname) {
  var pageSetup = document.querySelector(classname);
  if (pageSetup) {
    pageSetup.classList.remove('hidden');
  }
};

// функция заполнения страницы волшебниками
var insertWizards = function () {
  // находим блок "Похожие персонажи"
  var similarListElement = document.querySelector('.setup-similar-list');
  // находим блок с шаблоном id  similar-wizard-template и извлекаем содержимое элемента
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  // создаем пустой фрагмент DOM
  var fragment = document.createDocumentFragment();
  // заполняем фрагмент элементами
  for (var i = 0; i < wizards.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    fragment.appendChild(wizardElement);
  }
  // помещаем фрагмент в DOM
  similarListElement.appendChild(fragment);
};


// Начало. В соответствии с "Задание 1. Покажите блок .setup, убрав в JS-коде у него класс .hidden."
// Убираем класc у блока .setup, если он существует в DOM
show('.setup');

// создаем массив волшебников в количестве WIZARD_COUNT и наполняем его из макета данных
createWizards(wizards, WIZARD_COUNT);

// заполнения страницы волшебниками
insertWizards();


// отображаем блок setup-similar
show('.setup-similar');

