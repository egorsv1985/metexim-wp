"use strict";

console.log("1");

let scrollLocked = false;

const unlockScroll = (delay = 500) => {
  const body = document.querySelector("body");
  // console.log("2");

  if (scrollLocked) {
    const elements = document.querySelectorAll("[data-lp]");
    // console.log("3");

    for (let i = 0; i < elements.length; i++) {
      elements[i].style.paddingRight = "0px";
      // console.log("4");
    }

    body.style.paddingRight = "0px";
    // console.log("5");
    document.documentElement.classList.remove("lock");
    // console.log("6");

    scrollLocked = false;
    // console.log("7");

    setTimeout(function () {
      scrollLocked = true;
      // console.log("Скролл разблокирован");
    }, delay);
    // console.log("9");
  }
};

const lockScroll = (delay = 500) => {
  const body = document.querySelector("body");
  // console.log("10");

  if (!scrollLocked) {
    const elements = document.querySelectorAll("[data-lp]");
    // console.log("11");

    for (let i = 0; i < elements.length; i++) {
      elements[i].style.paddingRight = `${
        window.innerWidth - document.documentElement.clientWidth
      }px`;
      // console.log("12");
    }

    body.style.paddingRight = `${
      window.innerWidth - document.documentElement.clientWidth
    }px`;
    // console.log("13");
    document.documentElement.classList.add("lock");
    // console.log("14");

    scrollLocked = true;
    // console.log("15");

    setTimeout(function () {
      scrollLocked = false;
      // console.log("Скролл заблокирован");
    }, delay);
    // console.log("17");
  }
};
// console.log("18");

function handleBurgerClick() {
  const burger = document.querySelector(".burger");
  // console.log("19");
  if (burger) {
    burger.addEventListener("click", function (event) {
      if (scrollLocked) {
        unlockScroll();
        // console.log("Скролл разблокирован");
      } else {
        lockScroll();
        // console.log("Скролл заблокирован");
      }

      document.documentElement.classList.toggle("open");
      // console.log("20");
    });
  }
}

function delayAndLog(message) {
  setTimeout(() => {
    if (window.FLS) {
      console.log(message);
    }
  }, 0);
  // console.log("21");
}

function filterUniqueElements(arr) {
  return arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
  });
}

// Обработчик события DOMContentLoaded для выполнения кода после полной загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  handleBurgerClick();
  // console.log("23");

  delayAndLog("Привет, мир!");
  // console.log("24");
});
// Проверяем, что DOM полностью загружен, прежде чем выполнять код
document.addEventListener("DOMContentLoaded", function () {
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
});

