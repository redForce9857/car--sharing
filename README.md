<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## TASK
Deadline: 14 days

Project: Car Sharing

Стек технологий: Node.js, Nestjs, PostgreSQL, TypeORM

Тех задание:
Произвести расчёт стоимости аренды автомобиля за период,
Создание сессии аренды автомобиля
Сформировать статистику о том, сколько км проехали на автомобиле, по дням, по каждому авто и по всем автомобилям.
Исходные данные:

Тарифы:
- Первый тариф - 270 ₽ в день за 200 км в день
- Второй тариф - 330 ₽ в день за 350 км в день
- Третий тариф - 390 ₽ в день за 500 км в день

Скидки:
- 5% при бронировании от 3 до 5 дней
- 10% при бронировании от 6 до 14 дней
- 15% при бронировании от 15 до 30 дней

Максимальный срок аренды: 30 дней.

Парк автомобилей - 5 автомобилей (марка, модель, госномер, VIN)

Условия:
- Пауза между бронированиями должна составлять 3 дня
- Начало и конец аренды не может выпадать на выходной день (суббота, воскресенье)

Эндпоинты, которые должны быть:

Автомобили:
- Список всех авто (GET)
- Один автомобиль (GET)
- Создание (POST)
- Редактирование  (PUT)
- Удаление (DELETE)

Аренда:
- Создание сессии аренды автомобиля, где нужно выбрать автомобиль, тариф, срок аренды и соблюсти все выше указанные условия, посчитать итоговую сумму (POST)
- Отмена аренды (DELETE)
- Список всех заказов (GET)
- Список только активных заказов (GET) (все заказы должны быть отсортированы по дате)

Добавить для проекта car sharing:
- валидацию - class-validator
- авторизацию - jwt

Бонус:
Добавить для проекта car sharing:
- docker
- docker-compose
- задеплоить проект куда-нибудь (на своё усмотрение)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - Aibek
- Telegram - [@redForce9857]


