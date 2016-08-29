// НЕОБХОДИМЫЕ ПАКЕТЫ И ПЕРЕМЕННЫЕ
// ==================================================
var express = require('express');
var app     = express();
var ig      = require('instagram-node').instagram();

// КОНФИГУРАЦИЯ ПРИЛОЖЕНИЯ
// ==================================================
// сообщаем Node где лежат ресурсы сайта
app.use(express.static(__dirname + '/public'));

// устанавливаем движок EJS для представления
app.set('view engine', 'ejs');

// настройка приложения instagram с помощью идентификатора клиента
ig.use({
  // Получить token : http://instagram.pixelunion.net/
  access_token: 'My token',
});

// УСТАНОВКА МАРШРУТОВ
// ===================================================
// главная страница — популярные изображения
  app.get('/', function(req, res) {

  // используем пакет instagram для получения популярных картинок
  ig.user_self_media_recent(function(err, medias, pagination, remaining, limit) {
    // отображаем главную страницу и передаём в неё изображения
    res.render('pages/index', { grams: medias });
  });

});

// ЗАПУСК СЕРВЕРА
// ==================================================
app.listen(8080);
console.log('Приложение запущено! Смотрите на http://localhost:8080');