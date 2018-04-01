'use strict';

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

var barHeight = 150;

// рендерим окно в виде облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// находим максимальное время в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// устанавливаем цвет колонки:
// если сновной игрок, то красный, для остальных синий и случайную насыщеность цвета в HSL
var setBarColor = function (playerName) {
  var number = (Math.floor(Math.random() * (99)) + 1);
  return (playerName === 'Вы') ? 'rgba(255, 0, 0, 1)' : ('hsl(' + HSL_HUE + ', ' + number + '%, 60%)')
}

window.renderStatistics = function (ctx, players, times) {
  // рисуем облако (окно)
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // выводим текст заголовка
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = "top";
  ctx.fillText("Ура вы победили!", CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText("Список результатов:", CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT + GAP);
  // вычисляем максимальное время
  var maxTime = getMaxElement(times);

  // выведем колонки с результатами игры всех игроков
  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = FONT_COLOR;
    // выведем значение результата
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP_BAR + (BAR_WIDTH + GAP_BAR) * i, CLOUD_Y + GAP + (TEXT_HEIGHT + GAP) * 2 + barHeight - ((barHeight / maxTime) * times[i]));
    // установим цвет колонки
    ctx.fillStyle = setBarColor(players[i]);
    // выведем колонку пропорционально результату
    ctx.fillRect(CLOUD_X + GAP_BAR + (BAR_WIDTH + GAP_BAR) * i, CLOUD_Y + (TEXT_HEIGHT + GAP) * 3 + barHeight - ((barHeight / maxTime) * times[i]), BAR_WIDTH, ((barHeight / maxTime) * times[i]));
    // выведем имя игрока
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(players[i], CLOUD_X + GAP_BAR + (BAR_WIDTH + GAP_BAR) * i, CLOUD_Y + GAP + (TEXT_HEIGHT + GAP) * 3 + barHeight);
  }
};
