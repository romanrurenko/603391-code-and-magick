'use strict';

// задаем количество магов
var WIZARD_COUNT = 4;
var wizards = [];

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
window.renderWizard = function (wizard, similarWizardTemplate) {
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

// Начало.
// Создаем массив волшебников в количестве WIZARD_COUNT
createWizards(wizards, WIZARD_COUNT);

// отображаем волшебников в настройках
deleteClass('.setup-similar', 'hidden');

