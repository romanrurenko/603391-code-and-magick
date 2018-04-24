'use strict';

(function () {
  var eyesColorInput = document.querySelector('#color-eyes');
  var fireballColorInput = document.querySelector('#fireball-color');
  var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848]'];
  var currentEyesColor = 0;
  var currentFireballColor = 0;
  var setupWizardEyes = document.querySelector('.wizard-eyes');
  var setupFireball = document.querySelector('.setup-fireball-wrap');

  // последовательно меняем цвет глаз
  window.changeEyesColor = function () {
    currentEyesColor++;
    if (currentEyesColor > (eyesColor.length - 1)) {
      currentEyesColor = 0;
    }
    setupWizardEyes.setAttribute('style', 'fill:' + eyesColor[currentEyesColor]);
    eyesColorInput.setAttribute('value', eyesColor[currentEyesColor]);
  };

  // последовательно меняем цвет фаербола
  window.changeFireballColor = function () {
    currentFireballColor++;
    if (currentFireballColor > (fireballColor.length - 1)) {
      currentFireballColor = 0;
    }
    setupFireball.setAttribute('style', 'background: ' + fireballColor[currentFireballColor]);
    fireballColorInput.setAttribute('value', fireballColor[currentFireballColor]);
  };
})();
