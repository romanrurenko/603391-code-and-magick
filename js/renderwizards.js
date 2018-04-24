'use strict';

(function () {
  window.renderWizards = function (arrayWizards) {
  // находим блок "Похожие персонажи" и извлекаем содержимое элемента
    var similarListElement = document.querySelector('.setup-similar-list');

    // находим блок с шаблоном id  и извлекаем содержимое элемента
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
        .content
        .querySelector('.setup-similar-item');

    // создаем пустой фрагмент DOM
    var fragment = document.createDocumentFragment();

    //  функция клонируем шаблон и наполняем данными
    var renderWizard = function (wizard) {
      var wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
      return wizardElement;
    };

    // заполняем фрагмент элементами
    for (var i = 0; i < arrayWizards.length; i++) {
      fragment.appendChild(renderWizard(arrayWizards[i]));
    }
    // помещаем фрагмент в DOM
    similarListElement.appendChild(fragment);
  };
})();
