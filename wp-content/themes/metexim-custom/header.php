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
            <?php if (get_theme_mod('custom_logo')) : ?>
              <a href="<?php echo esc_url(home_url('/')); ?>" class="header__logo logo d-flex align-items-center">
                <img src="<?php echo esc_url(wp_get_attachment_url(get_theme_mod('custom_logo'))); ?>" alt="<?php bloginfo('name'); ?>">
              </a>
            <?php else : ?>
              <a href="<?php echo esc_url(home_url('/')); ?>" class="header__logo logo d-flex align-items-center">
                <?php bloginfo('name'); ?>
              </a>
            <?php endif; ?>
            <?php if (get_theme_mod('working_hours')) : ?>
              <div class="working-hours">
                <span class="d-block fs-14 text-info text-nowrap"><?php echo esc_html(get_theme_mod('working_hours')); ?></span>
              </div>
            <?php endif; ?>
          </div>



          <div class="col-2 py-3 d-none d-lg-block" style="background: url('<?php echo get_theme_mod('mytheme_contacts_image'); ?>') center / cover no-repeat;">
            <span class="d-block fs-14 text-info header__span span position-relative ps-4"><?php echo esc_html(get_theme_mod('mytheme_contacts_title', '')); ?></span>
            <a href="tel:<?php echo esc_attr(get_theme_mod('mytheme_contacts_phone', '')); ?>" class="d-block fs-16 fw-700"><?php echo esc_html(get_theme_mod('mytheme_contacts_phone', '')); ?></a>
          </div>


          <div class="col-2 py-3 d-none d-lg-block">
            <span class="d-block fs-14 text-info header__span span span--black position-relative ps-4">Черный лом</span>
            <a href="tel:89990099603" class="d-block fs-16 fw-700">8(999) 009 96 03</a>
          </div>
          <div class="col-2 py-3 d-none d-lg-block">
            <span class="d-block fs-14 text-info header__span span span--color position-relative ps-4">Цветной лом</span>
            <a href="tel:89213207676" class="d-block fs-16 fw-700">
              <span class="header__span">8(921) 320 76 76 </span>
            </a>
          </div>
          <div class="col-2 py-3 d-none d-lg-block">
            <span class="d-block fs-14 text-info header__span span span--office position-relative ps-4">Офис</span>
            <a href="tel:89213200011" class="d-block fs-16 fw-700">
              <span class="header__span">8(921) 320 00 11</span>
            </a>
          </div>
          <div class="col-3 col-lg-2 py-3 d-none d-md-block">
            <span class="d-block fs-14 text-info header__span">Мессенджеры</span>
            <nav class="header__menu menu col-12 position-relative">
              <?php
              $menu_items = wp_get_nav_menu_items('Мессенджеры');
              if ($menu_items) {
                echo '<ul class="header__social-list social d-flex gap-2 ps-0 m-0">';
                foreach ($menu_items as $item) {
                  $icon_image = get_field('ikonka', $item->object_id); // Получаем изображение из поля ACF "ikonka" для текущего пункта меню
                  echo '<li class="social__item">';
                  echo '<a href="' . $item->url . '" class="social__link d-block" style="background: url(\'' . $icon_image . '\') center / cover no-repeat;">';
                  echo '</a>';
                  echo '</li>';
                }
                echo '</ul>';
              }
              ?>
            </nav>
          </div>
          <div class="col-10 col-sm-4 col-md-3 col-lg-2 py-2">
            <a class="header__btn fs-16 fw-500 btn col-2 d-block btn-transparent btn-outline-danger text-nowrap w-100 px-3 py-3" data-popup="#callback" href="#callback" role="button" title="Связаться с нами">Связаться с нами</a>
          </div>
          <button type="button" class="header__burger burger button d-flex d-lg-none col-2 col-sm-3 my-3">
            <span class="burger__inner position-relative w-100 h-100 d-flex justify-content-center align-items-center">
              <span></span>
            </span>
          </button>
        </div>
        <div class="header__bottom row py-1">
          <nav class="header__menu menu col-12 position-relative">
            <?php
            $menu_items = wp_get_nav_menu_items('Основное меню');
            if ($menu_items) {
              echo '<ul class="menu__list d-flex h-100 flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between text-nowrap ps-0 gap-3">';
              foreach ($menu_items as $item) {
                echo '<li class="menu__item d-flex justify-content-center">';
                echo '<a href="' . $item->url . '" class="menu__link d-inline-block">' . $item->title . '</a>';
                echo '</li>';
              }
              echo '</ul>';
            }
            ?>
          </nav>



        </div>
      </div>
    </header>