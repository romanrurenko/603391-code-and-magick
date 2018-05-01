'use strict';
(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var updateWizards = function () {
    window.render(wizards.slice().
        sort(function (left, right) {
          var rankDiff = getRank(right) - getRank(left);
          if (rankDiff === 0) {
            rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
          }
          return rankDiff;
        }));
  };

  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
    window.debounce(updateWizards);
  };

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    window.debounce(updateWizards);
  };


  window.onLoadSuccess = function (data) {
    wizards = data;
    updateWizards();
    window.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };


})();