(function (e) {
  let t = new Image();
  (t.onload = t.onerror =
    function () {
      e(2 == t.height);
    }),
    (t.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
})(function (e) {
  let t = !0 === e ? "webp" : "no-webp";
  document.documentElement.classList.add(t);
});



document.addEventListener("DOMContentLoaded", function () {
  // Функция определения направления прокрутки страницы
  function detectScrollDirection() {
    const body = document.body;
    const scrollUpClass = "scroll-up";
    const scrollDownClass = "scroll-down";
    let lastScrollPosition = 0;

    function handleScroll() {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition <= 0) {
        body.classList.remove(scrollUpClass);
      } else {
        if (
          currentScrollPosition > lastScrollPosition &&
          !body.classList.contains(scrollDownClass)
        ) {
          body.classList.remove(scrollUpClass);
          body.classList.add(scrollDownClass);
        } else if (
          currentScrollPosition < lastScrollPosition &&
          body.classList.contains(scrollDownClass)
        ) {
          body.classList.remove(scrollDownClass);
          body.classList.add(scrollUpClass);
        }
      }

      lastScrollPosition = currentScrollPosition;
    }

    window.addEventListener("scroll", handleScroll);
  }

  // Проверяем, поддерживается ли браузером событие scroll
  if ("scroll" in window) {
    detectScrollDirection();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Функция определения направления прокрутки страницы
  function detectScrollDirection() {
    const body = document.body;
    const scrollUpClass = "scroll-up";
    const scrollDownClass = "scroll-down";
    let lastScrollPosition = 0;

    function handleScroll() {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition <= 0) {
        // Если скролл находится вверху страницы или в самом начале, удалить классы scroll-up и scroll-down
        body.classList.remove(scrollUpClass);
        body.classList.remove(scrollDownClass);
      } else {
        if (currentScrollPosition > lastScrollPosition && !body.classList.contains(scrollDownClass)) {
          // Если скролл вниз и нет класса scroll-down, добавить класс scroll-down и удалить класс scroll-up
          body.classList.remove(scrollUpClass);
          body.classList.add(scrollDownClass);
        } else if (currentScrollPosition < lastScrollPosition && body.classList.contains(scrollDownClass)) {
          // Если скролл вверх и есть класс scroll-down, добавить класс scroll-up и удалить класс scroll-down
          body.classList.remove(scrollDownClass);
          body.classList.add(scrollUpClass);
        }
      }

      lastScrollPosition = currentScrollPosition;
    }

    window.addEventListener("scroll", handleScroll);
  }

  // Проверяем, поддерживается ли браузером событие scroll
  if ("scroll" in window) {
    detectScrollDirection();
  }

  // Функция для обработки Sticky элементов
  function handleStickyElements() {
    const elements = document.querySelectorAll("[data-sticky]");

    elements.forEach(element => {
      const stickyTop = parseInt(element.dataset.stickyTop) || 0;
      const stickyBottom = parseInt(element.dataset.stickyBottom) || 0;
      const isHeaderSticky = element.hasAttribute("data-sticky-header");
      const headerHeight = isHeaderSticky ? document.querySelector("header.header").offsetHeight : 0;
      const stickyItem = element.querySelector("[data-sticky-item]");

      if (!stickyItem) {
        // Если элемент data-sticky-item не найден, пропустить обработку
        return;
      }

      function handleScroll() {
        const scrollY = window.scrollY;
        const stickyItemRect = stickyItem.getBoundingClientRect();
        const stickyItemTop = stickyItemRect.top + scrollY - (headerHeight + stickyTop);
        const stickyItemBottom = element.offsetHeight + element.getBoundingClientRect().top + scrollY - (headerHeight + stickyItem.offsetHeight + stickyBottom);

        if (scrollY >= stickyItemTop && scrollY <= stickyItemBottom) {
          // Когда скролл находится внутри диапазона stickyItemTop и stickyItemBottom
          stickyItem.style.position = "fixed";
          stickyItem.style.bottom = "auto";
          stickyItem.style.top = `${headerHeight + stickyTop}px`;
          // stickyItem.style.right = `${stickyItemRect.right}px`;         
					stickyItemValues.right = `${stickyBlockItem.getBoundingClientRect().right}px`;
          stickyItem.style.width = `${stickyItem.offsetWidth}px`;
        } else if (scrollY > stickyItemBottom) {
          // Когда скролл находится ниже stickyItemBottom
          stickyItem.style.position = "relative";
          stickyItem.style.bottom = `${headerHeight + stickyTop}px`;
          stickyItem.style.top = "auto";
          // stickyItem.style.right = `${stickyItemRect.left}px`;
          stickyItem.style.width = `${stickyItem.offsetWidth}px`;
        } else {
          // Когда скролл находится выше stickyItemTop
          stickyItem.style.position = "relative";
          stickyItem.style.bottom = "auto";
          stickyItem.style.top = "0px";
          stickyItem.style.right = "0px";
          stickyItem.style.width = "auto";
        }
      }
      
		
      window.addEventListener("scroll", handleScroll);
    });
  }

  // Проверяем, поддерживается ли браузером событие scroll
  if ("scroll" in window) {
    handleStickyElements();
  }
});

