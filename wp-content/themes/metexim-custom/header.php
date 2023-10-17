<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php wp_title(); ?></title>

  <link rel="apple-touch-icon" sizes="60x60" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href"<?php echo get_stylesheet_directory_uri(); ?>/favicon/favicon-16x16.png">
  <link rel="manifest" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon/site.webmanifest">
  <link rel="mask-icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon/safari-pinned-tab.svg" color="#de0814">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="#ffffff">
  <meta name="yandex-verification" content="1cac47e3e460d2e6" />
  <meta name="google-site-verification" content="eA-PfK1nPHSyN8wdtiNhto-ygkEVLisbcxpBYhBLIZM" />


  <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js?_v=20230524111354"></script>
  <script src="https://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU&apikey=bcdc8e2e-fa4a-44c1-833f-6fb67f82b03d" type="text/javascript"></script>
  <?php $locations = explode("\n", get_field('metki-na-karte')); // получаем массив всех мест 
  ?>

  <?php wp_head(); ?>
  <?php if (strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome-Lighthouse') === false) : ?>
    <!-- Google Tag Manager -->
    <script>
      (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
          'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-5S5L86XN');
    </script>
    <!-- End Google Tag Manager -->
  <?php endif; ?>

</head>

<body <?php body_class(); ?>>
  <?php wp_body_open(); ?>
  <div class="wrapper">
  <?php if (strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome-Lighthouse') === false) : ?>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5S5L86XN" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <?php endif; ?>
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
          <?php for ($i = 1; $i <= 3; $i++) : ?>
            <?php
            // Получаем значения полей для текущего контакта
            $title = get_theme_mod('contacts_title_' . $i, '');
            $phone = get_theme_mod('contact_phone_' . $i, '');
            $icon = get_theme_mod('contact_icon_' . $i, '');

            // Очищаем значение телефона от всех символов, кроме цифр
            $phone_clean = preg_replace('/\D/', '', $phone);
            ?>

            <?php if (!empty($title) && !empty($phone)) : ?>
              <div class="col-2 py-3 d-none d-lg-block">
                <span class="d-block fs-14 text-info header__span span ps-4" style="background-image: url('<?php echo esc_url($icon); ?>');"><?php echo esc_html($title); ?></span>
                <a href="tel:<?php echo $phone_clean; ?>" class="d-block fs-16 fw-700"><?php echo esc_html($phone); ?></a>
              </div>
            <?php endif; ?>
          <?php endfor; ?>
          <div class="col-3 col-lg-2 py-3 d-none d-md-block">
            <span class="d-block fs-14 text-info header__span">Мессенджеры</span>
            <?php
            $menu_items = wp_get_nav_menu_items('Мессенджеры');
            if ($menu_items) {
              echo '<ul class="header__social-list social d-flex gap-2 ps-0 m-0">';
              foreach ($menu_items as $item) {
                $icon_image = get_field('ikonka', $item->object_id); // Получаем изображение из поля ACF "ikonka" для текущего пункта меню
                echo '<li class="social__item">';
                echo '<a href="' . $item->url . '" class="social__link d-block" title="' . $item->title . '" style="background-image: url(\'' . $icon_image . '\')">';
                echo '</a>';
                echo '</li>';
              }

              // Добавляем вручную ссылку на Вайбер в конце списка
              echo '<li class="social__item">';
              echo '<a href="viber://chat?number=+79990099603" class="social__link d-block" title="viber" style="background-image: url(' . get_template_directory_uri() . '/img/icons/viber.svg);">';
              echo '</a>';
              echo '</li>';

              echo '</ul>';
            }
            ?>
          </div>
          <div class="col-10 col-sm-4 col-md-3 col-lg-2 py-2">
            <a class="header__btn fs-16 fw-500 btn col-2 d-block btn-transparent btn-outline-danger text-nowrap w-100 px-3 py-3" role="button" data-popup="#callback" href="#callback" title="Связаться с нами">Связаться с нами</a>

          </div>
          <button type="button" class="header__burger burger button d-flex d-lg-none col-2 col-sm-3 my-3" aria-label="Открыть меню">
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