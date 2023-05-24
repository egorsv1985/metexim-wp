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

  <!-- Initialize Swiper -->
  <script>
    // выбираем элемент с id "promo-section" и создаем новый Swiper объект
    var promoSwiper = new Swiper(".promoSwiper", {
      // задаем количество слайдов, которые будут показываться одновременно
      slidesPerView: 1,

      loop: true,
      // включаем курсор в виде "руки" при наведении на слайды
      grabCursor: true,
      // включаем использование клавиатуры для навигации по слайдам
      keyboard: {
        enabled: true,
      },

      // включаем полосу прокрутки и выбираем элемент, в котором она будет находиться
      scrollbar: {
        el: ".promo .swiper-scrollbar",
      },
      // включаем кнопки "вперед" и "назад" для навигации по слайдам
      navigation: {
        nextEl: ".promo .swiper-button-next",
        prevEl: ".promo .swiper-button-prev",
      },
      // включаем пагинацию и настраиваем внешний вид номеров слайдов
      pagination: {
        el: ".promo .swiper-pagination",
        clickable: true,
        // здесь мы используем функцию renderBullet для создания номеров слайдов вида "01/10"
        renderBullet: function(index, className) {
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
  </script>

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
                <p class="fs-18 fw-500">
                  <?php echo get_field('kontent-vozle-formy'); ?>
                </p>
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
      <h2 class="fs-36 fw-800 text-center mb-5">
      <?php echo get_field('zagolovok-dlja-preimushhestv'); ?>
      </h2>
      <ul class="nav nav-tabs flex-column flex-lg-row justify-content-center position-relative mb-5 gap-3 flex-nowrap" id="advantagesTab" role="tablist">
        <li class="nav-item position-relative " role="presentation">
          <button class="nav-link active p-2 p-lg-4 fs-20 fw-600 rounded-3 d-flex flex-lg-column align-items-center gap-2 w-100 text-primary h-100" id="assessment-tab" data-bs-toggle="tab" data-bs-target="#assessment " type="button" role="tab" aria-controls="assessment " aria-selected="true">
            <span class="advantages__box-svg rounded-circle bg-secondary mb-2 d-flex justify-content-center align-items-center">
              <img src="img/icons/assessment.svg" alt="assessment" class="advantages__svg" width="40" height="25">
            </span>
            Оценка металлолома
          </button>
        </li>
        <li class="nav-item position-relative" role="presentation">
          <button class="nav-link p-2 p-lg-4 fs-20 fw-600 rounded-3 d-flex flex-lg-column align-items-center gap-2 w-100 text-primary h-100" id="buy-tab" data-bs-toggle="tab" data-bs-target="#buy" type="button" role="tab" aria-controls="buy" aria-selected="false">
            <span class="advantages__box-svg rounded-circle bg-secondary mb-2 d-flex justify-content-center align-items-center">
              <img src="img/icons/buy.svg" alt="buy" class="advantages__svg" width="30" height="28">
            </span>
            Покупка металлолома
          </button>
        </li>
        <li class="nav-item position-relative" role="presentation">
          <button class="nav-link p-2 p-lg-4 fs-20 fw-600 rounded-3 d-flex flex-lg-column align-items-center gap-2 w-100 text-primary h-100" id="license-tab" data-bs-toggle="tab" data-bs-target="#license" type="button" role="tab" aria-controls="license" aria-selected="false">
            <span class="advantages__box-svg rounded-circle bg-secondary mb-2 d-flex justify-content-center align-items-center">
              <img src="img/icons/license.svg" alt="license" class="advantages__svg" width="22" height="27">
            </span>

            Лицензия на лом металлов
          </button>
        </li>
        <li class="nav-item position-relative" role="presentation">
          <button class="nav-link p-2 p-lg-4 fs-20 fw-600 rounded-3 d-flex flex-lg-column align-items-center gap-2 w-100 text-primary h-100" id="contract-tab" data-bs-toggle="tab" data-bs-target="#contract" type="button" role="tab" aria-controls="contract" aria-selected="false">
            <span class="advantages__box-svg rounded-circle bg-secondary mb-2 d-flex justify-content-center align-items-center">
              <img src="img/icons/contract.svg" alt="contract" class="advantages__svg" width="22" height="27">
            </span>
            Договор на лом металлов
          </button>
        </li>
        <li class="nav-item position-relative" role="presentation">
          <button class="nav-link p-2 p-lg-4 fs-20 fw-600 rounded-3 d-flex flex-lg-column align-items-center gap-2 w-100 text-primary h-100" id="reception-tab" data-bs-toggle="tab" data-bs-target="#reception" type="button" role="tab" aria-controls="reception" aria-selected="false">
            <span class="advantages__box-svg rounded-circle bg-secondary mb-2 d-flex justify-content-center align-items-center">
              <img src="img/icons/reception.svg" alt="reception" class="advantages__svg" width="40" height="25">
            </span>

            Прием засоров лома
          </button>
        </li>
      </ul>
      <div class="row " data-sticky data-sticky-header>
        <div class="col-12 col-md-8">
          <div class="tab-content" id="advantagesTabContent">
            <div class="tab-pane fade show active" id="assessment" role="tabpanel" aria-labelledby="assessment-tab">
              <h3 class="fs-30 fw-800 mb-4">Покупка металлолома в СПб</h3>
              <p class="fs-16 fw-500 mb-4">
                В связи с серьезным истощением мировых запасов железной руды,
                покупка металлолома в СПб становится особенно актуальной услугой.
                К сожалению, сегодняшнее сталелитейное производство не может
                удовлетворить столь активно растущий спрос на металлопродукцию.
                Необходимо существенно увеличить его масштабы. И при этом очень
                важно сделать акценты на сбережении природных запасов и экономии
                средств на их добыче.
              </p>
              <div class="advantages__box-img mb-4">
                <picture>
                  <source srcset="img/advantages.webp" type="image/webp"><img src="img/advantages.png" alt="Покупка металлолома в СПб" width="730" class="advantages__img w-100">
                </picture>
              </div>
              <p class="fs-16 fw-500 mb-4">
                Потому покупка черного и цветного металла, и его последующая
                переработка, являются действенным и дешевым методом получения
                вторсырья. Как показывает практика, вся та продукция, что
                производится из утилизированного лома, нисколько не уступает по
                своему качеству изделиям и конструкциям, произведенным обычным
                традиционным способом из руды.
              </p>
            </div>

            <div class="tab-pane fade" id="buy" role="tabpanel" aria-labelledby="buy-tab">
              <h3 class="fs-30 fw-800 mb-4">Покупка металлолома в СПб</h3>
              <p class="fs-16 fw-500 mb-4">
                В связи с серьезным истощением мировых запасов железной руды,
                покупка металлолома в СПб становится особенно актуальной услугой.
                К сожалению, сегодняшнее сталелитейное производство не может
                удовлетворить столь активно растущий спрос на металлопродукцию.
                Необходимо существенно увеличить его масштабы. И при этом очень
                важно сделать акценты на сбережении природных запасов и экономии
                средств на их добыче.
              </p>
              <div class="advantages__box-img mb-4">
                <picture>
                  <source srcset="img/advantages.webp" type="image/webp"><img src="img/advantages.png" alt="Покупка металлолома в СПб" width="730" class="advantages__img w-100">
                </picture>
              </div>
              <p class="fs-16 fw-500 mb-4">
                Потому покупка черного и цветного металла, и его последующая
                переработка, являются действенным и дешевым методом получения
                вторсырья. Как показывает практика, вся та продукция, что
                производится из утилизированного лома, нисколько не уступает по
                своему качеству изделиям и конструкциям, произведенным обычным
                традиционным способом из руды.
              </p>
            </div>

            <div class="tab-pane fade" id="license" role="tabpanel" aria-labelledby="license-tab">
              <h3 class="fs-30 fw-800 mb-4">Покупка металлолома в СПб</h3>
              <p class="fs-16 fw-500 mb-4">
                В связи с серьезным истощением мировых запасов железной руды,
                покупка металлолома в СПб становится особенно актуальной услугой.
                К сожалению, сегодняшнее сталелитейное производство не может
                удовлетворить столь активно растущий спрос на металлопродукцию.
                Необходимо существенно увеличить его масштабы. И при этом очень
                важно сделать акценты на сбережении природных запасов и экономии
                средств на их добыче.
              </p>
              <div class="advantages__box-img mb-4">
                <picture>
                  <source srcset="img/advantages.webp" type="image/webp"><img src="img/advantages.png" alt="Покупка металлолома в СПб" width="730" class="advantages__img w-100">
                </picture>
              </div>
              <p class="fs-16 fw-500 mb-4">
                Потому покупка черного и цветного металла, и его последующая
                переработка, являются действенным и дешевым методом получения
                вторсырья. Как показывает практика, вся та продукция, что
                производится из утилизированного лома, нисколько не уступает по
                своему качеству изделиям и конструкциям, произведенным обычным
                традиционным способом из руды.
              </p>
            </div>

            <div class="tab-pane fade" id="contract" role="tabpanel" aria-labelledby="contract-tab">
              <div class="row">
                <div class="col-8">
                  <h3 class="fs-30 fw-800 mb-4">Покупка металлолома в СПб</h3>
                  <p class="fs-16 fw-500 mb-4">
                    В связи с серьезным истощением мировых запасов железной руды,
                    покупка металлолома в СПб становится особенно актуальной
                    услугой. К сожалению, сегодняшнее сталелитейное производство
                    не может удовлетворить столь активно растущий спрос на
                    металлопродукцию. Необходимо существенно увеличить его
                    масштабы. И при этом очень важно сделать акценты на сбережении
                    природных запасов и экономии средств на их добыче.
                  </p>
                  <div class="advantages__box-img mb-4">
                    <picture>
                      <source srcset="img/advantages.webp" type="image/webp"><img src="img/advantages.png" alt="Покупка металлолома в СПб" width="730" class="advantages__img w-100">
                    </picture>
                  </div>
                  <p class="fs-16 fw-500 mb-4">
                    Потому покупка черного и цветного металла, и его последующая
                    переработка, являются действенным и дешевым методом получения
                    вторсырья. Как показывает практика, вся та продукция, что
                    производится из утилизированного лома, нисколько не уступает
                    по своему качеству изделиям и конструкциям, произведенным
                    обычным традиционным способом из руды.
                  </p>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="reception" role="tabpanel" aria-labelledby="reception-tab">
              <h3 class="fs-30 fw-800 mb-4">Покупка металлолома в СПб</h3>
              <p class="fs-16 fw-500 mb-4">
                В связи с серьезным истощением мировых запасов железной руды,
                покупка металлолома в СПб становится особенно актуальной услугой.
                К сожалению, сегодняшнее сталелитейное производство не может
                удовлетворить столь активно растущий спрос на металлопродукцию.
                Необходимо существенно увеличить его масштабы. И при этом очень
                важно сделать акценты на сбережении природных запасов и экономии
                средств на их добыче.
              </p>
              <div class="advantages__box-img mb-4">
                <picture>
                  <source srcset="img/advantages.webp" type="image/webp"><img src="img/advantages.png" alt="Покупка металлолома в СПб" width="730" class="advantages__img w-100">
                </picture>
              </div>
              <p class="fs-16 fw-500 mb-4">
                Потому покупка черного и цветного металла, и его последующая
                переработка, являются действенным и дешевым методом получения
                вторсырья. Как показывает практика, вся та продукция, что
                производится из утилизированного лома, нисколько не уступает по
                своему качеству изделиям и конструкциям, произведенным обычным
                традиционным способом из руды.
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 ">
          <form data-sticky-item name="iblock_add" action="#" method="post" class="rounded-3 border p-4 bg-secondary">
            <p class="fs-24 fw-800 text-center mb-1">Остались вопросы?</p>
            <p class="fs-16 text-center mb-4">Проконсультируем вас!</p>
            <input type="text" id="name-advantages" name="form[]" placeholder="Ваше имя" class="form-control d-block w-100 mb-3 fs-14 text-info px-4 py-3" required="required" size="30" value="">

            <input type="tel" id="tel-advantages" size="30" name="form[]" data-error="Ошибка" placeholder="Телефон" class="form-control d-block w-100 mb-3 fs-14 text-info px-4 py-3" value="" required="required">
            <button class="d-block w-100 text-nowrap btn btn-danger mb-4 p-3" name="iblock_submit" type="submit" value="Консультация">
              Консультация
            </button>
            <div class="fs-14 text-center">
              Нажимая на кнопку, вы соглашаетесь с
              <a href="#" class="fs-14 fw-500 text-center text-danger" target="_blank">политикой конфиденциальности</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="banner py-3">
    <div class="container">
      <div class="banner__bg rounded-3 p-5">
        <div class="row">
          <div class="col-12 col-lg-8 py-4">
            <div class="row">
              <div class="col-10">
                <h2 class="banner__title fs-36 fw-900 text-white mb-4">
                  Хотите сдать металлолом и бесплатно вывезти его?
                </h2>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <h3 class="banner__subtitle fs-20 fw-600 text-white mb-5">
                  Оставьте свой контактный номер – и мы Вам перезвоним!
                </h3>
              </div>
            </div>

            <div class="row">
              <a class="col-12 col-lg-4 btn fs-20 fw-600 px-3 py-3 btn-danger" data-popup="#callback" href="#callback" role="button" title="Оставить заявку">Оставить заявку</a>
            </div>
          </div>
          <div class="col-12 col-lg-4 p-2 p-lg-4 d-flex flex-column justify-content-between gap-3">
            <a class="banner__link d-flex gap-3" href="tel:+89990099603">
              <span class="banner__box-svg rounded-circle d-flex justify-content-center align-items-center">
                <img src="img/icons/tel.svg" alt="tel" class="banner__svg" width="30" height="30">
              </span>
              <span class="d-flex flex-column">
                <span class="fs-14 text-white mb-1">Черный лом</span>
                <span class="fs-24 fw-700 text-white">8(999) 009 96 03</span>
              </span>
            </a>
            <a class="banner__link d-flex gap-3" href="tel:+89213207676">
              <span class="banner__box-svg rounded-circle d-flex justify-content-center align-items-center">
                <img src="img/icons/tel.svg" alt="tel" class="banner__svg" width="30" height="30">
              </span>
              <span class="d-flex flex-column">
                <span class="fs-14 text-white mb-1">Цветной лом</span>
                <span class="fs-24 fw-700 text-white">8(921) 320 76 76</span>
              </span>
            </a>
            <a class="banner__link d-flex gap-3" href="tel:+89213200011">
              <span class="banner__box-svg rounded-circle d-flex justify-content-center align-items-center">
                <img src="img/icons/tel.svg" alt="tel" class="banner__svg" width="30" height="30">
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
          <h2 class="fs-30 fw-800 mb-3">Приём цветного и черного металлолома</h2>
          <p class="fs-16 fw-500">
            Сегодня фирмы предлагают самые разные расценки, чтобы сдать металлолом
            в приемку. Наша же компания выступает за предоставление исключительно
            оптимальных условий для сотрудничества. В связи с тем, что к своему
            делу мы относимся профессионально и со всей серьезностью – у нас самые
            высокие <span class="text-danger">цены на металлолом в СПб! </span>Но
            главное – мы гарантированно избавим Вас от ненужной «головной боли»,
            возникающей вследствие непрофессионализма работников, обвеса, срывов
            сроков, отсутствия нужной техники и оборудования. С нами Вы сможете
            убедиться, что связываться со вторичной переработкой металлолома – это
            очень выгодно!
          </p>
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