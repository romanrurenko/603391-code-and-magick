'use strict';

(function () {
// задаем количество магов
  var WIZARD_COUNT = 4;
  window.userDialog = document.querySelector('.setup');
  var similarListElement = window.userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  //  функция клонируем шаблон и наполняем данными
  window.renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var deleteChildElements = function (nodeClass) {
    var container = document.querySelector(nodeClass);
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };

  window.onLoadSaccess = function (wizards) {
    deleteChildElements('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARD_COUNT; i++) {
      fragment.appendChild(window.renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    window.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.id = 'error';
    node.style = 'min-width: 180px; margin: 0 auto; text-align: center; color: yellow; border: 1px solid yellow';
    node.style.fontSize = '18px';
    node.textContent = 'Ошибка: ' + errorMessage;
    similarListElement.appendChild(node);
    setTimeout(window.autoDelete('#error'), 5000);
  };

})();
