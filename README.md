<h1 align="center">AdminPage👋</h1>

![React version](https://img.shields.io/badge/React-v18.2.0-orange)
![Webpack](https://img.shields.io/badge/Webpack-v5.75.0-purple)
![@reduxjs/toolkit](https://img.shields.io/badge/@reduxjs/toolkit-v1.9.0-blue)

---

> Данный проект реализован в рамках аттестационного задания

## Preview

### ✨ [Live Demo](https://euphonious-pie-d8ef9f.netlify.app/)

![Screenshot of my project](https://user-images.githubusercontent.com/104200337/236617092-ab0c6d50-3a38-47e1-85c4-05638dabfb20.png)

## Entities

- **Post**
- **Album**
- **Todo**

## Task

Используя API https://jsonplaceholder.typicode.com/guide/, необходимо сделать админскую панель для просмотра сущностей в этом API. Обязательный минимальный стек - React, react-router v6, redux, axios (библиотеки любые, redux-toolkit, redux-act, нативно…)

Необходимо сделать панель, где будет три вкладки:

1. Просмотр постов, с комментариями. Необходимо сделать древовидную структуру просмотра (как на любом форуме, пикабу, реддит и тд)
2. Просмотр альбомов, каждый альбом - это слайдер, слайды - фотки прикрепленные к альбому
3. Todos, там всего два состояния, сделать доску с двумя статусами (по completed) реализовать draтьзg n drop по переносу с одной колонки в другую

## Execution

- Реализия drag and drop
- Реализация динамической пагинации для альбомов
- Настройка webpack
- Реализация создание/удаление/обновление постов (и комментариев к ним), задач и загрузку альбомов
- Отсутствие древовидной структуры, так как API не предоставляет данных для этого

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Author

👤 **Bogdan**

* Website: https://effulgent-brigadeiros-8b54e7.netlify.app/
* Github: [@Alpha-Dolphi](https://github.com/Alpha-Dolphi)

## Show your support

Оставьте ⭐️ если Вам понравилось!
