<h1 align="center">AdminPage👋</h1>

![React version](https://img.shields.io/badge/React-v18.2.0-orange)
![Webpack](https://img.shields.io/badge/Webpack-v5.75.0-purple)
![@reduxjs/toolkit](https://img.shields.io/badge/@reduxjs/toolkit-v1.9.0-purple)

---

> Данный проект реализован в рамках аттестационного задания

## Preview

### ✨ [Live Demo](https://euphonious-pie-d8ef9f.netlify.app/)

Here's a preview of my project in action:

![Screenshot of my project](https://lh3.googleusercontent.com/ppRqQHGZQZ150kXvX-PT9MLJt4w8IHA3_rVVipZO1X7jspGxhlL7ar__fx0FRrwIyCmNVhNlWo-whMm8apd--3ZZ0q9nNv80wkwcBig6mhDz5_1roGwRsPdqbxc7OrNdUr1VBZmkZUkUe13CGKgDxGjjyNPa3XVqw8VKfSCzO664YmvMcgM2mbbpq1-5PYKBkv1uGTIEOwxxr063RW8gVl5TWLqQfSGS7BC6_4m2XK-6_ws20TM0C15ugMT2cLKA-L84QTSPqlSA-KlY5jufMuk3yHl5hFIb7n-72hM6P3fJWB-3ui4wGwnUrMI4KZZxnnprFF_oVkMhX3Cd8dngoQ4yhopxakZpOtRRcFeDO3QmjH57a6SI23iAjtWIAPs7auMNIhOQ5mbxP6t6fjLjX1Ek-g4wFJdir8gbgsM7wlVZz6VD36M8VJlWtA4ofKmMhfmVy6l5B2xoaLH91iqVJHGwLKZHNdY1YxABU-NqK_UstWj1MV2tBUV_0VNFkM4LBlKrY1xoK6JG0j1UyY9Jze6PSsBBNsSe2Wxqerfu5ZqFhrL8yMStJ3MEdXElP5VvGgJcBXNH5ogAYsY9tuzcVvQrezO2pqwl9Q42MvsxDaGdZakt_Um4ZREG51yYCd5RW3H2vWa9Q8tc1ViT_IMtVTugMBNlLI6xyzgRKSMJJsVzlMpJhXFub_6thoUCM_rv4tzmAXDkXsE2MJZLU2CmiiEtRefU8V1BLjpYyc0mQobqtDXMV9iCp9_Z8jAibDY2GHoZKsGOl-21w4wvQ_OFk_QjVOS4Ra4MaLsQMXFo84Rw6-uUK7sRgUz9eZMDXo9dSPA9eu8uKcEWt7tEJATnKCe15hXDo4XdxhFzDAqpeKeRcFqXdGE-RPmumbPjy5tUFkDr6jEBv4v6f5SdhIB_ZCGfb8C8mXVWv4PS_mtYHBeTtgO07tCJyMazUjU6tjCyYjdkZHCY46TEfL7EMzMt=w336-h220-no?authuser=0)

## Entities

- **Post**, вместе с комментариями
- **Album**, вместе с фотографиями
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
