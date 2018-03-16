# Бинбинк ПФП

Front-end приложения для расчета ПФП.

Создан при помощи
[create-react-app](https://github.com/facebookincubator/create-react-app).

## Переменные окружения

Все статичные параметры приложения вынесены в `.env`-файлы.

## Mock-сервер

Данные для отладочного сервера находятся в [src/mock](./src/mock/db.json)

Сервер запускается командой:
```bash
npm run server
```

## Структура приложения

В папке [src/app/common](./src/app/common) находятся переиспользуемые компоненты,
которые применяются для построения форм.

Все файлы пользовательского интерфейса находятся в [src/app/web](./src/app/web).

- `web/actions`, `web/constants`, `web/reducers` содержат файлы для работы
  redux. `constants` импортируются в `actions` и `reducers` для обеспечения
  уникальности наименований обрабатываемых действий.

- `web/api` содержит файлы для непосредственного обращения к серверу.
  `identification.js` обращается к отдельному серверу для поиска клиентов.
  Остальные обращаются к серверу ПФП.

- `web/components` содержит компоненты пользовательского интерфейса.

- `web/models` содержит описание моделей данных, которые обрабатывает приложение.
  Используется для вынесения логики, специфичной для конкретной структуры данных.

- `web/pages` содержит страницы для отображения. Корневой роутер ссылается на
  компоненты-страницы из этой папки. Напрямую компоненты в роутинг не попадают.

- `web/validation` содержит описание валидации форм. Используется библиотека Joi.

- `web/App.js` основной компонент интерфейса. Отвечает за подключение
  store, router, загрузку справочников, проверку и чтение токена,
  а так же отображение страницы логина, если пользователь не авторизован.

- `web/MainLayout.js` основной слой приложения. Отвечает за подключение
  статичного Header, а так же содержит корневой роутинг.

- `web/store.js` содержит функцию инициализации redux-хранилища,
  а так же подключения необходимых middleware и средств отладки в браузере.

## Описание работы

### Авторизация

При запуске приложения пользователю предлагается интерфейс авторизации.
Данные логина и пароля отправляются на сервер в заголовке.
При успешном прохождении авторизации в `sessionStorage` сохраняется токен,
полученный от сервера.

Далее при каждом запросе к серверу в заголовке будет передаваться полученый
токен, без которого сервер будет блокировать любые запросы.

### Роли (группы)

На основе токена определяется роль пользователя в приложении.
В зависимости от роли пользователю может быть доступен разный набор
возможностей и элементов интерфейса.

### Интерфейс пользователя

В интерфейсе имеются 3 основные страницы:

- Список всех ПФП
  (для менеджера выводятся только созданные им ПФП,
  для супервайзера выводятся все ПФП с указанием менеджера, создавшего ПФП)

- Форма создания ПФП
  (доступна только для менеджера)

- Профиль ПФП с возможностью редактирования
  (редактирование доступно только для менеджера)

Ссылки на первые две страницы есть в заголовке.
Третья доступна при выборе конкретного ПФП из списка на первой странице.

В заголовке так же отображается имя текущего авторизованного пользователя,
а так же его группа, в кнопка выхода.

Выйти из приложения так же можно закрыв вкладку браузера.
(т. к. токен из `sessionStorage` удалится -
при следующем открытии приложения будет отображен интерфейс авторизаци)

## Деплой приложения на тестовый сервер

1. Собрать проект командой
  ```bash
  npm run build
  ```

2. Скопировать папку build на сервер http://mossvcframetst в папку `/tmp/pfp/web`

3. Зайти на сервер и переключиться на пользователя tomcat
  ```bash
  sudo -iu tomcat
  ```

4. Удалить старую версию приложения
  ```bash
  rm -r /opt/apache-tomcat-8.5.16/webapps/pfp/
  ```

5. Скопировать новую версию проекта в папку рабочую папку tomcat
  ```bash
  cp -r /tmp/pfp/web/ /opt/apache-tomcat-8.5.16/webapps/pfp/
  ```