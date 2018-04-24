'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP_BAR = 50;
  var GAP = 10;
  var TEXT_HEIGHT = 16;
  var BAR_WIDTH = 40;
  var HSL_HUE = 240;
  var FONT_COLOR = '#000';
  var BAR_MAX_HEIGHT = 150;

  // рендерим окно в виде облака
  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  // находим максимальное время в массиве
  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  // устанавливаем цвет колонки:
  // если сновной игрок, то красный, для остальных синий и случайную насыщеность цвета в HSL
  var setBarColor = function (playerName) {
    if (playerName === 'Вы') {
      return 'rgba(255, 0, 0, 1)';
    }
    return 'hsl(' + HSL_HUE + ', ' + (Math.floor(Math.random() * 99) + 1) + '%, 60%)';
  };

  window.renderStatistics = function (ctx, players, times) {
  // рисуем облако (окно)
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    // выводим текст заголовка
    ctx.fillStyle = FONT_COLOR;
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'top';
    ctx.fillText('Ура вы победили!', CLOUD_X + GAP_BAR, CLOUD_Y + GAP);
    ctx.fillText('Список результатов:', CLOUD_X + GAP_BAR, CLOUD_Y + GAP + TEXT_HEIGHT + GAP);
    // вычисляем максимальное время
    var maxTime = getMaxElement(times);

    // выведем колонки с результатами игры всех игроков
    for (var i = 0; i < players.length; i++) {
    // находим высоту строки с отступом
      var stringHight = TEXT_HEIGHT + GAP;
      // вычисляем высоту колонки пропорционально значению результата
      var calcBarHeight = Math.floor((BAR_MAX_HEIGHT / maxTime) * times[i]);
      // вычисляем позицию колонки по горизонтали
      var columnX = CLOUD_X + GAP_BAR + (BAR_WIDTH + GAP_BAR) * i;
      // вычисляем позицию значения результата по вертикали
      var textY = CLOUD_Y + GAP + stringHight * 2 + BAR_MAX_HEIGHT - calcBarHeight;
      // вычисляем координаты колонки по вертикали
      var rectY = CLOUD_Y + stringHight * 3 + BAR_MAX_HEIGHT - calcBarHeight;
      // вычисляем координату вывода имени пользователя по вертикали
      var usernameY = CLOUD_Y + GAP + stringHight * 3 + BAR_MAX_HEIGHT;
      // установим цвет текста
      ctx.fillStyle = FONT_COLOR;
      // выведем значение результата
      ctx.fillText(Math.floor(times[i]), columnX, textY);
      // установим цвет колонки
      ctx.fillStyle = setBarColor(players[i]);
      // выведем колонку пропорционально результату
      ctx.fillRect(columnX, rectY, BAR_WIDTH, calcBarHeight);
      // выведем имя игрока
      ctx.fillStyle = FONT_COLOR;
      ctx.fillText(players[i], columnX, usernameY);
    }
  };
})();
