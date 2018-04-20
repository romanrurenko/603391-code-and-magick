window.dragndrop = (function () {

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
    if (evt.target.tagName.toLowerCase() !== 'img') {
      evt.dataTransfer.dropEffect = 'copy';
      evt.target.style = 'outline: 2px dashed red;background:yellow;';
    }
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style = '';
    deleteAttributeAll('.setup-artifacts-cell', 'style');
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    if (evt.target.tagName.toLowerCase() !== 'img') {
      evt.target.style = 'outline: 2px dashed red;';
    }
    evt.preventDefault();
  });
};
