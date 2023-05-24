<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title(); ?></title>
	<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" type="image/x-icon">

    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<div class="wrapper">
<header class="header bg-white py-2">
  <div class="container">
    <div class="row py-1 mb-2 justify-content-between">
      <div class="col-3 col-lg-2 d-none d-md-block">
        <a href="index.html" class="header__logo logo d-flex align-items-center">
          <img src="<?php echo get_template_directory_uri(); ?>/img/icons/logo.svg" alt="logo" class="mw-100 logo__img" >
        </a>
        <span class="d-block fs-14 text-info text-nowrap"
          >Работаем с 8:00 до 20:00</span
        >
      </div>
      <div class="col-2 py-3 d-none d-lg-block">
        <span
          class="d-block fs-14 text-info header__span span span--black position-relative ps-4"
          >Черный лом</span
        >
        <a href="tel:89990099603" class="d-block fs-16 fw-700">
          <span class="header__span">8(999) 009 96 03 </span>
        </a>
      </div>
      <div class="col-2 py-3 d-none d-lg-block">
        <span
          class="d-block fs-14 text-info header__span span span--color position-relative ps-4"
          >Цветной лом</span
        >
        <a href="tel:89213207676" class="d-block fs-16 fw-700">
          <span class="header__span">8(921) 320 76 76 </span>
        </a>
      </div>
      <div class="col-2 py-3 d-none d-lg-block">
        <span
          class="d-block fs-14 text-info header__span span span--office position-relative ps-4"
          >Офис</span
        >
        <a href="tel:89213200011" class="d-block fs-16 fw-700">
          <span class="header__span">8(921) 320 00 11</span>
        </a>
      </div>
      <div class="col-3 col-lg-2 py-3 d-none d-md-block">
        <span class="d-block fs-14 text-info header__span">Мессенджеры</span>
        <ul class="header__social-list social d-flex gap-2 ps-0 m-0">
          <li class="social__item">
            <a href="#" class="social__link social__link--telegram d-block">
            </a>
          </li>
          <li class="social__item">
            <a href="#" class="social__link social__link--whatsapp d-block">
            </a>
          </li>
          <li class="social__item">
            <a href="#" class="social__link social__link--viber d-block"> </a>
          </li>
        </ul>
      </div>
      <div class="col-10 col-sm-4 col-md-3 col-lg-2 py-2">
        <a
          class="header__btn fs-16 fw-500 btn col-2 d-block btn-transparent btn-outline-danger text-nowrap w-100 px-3 py-3"
          data-popup="#callback"
          href="#callback"
          role="button"
          title="Связаться с нами"
          >Связаться с нами</a
        >
      </div>
      <button
        type="button"
        class="header__burger burger button d-flex d-lg-none col-2 col-sm-3 my-3"
      >
        <span class="burger__inner position-relative w-100 h-100 d-flex justify-content-center align-items-center">
          <span></span>
        </span>
      </button>
    </div>
    <div class="header__bottom row py-1">
      <nav class="header__menu menu col-12 position-relative">
        <ul
          class="menu__list d-flex h-100 flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between text-nowrap ps-0 gap-3"
        >
          <li class="menu__item d-flex justify-content-center">
            <a href="#" class="menu__link d-inline-block">Главная</a>
          </li>
          <li class="menu__item d-flex justify-content-center">
            <a href="page.html" class="menu__link d-inline-block">Прием черного лома</a>
          </li>
          <li class="menu__item d-flex justify-content-center">
            <a href="#" class="menu__link d-inline-block"
              >Прием цветного лома</a
            >
          </li>
          <li class="menu__item d-flex justify-content-center">
            <a href="#" class="menu__link d-inline-block">Демонтаж</a>
          </li>
          <li class="menu__item d-flex justify-content-center">
            <a href="#" class="menu__link d-inline-block">Вывоз</a>
          </li>
          <li class="menu__item d-flex justify-content-center">
            <a href="contacts-page.html" class="menu__link d-inline-block">Контакты</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</header>

