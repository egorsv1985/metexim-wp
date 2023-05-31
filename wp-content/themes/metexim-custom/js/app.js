"use strict";
// Обработчик события DOMContentLoaded для выполнения кода после полной загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  let scrollLocked = false;
  // Определение функции unlockScroll с параметром delay по умолчанию равным 500 миллисекундам.
  const unlockScroll = (delay = 500) => {
    // Поиск элемента тега "body" на странице.
    const body = document.querySelector("body");

    // Проверка флага "scrollLocked".
    if (scrollLocked) {
      // Поиск всех элементов с атрибутом "data-lp" на странице.
      const elements = document.querySelectorAll("[data-lp]");

      // Убрать отступ у элементов с атрибутом "data-lp".
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.paddingRight = "0px";
      }

      // Убрать отступ у тега "body".
      body.style.paddingRight = "0px";
     
      
      // Убрать класс "lock" у элемента "documentElement".
      document.documentElement.classList.remove("lock");

      // Установить флаг "scrollLocked" на "false".
      scrollLocked = false;

      // Установить таймер на повторное блокирование скролла.
      setTimeout(function () {
        // Установить флаг "scrollLocked" на "true".
        scrollLocked = true;
        // Вывести сообщение о разблокировке скролла в консоль.
        console.log("Скролл разблокирован");
      }, delay);
    }
  };
  // объявление функции lockScroll, которая принимает параметр delay со значением по умолчанию равным 500
  const lockScroll = (delay = 500) => {
    // получаем элемент body через document.querySelector
    const body = document.querySelector("body");

    // если флаг scrollLocked равен false, то выполняем следующий код
    if (!scrollLocked) {
      // получаем все элементы с атрибутом data-lp
      const elements = document.querySelectorAll("[data-lp]");

      // проходимся по всем элементам и устанавливаем отступ слева равный разнице между шириной окна и шириной содержимого элемента
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.paddingRight = `${
          window.innerWidth - document.documentElement.clientWidth
        }px`;
      }

      // устанавливаем отступ у элемента body
      body.style.paddingRight = `${
        window.innerWidth - document.documentElement.clientWidth
      }px`;

      // добавляем класс lock к элементу documentElement
      document.documentElement.classList.add("lock");

      // устанавливаем флаг scrollLocked в true
      scrollLocked = true;

      // через указанное время задержки снова устанавливаем флаг scrollLocked в false для разблокировки скролла
      setTimeout(function () {
        scrollLocked = false;
        console.log("Скролл заблокирован");
      }, delay);
    }
  };
  // объявление функции handleBurgerClick
  function handleBurgerClick() {
    // получаем элемент с классом "burger" через document.querySelector
    const burger = document.querySelector(".burger");

    // проверяем, существует ли элемент с классом "burger"
    if (burger) {
      // добавляем обработчик события клика на элемент "burger"
      burger.addEventListener("click", function (event) {
        // проверяем, заблокирован ли скролл
        if (scrollLocked) {
          // вызываем функцию разблокировки скролла
          unlockScroll(); // выводим сообщение в консоль
          console.log("Скролл разблокирован");
        } else {
          // вызываем функцию блокировки скролла
          lockScroll(); // выводим сообщение в консоль
          console.log("Скролл заблокирован");
        }

        // переключаем класс "open" у элемента "documentElement"
        document.documentElement.classList.toggle("open");
      });
    }
  }
  // объявление функции delayAndLog с одним параметром message
  function delayAndLog(message) {
    // задаем небольшую задержку для вывода сообщения в консоль
    setTimeout(() => {
      // проверяем, существует ли в окне браузера переменная FLS
      if (window.FLS) {
        // если переменная FLS существует, выводим сообщение в консоль
        console.log(message);
      }
    }, 0);
  }
  // объявление функции filterUniqueElements с одним параметром arr
  function filterUniqueElements(arr) {
    // вызываем метод filter у исходного массива, передавая ему анонимную функцию
    // анонимная функция принимает три параметра: элемент массива, индекс этого элемента и сам массив
    // метод self.indexOf(element) ищет индекс первого вхождения элемента в массив
    // если индекс текущего элемента в массиве равен индексу первого его вхождения, то элемент сохраняется в новом массиве
    return arr.filter(function (element, index, self) {
      return self.indexOf(element) === index;
    });
  }
  handleBurgerClick();
  // Проверяем наличие элемента с id "promo-section"
  var promo = document.getElementById("promo");
  // Проверяем, что элемент "promo-section" существует
  if (promo) {
    // Создаем новый Swiper объект для элемента ".promoSwiper"
    var promoSwiper = new Swiper(".promoSwiper", {
      // Задаем количество слайдов, которые будут показываться одновременно
      slidesPerView: 1,

      loop: true,
      // Включаем курсор в виде "руки" при наведении на слайды
      grabCursor: true,
      // Включаем использование клавиатуры для навигации по слайдам
      keyboard: {
        enabled: true,
      },

      // Включаем кнопки "вперед" и "назад" для навигации по слайдам
      navigation: {
        nextEl: ".promo .swiper-button-next",
        prevEl: ".promo .swiper-button-prev",
      },
      // Включаем пагинацию и настраиваем внешний вид номеров слайдов
      pagination: {
        el: ".promo .swiper-pagination",
        clickable: true,
        // Используем функцию renderBullet для создания номеров слайдов вида "01/10"
        renderBullet: function (index, className) {
          return (
            '<span class="' +
            className +
            '">' +
            '<span class="prev-slide">' +
            ("" + (index + 1)).slice(-2) +
            "</span>" +
            '<span class="slash"></span>' +
            '<span class="next-slide">' +
            ("" + this.slides.length).slice(-2) +
            "</span>" +
            "</span>"
          );
        },
      },
    });
  }
  // Определяем функцию callback
  ((callback) => {
    // Создаем новый объект Image
    const image = new Image();

    // Добавляем обработчики событий загрузки и ошибки
    image.onload = image.onerror = () => callback(image.height === 2);

    // Задаем источник изображения
    image.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

    // Коллбэк функция для добавления класса 'webp' или 'no-webp' в зависимости от поддержки формата WebP
  })((supported) => document.documentElement.classList.add(supported ? "webp" : "no-webp"));
 
  // Функция для обработки Sticky элементов
  function handleStickyElements() {
    // Ищем все элементы с атрибутом data-sticky
    const elements = document.querySelectorAll("[data-sticky]");

    elements.forEach((element) => {
      // Получаем значение атрибутов data-sticky-top и data-sticky-bottom, заданных в виде строки
      const stickyTop = parseInt(element.dataset.stickyTop) || 0;
      const stickyBottom = parseInt(element.dataset.stickyBottom) || 0;
      // Проверяем, является ли текущий элемент шапкой сайта с помощью атрибута data-sticky-header
      const isHeaderSticky = element.hasAttribute("data-sticky-header");
      // Получаем высоту шапки
      const headerHeight = isHeaderSticky
        ? document.querySelector("header.header").offsetHeight
        : 0;
      // Находим элемент, который нужно закрепить
      const stickyItem = element.querySelector("[data-sticky-item]");

      if (!stickyItem) {
        // Если элемент data-sticky-item не найден, пропускаем обработку
        return;
      }

      // Функция для обработки события скролла
      function handleScroll() {
        // Получаем позицию скролла и координаты закрепляемого элемента
        const scrollY = window.scrollY;
        const stickyItemRect = stickyItem.getBoundingClientRect();
        // Вычисляем диапазон, в котором надо закрепить элемент
        const stickyItemTop =
          stickyItemRect.top + scrollY - (headerHeight + stickyTop);
        const stickyItemBottom =
          element.offsetHeight +
          element.getBoundingClientRect().top +
          scrollY -
          (headerHeight + stickyItem.offsetHeight + stickyBottom);

        if (scrollY >= stickyItemTop && scrollY <= stickyItemBottom) {
          // Когда скролл находится внутри диапазона stickyItemTop и stickyItemBottom
          // Закрепляем элемент с определенными стилями
          stickyItem.style.position = "fixed";
          stickyItem.style.bottom = "auto";
          stickyItem.style.top = `${headerHeight + stickyTop}px`;
          stickyItem.style.right = `0`;
          stickyItem.style.width = `356px`;
        } else if (scrollY > stickyItemBottom) {
          // Когда скролл находится ниже stickyItemBottom
          // Разрешаем элементу двигаться вниз со скроллом
          stickyItem.style.position = "relative";
          stickyItem.style.bottom = `${headerHeight + stickyTop}px`;
          stickyItem.style.top = "auto";
          stickyItem.style.right = `0`;
          stickyItem.style.width = `356px`;
        } else {
          // Когда скролл находится выше stickyItemTop
          // Разрешаем элементу двигаться вверх со скроллом
          stickyItem.style.position = "relative";
          stickyItem.style.bottom = "auto";
          stickyItem.style.top = "0px";
          stickyItem.style.right = "0px";
          stickyItem.style.width = "auto";
        }
      }

      // Добавляем обработчик события скролла
      window.addEventListener("scroll", handleScroll);
    });
  }

  // Проверяем, поддерживается ли браузер события скролла
  if ("scroll" in window) {
    handleStickyElements();
  }
});
