<?php
/*
Template Name: Шаблон главной страницы
*/

get_header(); ?>
<main>
  <section class="promo" id="promo">
    <div class="container">
      <div class="swiper promoSwiper">
        <div class="swiper-control position-absolute d-flex">
          <div class="swiper-button-prev position-relative end-0"></div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-next position-relative end-0"></div>
        </div>
        <div class="swiper-wrapper">
          <?php
          $gallery_posts = new WP_Query(array(
            'post_type'      => 'gallery',
            'posts_per_page' => -1,
          ));

          while ($gallery_posts->have_posts()) : $gallery_posts->the_post();
            $background_image = get_post_meta(get_the_ID(), 'gallery_background_image', true);
          ?>
            <div class="swiper-slide rounded-3" style="background: url('<?php echo esc_url($background_image); ?>') center / cover no-repeat;">
              <div class="row  px-5">
                <div class="col-12 col-lg-7 h1 fs-50 fw-900 text-white mb-4">
                  <?php the_title(); ?>
                </div>
                <h2 class="col-12 col-lg-7 fs-20 fw-600 text-white mb-5">
                  <?php the_content(); ?>
                </h2>
                <div class="row">
                  <a class="col-12 col-md-6 col-lg-3 btn fs-20 fw-600 px-3 py-3 btn-danger" data-popup="#callback" href="#callback" role="button" title="Оставить заявку">Оставить заявку</a>
                </div>
              </div>
            </div>
          <?php
          endwhile;
          wp_reset_postdata();
          ?>
        </div>
      </div>
    </div>
  </section>
  <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js?_v=20230524111354"></script>


  <section class="valuation py-5">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="border rounded-3 py-5 ps-5 h-100">
            <div class="row">
              <div class="col">
                <a class="fs-16 fw-500 btn btn-secondary px-3 py-2 mb-3" data-popup="#callback" href="#callback" role="button" title="Оценка стоимости">Оценка стоимости</a>
              </div>
              <div class="col-12">
                <h2 class="fs-30 fw-800 mb-4">
                  <?php echo get_field('zagolovok-vozle-formy'); ?>
                </h2>
              </div>
              <div class="col-10">
                <div class="fs-18 fw-500">
                  <?php echo get_field('kontent-vozle-formy'); ?>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">

          <?php echo do_shortcode('[contact-form-7 id="61" title="Форма оценки стоимости"]'); ?>




        </div>
      </div>
    </div>
  </section>

  <section class="advantages py-5">
    <div class="container">
      <?php
      // Получаем значение поля ACF "zagolovok-dlja-preimushhestv"
      $zagolovok = get_field('zagolovok-dlja-preimushhestv');
      if ($zagolovok) :
      ?>
        <h2 class="fs-36 fw-800 text-center mb-5">
          <?php echo $zagolovok; ?>
        </h2>
      <?php endif; ?>
      <ul class="nav nav-tabs flex-column flex-lg-row justify-content-center position-relative mb-5 gap-3 flex-nowrap" id="advantagesTab" role="tablist">
        <?php
        // Получаем записи из рубрики "Преимущества"
        $args = array(
          'category_name' => 'preimushhestva',
          'posts_per_page' => -1
        );
        $query = new WP_Query($args);

        // Цикл по записям
        if ($query->have_posts()) :
          $first_tab = true; // Добавляем переменную для отслеживания первой вкладки
          while ($query->have_posts()) :
            $query->the_post();
            $title = get_the_title();
            $content = get_the_content();
            $tab_id = sanitize_title($title);
            $selected = $first_tab ? 'true' : 'false'; // Задаем значение 'true' для первой вкладки
            $active_class = $first_tab ? 'active' : ''; // Добавляем класс 'active' для первой вкладки
            $first_tab = false; // Устанавливаем переменную в false после первой вкладки
        ?>
            <li class="nav-item position-relative" role="presentation">
              <button class="nav-link p-2 p-lg-4 fs-20 fw-600 rounded-3 d-flex flex-lg-column align-items-center gap-2 w-100 text-primary h-100 <?php echo $active_class; ?>" id="<?php echo $tab_id; ?>-tab" data-bs-toggle="tab" data-bs-target="#<?php echo $tab_id; ?>" type="button" role="tab" aria-controls="<?php echo $tab_id; ?>" aria-selected="<?php echo $selected; ?>">
                <span class="advantages__box-svg rounded-circle bg-secondary mb-2 d-flex justify-content-center align-items-center">
                  <img src="<?php echo get_field('ikonka-preimushhestva'); ?>" alt="<?php echo $title; ?>" class="advantages__svg">
                </span>
                <?php echo $title; ?>
              </button>
            </li>
        <?php
          endwhile;
        endif;

        wp_reset_postdata();
        ?>
      </ul>
      <div class="row" data-sticky data-sticky-header>
        <div class="col-12 col-md-8">
          <div class="tab-content" id="advantagesTabContent">
            <?php
            // Цикл по записям для вставки полного контента в соответствующие разделы
            if ($query->have_posts()) :
              $first_tab = true; // Добавляем переменную для отслеживания первой вкладки
              while ($query->have_posts()) :
                $query->the_post();
                $title = get_the_title(); // Получаем заголовок записи
                $content = get_the_content(); // Получаем полный контент записи
                $tab_id = sanitize_title($title);
                $active_class = $first_tab ? 'active show' : ''; // Добавляем классы 'active' и 'show' для первого контента
                $first_tab = false; // Устанавливаем переменную в false после первой вкладки
            ?>
                <div class="tab-pane fade <?php echo $active_class; ?>" id="<?php echo $tab_id; ?>" role="tabpanel" aria-labelledby="<?php echo $tab_id; ?>-tab">
                  <h3 class="fs-30 fw-800 mb-4"><?php echo $title; ?></h3>
                  <?php echo $content; ?>
                </div>
            <?php
              endwhile;
            endif;
            wp_reset_postdata();
            ?>
          </div>
        </div>
        <div class="col-12 col-md-4 ">
          <div class="advantages__sticky rounded-3 border p-4 bg-secondary" data-sticky-item>
            <p class="fs-24 fw-800 text-center mb-1">Остались вопросы?</p>
            <p class="fs-16 text-center mb-4">Проконсультируем вас!</p>
            <?php echo do_shortcode('[contact-form-7 id="102" title="Консультация"]'); ?>
          </div>


        </div>
      </div>
    </div>
  </section>





  <section class="banner py-3">
    <div class="container">
      <div class="rounded-3 p-5" style="background: url('<?php the_field('fon-bannera'); ?>') center / cover no-repeat;">
        <div class="row">
          <div class="col-12 col-lg-8 py-4">
            <div class="row">
              <div class="col-10">
                <?php
                // Получаем значение поля ACF "zagolovok-bannera"
                $zagolovok = get_field('zagolovok-bannera');
                if ($zagolovok) :
                ?>
                  <h2 class="banner__title fs-36 fw-900 text-white mb-4">
                    <?php echo $zagolovok; ?>
                  </h2>
                <?php endif; ?>

              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <?php
                // Получаем значение поля ACF "tekst-bannera"
                $text = get_field('tekst-bannera');
                if ($text) :
                ?>
                  <div class="banner__subtitle fs-20 fw-600 text-white mb-5">
                    <?php echo $text; ?>
                  </div>
                <?php endif; ?>
              </div>
            </div>

            <div class="row">
              <a class="col-12 col-lg-4 btn fs-20 fw-600 px-3 py-3 btn-danger" data-popup="#callback" href="#callback" role="button" title="Оставить заявку">Оставить заявку</a>
            </div>
          </div>
          <div class="col-12 col-lg-4 p-2 p-lg-4 d-flex flex-column justify-content-between gap-3">
            <a class="banner__link d-flex gap-3" href="tel:+89990099603">
              <span class="banner__box-svg rounded-circle d-flex justify-content-center align-items-center">
                <img src="<?php echo get_template_directory_uri(); ?>/img/icons/tel.svg" alt="tel" class="banner__svg" width="30" height="30">
              </span>
              <span class="d-flex flex-column">
                <span class="fs-14 text-white mb-1">Черный лом</span>
                <span class="fs-24 fw-700 text-white">8(999) 009 96 03</span>
              </span>
            </a>
            <a class="banner__link d-flex gap-3" href="tel:+89213207676">
              <span class="banner__box-svg rounded-circle d-flex justify-content-center align-items-center">
                <img src="<?php echo get_template_directory_uri(); ?>/img/icons/tel.svg" alt="tel" class="banner__svg" width="30" height="30">
              </span>
              <span class="d-flex flex-column">
                <span class="fs-14 text-white mb-1">Цветной лом</span>
                <span class="fs-24 fw-700 text-white">8(921) 320 76 76</span>
              </span>
            </a>
            <a class="banner__link d-flex gap-3" href="tel:+89213200011">
              <span class="banner__box-svg rounded-circle d-flex justify-content-center align-items-center">
                <img src="<?php echo get_template_directory_uri(); ?>/img/icons/tel.svg" alt="tel" class="banner__svg" width="30" height="30">
              </span>
              <span class="d-flex flex-column">
                <span class="fs-14 text-white mb-1">Офис</span>
                <span class="fs-24 fw-700 text-white">8(921) 320 00 11</span>
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>


  <section class="seo-text py-5">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-8 py-5">
          <?php
          // Получаем значение поля ACF "zagolovok-dlja-seo-teksta"
          $zagolovok = get_field('zagolovok-dlja-seo-teksta');
          if ($zagolovok) :
          ?>
            <h2 class="fs-30 fw-800 mb-3">
              <?php echo $zagolovok; ?>
            </h2>
          <?php endif; ?>

          <?php
          // Получаем значение поля ACF "zagolovok-dlja-preimushhestv"
          $kontent = get_field('kontent-dlja-seo-teksta');
          if ($kontent) :
          ?>
            <div class="fs-16 fw-500">
              <?php echo $kontent; ?>
            </div>
          <?php endif; ?>

        </div>
        <div class="col-12 col-lg-4 bg-danger rounded-3 py-5 px-4">
          <p class="fs-24 fw-900 text-white text-center mb-5">
            Бесплатно оцените сколько вы получите денег за сдачу металлолома
          </p>

          <a class="btn fs-20 fw-600 px-3 py-3 btn-secondary d-block mx-3" data-popup="#callback" href="#callback" role="button" title="Оценить металлолом">Оценить металлолом</a>
        </div>
      </div>
    </div>
  </section>
</main>
<?php
get_footer();
?>