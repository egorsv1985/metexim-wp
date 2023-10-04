<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php wp_title(); ?></title>
  <link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" type="image/x-icon">
  <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js?_v=20230524111354"></script>
  <script src="https://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU&apikey=bcdc8e2e-fa4a-44c1-833f-6fb67f82b03d" type="text/javascript"></script>
  <?php $locations = explode("\n", get_field('metki-na-karte')); // получаем массив всех мест 
  ?>
  <script type="text/javascript">
    ymaps.ready(init);

    function init() {
      var myMap = new ymaps.Map('map', {
        center: [<?php echo explode(";", $locations[0])[2]; ?>, <?php echo explode(";", $locations[0])[3]; ?>],
        zoom: 10,
        controls: ['zoomControl']
      });

      <?php foreach ($locations as $index => $location) : ?>
        var placeMark_<?php echo $index; ?> = new ymaps.Placemark([<?php echo explode(";", $location)[2]; ?>, <?php echo explode(";", $location)[3]; ?>], {
          name: '<?php echo explode(";", $location)[0]; ?>',
          address: '<?php echo explode(";", $location)[1]; ?>',
          description: '',
        });
        myMap.geoObjects.add(placeMark_<?php echo $index; ?>);
      <?php endforeach; ?>
    }
  </script>
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
                <span class="d-block fs-14 text-info header__span span ps-4" style="background: url('<?php echo esc_url($icon); ?>') 0 center / 15px 15px no-repeat;"><?php echo esc_html($title); ?></span>
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
                echo '<a href="' . $item->url . '" class="social__link d-block" style="background: url(\'' . $icon_image . '\') center / cover no-repeat;">';
                echo '</a>';
                echo '</li>';
              }
              echo '</ul>';
            }
            ?>

          </div>
          <div class="col-10 col-sm-4 col-md-3 col-lg-2 py-2">
            <a class="header__btn fs-16 fw-500 btn col-2 d-block btn-transparent btn-outline-danger text-nowrap w-100 px-3 py-3 popmake-234" id="popmake-234" href="#" title="Связаться с нами">Связаться с нами</a>

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