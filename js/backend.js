'use strict';

(function () {

  var errorMessage = function (status, statusText) {
    switch (status) {
      case 400:
        return ('400 Неверный запрос');
      case 401:
        return ('401 Пользователь не авторизован');
      case 404:
        return ('404 Данные не найдены');
      case 500:
        return ('500 Внутряняя ошибка сервера');
      default:
        return ('Cтатус ответа: : ' + status + ' ' + statusText);
    }
  };

  // Загрузка данных
  window.load = function (onSuccess, onError) {
    var url = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(errorMessage(xhr.status, xhr.statusText));
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000; // 10s
    xhr.open('GET', url);
    xhr.send();
  };

  // Отправка данных
  window.save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(errorMessage(xhr.status, xhr.statusText));
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 5000; // 10s

    var SEND_URL = 'https://js.dump.academy/code-and-magick';
    xhr.open('POST', SEND_URL);
    xhr.send(data);
  };
})();
