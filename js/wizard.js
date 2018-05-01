'use strict';
(function () {
  var COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848]'];
  var currentEyesColor = 0;
  var currentCoatColor = 0;
  var currentFireballColor = 0;
  window.wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {}
  };

  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  wizardCoatElement.addEventListener('click', function () {
    currentCoatColor++;
    if (currentCoatColor > (COAT_COLORS.length - 1)) {
      currentCoatColor = 0;
    }
    var newColor = COAT_COLORS[currentCoatColor];
    wizardCoatElement.style.fill = newColor;
    window.wizard.onCoatChange(newColor);
  });

  // последовательно меняем цвет глаз
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  wizardEyesElement.addEventListener('click', function () {
    currentEyesColor++;
    if (currentEyesColor > (EYES_COLORS.length - 1)) {
      currentEyesColor = 0;
    }
    var newColor = EYES_COLORS[currentEyesColor];
    wizardEyesElement.style.fill = newColor;
    window.wizard.onEyesChange(newColor);
  });


  // последовательно меняем цвет фаербола
  var fireballColorInput = document.querySelector('#fireball-color');
  var setupFireball = document.querySelector('.setup-fireball-wrap');
  window.changeFireballColor = function () {
    currentFireballColor++;
    if (currentFireballColor > (FIREBALL_COLORS.length - 1)) {
      currentFireballColor = 0;
    }
    setupFireball.setAttribute('style', 'background: ' + FIREBALL_COLORS[currentFireballColor]);
    fireballColorInput.setAttribute('value', FIREBALL_COLORS[currentFireballColor]);
  };
})();
