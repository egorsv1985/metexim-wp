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
  // выбираем элемент с id "promo-section" и создаем новый Swiper объект
  var contentSwiper = new Swiper(".contentSwiper", {
    // задаем количество слайдов, которые будут показываться одновременно
    slidesPerView: 1,

    loop: true,
    // включаем курсор в виде "руки" при наведении на слайды
    grabCursor: true,
    // включаем использование клавиатуры для навигации по слайдам
    keyboard: {
      enabled: true,
    },

    // включаем кнопки "вперед" и "назад" для навигации по слайдам
    navigation: {
      nextEl: ".content .swiper-button-next",
      prevEl: ".content .swiper-button-prev",
    },
    // включаем пагинацию и настраиваем внешний вид номеров слайдов
    pagination: {
      el: ".content .swiper-pagination",
      clickable: true,
      // здесь мы используем функцию renderBullet для создания номеров слайдов вида "01/10"
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
    const container = document.querySelector(".container");

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

      // Получаем верхнюю и нижнюю границы секции
      const sectionTop = element.offsetTop;
      const sectionBottom = sectionTop + element.offsetHeight;

      // Функция для обработки события скролла
      function handleScroll() {
        // Получаем позицию скролла и координаты закрепляемого элемента
        const scrollY = window.scrollY;
        const stickyItemRect = stickyItem.getBoundingClientRect();

        // Проверяем, находится ли скролл внутри границ секции
        if (scrollY >= sectionTop && scrollY <= sectionBottom) {
          // Вычисляем диапазон, в котором надо закрепить элемент
          const stickyItemTop =
            stickyItemRect.top + scrollY - (headerHeight + stickyTop);
          const stickyItemBottom =
            sectionBottom -
            (headerHeight + stickyItem.offsetHeight + stickyBottom);

          if (scrollY >= stickyItemTop && scrollY <= stickyItemBottom) {
            // Когда скролл находится внутри диапазона stickyItemTop и stickyItemBottom
            // Закрепляем элемент с определенными стилями
            stickyItem.style.position = "fixed";
            stickyItem.style.bottom = "auto";
            stickyItem.style.top = `${headerHeight + stickyTop}px`;
            stickyItem.style.right = "auto";
            stickyItem.style.width = "auto";
            stickyItem.style.maxWidth = "356px";
          } else if (scrollY > stickyItemBottom) {
            // Когда скролл находится ниже stickyItemBottom
            // Разрешаем элементу двигаться вниз со скроллом
            stickyItem.style.position = "relative";
            stickyItem.style.bottom = `${stickyBottom}px`;
            stickyItem.style.top = "auto";
            stickyItem.style.right = "auto";
            stickyItem.style.width = "auto";

            // Проверяем, если правая граница элемента близка к правой границе контейнера, изменяем ширину на фиксированное значение
            const containerRight = container.offsetLeft + container.offsetWidth;
            const stickyItemRight =
              stickyItem.offsetLeft + stickyItem.offsetWidth;
            if (stickyItemRight >= containerRight) {
              stickyItem.style.width = `${
                containerRight - stickyItem.offsetLeft
              }px`;
            }
          } else {
            // Когда скролл находится выше stickyItemTop
            // Разрешаем элементу двигаться вверх со скроллом
            stickyItem.style.position = "relative";
            stickyItem.style.bottom = "auto";
            stickyItem.style.top = `${stickyTop}px`;
            stickyItem.style.right = "auto";
            stickyItem.style.width = "auto";
          }
        } else {
          // Когда скролл находится вне границ секции
          // Отключаем закрепление элемента
          stickyItem.style.position = "relative";
          stickyItem.style.bottom = "auto";
          stickyItem.style.top = "auto";
          stickyItem.style.right = "auto";
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


//  // сделал
//  e.popup = new (class {
//   constructor(e) {
//     let t = {
//       logging: !0,
//       init: !0,
//       attributeOpenButton: "data-popup",
//       attributeCloseButton: "data-close",
//       fixElementSelector: "[data-lp]",
//       youtubeAttribute: "data-youtube",
//       youtubePlaceAttribute: "data-youtube-place",
//       setAutoplayYoutube: !0,
//       classes: {
//         popup: "popup",
//         popupContent: "popup__content",
//         popupActive: "popup_show",
//         bodyActive: "popup-show",
//       },
//       focusCatch: !0,
//       closeEsc: !0,
//       bodyLock: !0,
//       bodyLockDelay: 500,
//       hashSettings: { location: !0, goHash: !0 },
//       on: {
//         beforeOpen: function () {},
//         afterOpen: function () {},
//         beforeClose: function () {},
//         afterClose: function () {},
//       },
//     };
//     (this.isOpen = !1),
//       (this.targetOpen = { selector: !1, element: !1 }),
//       (this.previousOpen = { selector: !1, element: !1 }),
//       (this.lastClosed = { selector: !1, element: !1 }),
//       (this._dataValue = !1),
//       (this.hash = !1),
//       (this._reopen = !1),
//       (this._selectorOpen = !1),
//       (this.lastFocusEl = !1),
//       (this._focusEl = [
//         "a[href]",
//         'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
//         "button:not([disabled]):not([aria-hidden])",
//         "select:not([disabled]):not([aria-hidden])",
//         "textarea:not([disabled]):not([aria-hidden])",
//         "area[href]",
//         "iframe",
//         "object",
//         "embed",
//         "[contenteditable]",
//         '[tabindex]:not([tabindex^="-"])',
//       ]),
//       (this.options = {
//         ...t,
//         ...e,
//         classes: { ...t.classes, ...e?.classes },
//         hashSettings: { ...t.hashSettings, ...e?.hashSettings },
//         on: { ...t.on, ...e?.on },
//       }),
//       this.options.init && this.initPopups();
//   }
//   initPopups() {
//     this.popupLogging("Проснулся"), this.eventsPopup();
//   }
//   eventsPopup() {
//     document.addEventListener(
//       "click",
//       function (e) {
//         const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
//         if (t)
//           return (
//             e.preventDefault(),
//             (this._dataValue = t.getAttribute(
//               this.options.attributeOpenButton
//             )
//               ? t.getAttribute(this.options.attributeOpenButton)
//               : "error"),
//             "error" !== this._dataValue
//               ? (this.isOpen || (this.lastFocusEl = t),
//                 (this.targetOpen.selector = `${this._dataValue}`),
//                 (this._selectorOpen = !0),
//                 void this.open())
//               : void this.popupLogging(
//                   `Ой ой, не заполнен атрибут у ${t.classList}`
//                 )
//           );
//         return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
//           (!e.target.closest(`.${this.options.classes.popupContent}`) &&
//             this.isOpen)
//           ? (e.preventDefault(), void this.close())
//           : void 0;
//       }.bind(this)
//     ),
//       document.addEventListener(
//         "keydown",
//         function (e) {
//           if (
//             this.options.closeEsc &&
//             27 == e.which &&
//             "Escape" === e.code &&
//             this.isOpen
//           )
//             return e.preventDefault(), void this.close();
//           this.options.focusCatch &&
//             9 == e.which &&
//             this.isOpen &&
//             this._focusCatch(e);
//         }.bind(this)
//       ),
//       this.options.hashSettings.goHash &&
//         (window.addEventListener(
//           "hashchange",
//           function () {
//             window.location.hash
//               ? this._openToHash()
//               : this.close(this.targetOpen.selector);
//           }.bind(this)
//         ),
//         window.addEventListener(
//           "load",
//           function () {
//             window.location.hash && this._openToHash();
//           }.bind(this)
//         ));
//   }
//   open(e) {
//     if (
//       (e &&
//         "string" == typeof e &&
//         "" !== e.trim() &&
//         ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
//       this.isOpen && ((this._reopen = !0), this.close()),
//       this._selectorOpen ||
//         (this.targetOpen.selector = this.lastClosed.selector),
//       this._reopen || (this.previousActiveElement = document.activeElement),
//       (this.targetOpen.element = document.querySelector(
//         this.targetOpen.selector
//       )),
//       this.targetOpen.element)
//     ) {
//       if (
//         this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
//       ) {
//         const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
//             this.options.youtubeAttribute
//           )}?rel=0&showinfo=0&autoplay=1`,
//           t = document.createElement("iframe");
//         t.setAttribute("allowfullscreen", "");
//         const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
//         t.setAttribute("allow", `${s}; encrypted-media`),
//           t.setAttribute("src", e),
//           this.targetOpen.element.querySelector(
//             `[${this.options.youtubePlaceAttribute}]`
//           ) &&
//             this.targetOpen.element
//               .querySelector(`[${this.options.youtubePlaceAttribute}]`)
//               .appendChild(t);
//       }
//       this.options.hashSettings.location &&
//         (this._getHash(), this._setHash()),
//         this.options.on.beforeOpen(this),
//         this.targetOpen.element.classList.add(
//           this.options.classes.popupActive
//         ),
//         document.body.classList.add(this.options.classes.bodyActive),
//         this.targetOpen.element.setAttribute("aria-hidden", "false"),
//         (this.previousOpen.selector = this.targetOpen.selector),
//         (this.previousOpen.element = this.targetOpen.element),
//         (this._selectorOpen = !1),
//         (this.isOpen = !0),
//         setTimeout(() => {
//           this._focusTrap();
//         }, 50),
//         document.dispatchEvent(
//           new CustomEvent("afterPopupOpen", { detail: { popup: this } })
//         ),
//         this.popupLogging("Открыл попап");
//     } else
//       this.popupLogging(
//         "Ой ой, такого попапа нет. Проверьте корректность ввода. "
//       );
//   }
//   close(e) {
//     e &&
//       "string" == typeof e &&
//       "" !== e.trim() &&
//       (this.previousOpen.selector = e),
//       this.options.on.beforeClose(this),
//       this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
//         this.targetOpen.element.querySelector(
//           `[${this.options.youtubePlaceAttribute}]`
//         ) &&
//         (this.targetOpen.element.querySelector(
//           `[${this.options.youtubePlaceAttribute}]`
//         ).innerHTML = ""),
//       this.previousOpen.element.classList.remove(
//         this.options.classes.popupActive
//       ),
//       this.previousOpen.element.setAttribute("aria-hidden", "true"),
//       this._reopen ||
//         (document.body.classList.remove(this.options.classes.bodyActive),
//         (this.isOpen = !1)),
//       this._removeHash(),
//       this._selectorOpen &&
//         ((this.lastClosed.selector = this.previousOpen.selector),
//         (this.lastClosed.element = this.previousOpen.element)),
//       this.options.on.afterClose(this),
//       setTimeout(() => {
//         this._focusTrap();
//       }, 50),
//       this.popupLogging("Закрыл попап");
//   }
//   _getHash() {
//     this.options.hashSettings.location &&
//       (this.hash = this.targetOpen.selector.includes("#")
//         ? this.targetOpen.selector
//         : this.targetOpen.selector.replace(".", "#"));
//   }
//   _openToHash() {
//     let e = document.querySelector(
//       `.${window.location.hash.replace("#", "")}`
//     )
//       ? `.${window.location.hash.replace("#", "")}`
//       : document.querySelector(`${window.location.hash}`)
//       ? `${window.location.hash}`
//       : null;
//     document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
//       e &&
//       this.open(e);
//   }
//   _setHash() {
//     history.pushState("", "", this.hash);
//   }
//   _removeHash() {
//     history.pushState("", "", window.location.href.split("#")[0]);
//   }
//   _focusCatch(e) {
//     const t = this.targetOpen.element.querySelectorAll(this._focusEl),
//       s = Array.prototype.slice.call(t),
//       i = s.indexOf(document.activeElement);
//     e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()),
//       e.shiftKey || i !== s.length - 1 || (s[0].focus(), e.preventDefault());
//   }
//   _focusTrap() {
//     const e = this.previousOpen.element.querySelectorAll(this._focusEl);
//     !this.isOpen && this.lastFocusEl
//       ? this.lastFocusEl.focus()
//       : e[0].focus();
//   }
//   popupLogging(e) {
//     this.options.logging && n(`[Попапос]: ${e}`);
//   }
// })({});