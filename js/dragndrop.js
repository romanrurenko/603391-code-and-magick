'use strict';

(function () {

  // установить атрибут всем элементам блока
  var setAttributeAll = function (nodeSelector, newAttribute, value) {
    var elements = document.querySelectorAll(nodeSelector);
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute(newAttribute, value);
    }
  };

  var deleteAttributeAll = function (nodeSelector, selectedAttribute) {
    var elements = document.querySelectorAll(nodeSelector);
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute(selectedAttribute);
    }
  };

  var setup = document.querySelector('.setup');
  var dialogHandle = setup.querySelector('.upload');
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.cloneNode(true);
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    setAttributeAll('.setup-artifacts .setup-artifacts-cell', 'style', 'outline: 2px dashed red;');
    return false;
  });

  shopElement.addEventListener('dragend', function (evt) {
    deleteAttributeAll('.setup-artifacts-cell', 'style');
    evt.preventDefault();
  });

  var artifactsElement = document.querySelector('.setup-artifacts');
  artifactsElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    setAttributeAll('.setup-artifacts .setup-artifacts-cell', 'style', 'outline: 2px dashed red;');
  });

  artifactsElement.addEventListener('dragend', function (evt) {
    deleteAttributeAll('.setup-artifacts-cell', 'style');
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    if (evt.target.tagName.toLowerCase() !== 'img' && !evt.target.hasChildNodes()) {
      evt.target.style = 'outline: 2px dashed red;background:yellow;';
    }
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    if (evt.target.tagName.toLowerCase() !== 'img' && !evt.target.hasChildNodes()) {
      evt.target.removeAttribute('style');
      deleteAttributeAll('.setup-artifacts-cell', 'style');
      evt.target.appendChild(draggedItem);
      evt.preventDefault();
    }
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.removeAttribute('style');
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    if (evt.target.tagName.toLowerCase() !== 'img') {
      evt.target.style = 'outline: 2px dashed red;';
    }
    evt.preventDefault();
  });
})();
