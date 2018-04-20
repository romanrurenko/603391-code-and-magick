'use strict';

(function () {
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
})();
