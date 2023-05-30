<?php
/*
Template Name: Шаблон страницы контактов
*/

get_header(); ?>
<main>
	<section class="promo">
		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-6 mb-3 mb-lg-0">
					<div class="bg-secondary py-4 px-5 rounded-3 h-100 d-flex flex-column">
						<div class="d-flex align-items-center mb-4">
							<button class="fs-14 fw-500 btn btn-transparent btn-outline-danger px-5 py-3 position-relative btn__arrow btn__arrow--back me-4" disabled title="Назад">Назад</button>
							<?php
							if (function_exists('yoast_breadcrumb')) {
								yoast_breadcrumb('<nav class="breadcrumb">', '</nav>');
							}
							?>
						</div>


						<div class="h1 fs-50 fw-900 mb-4"> <?php the_title(); ?></div>
						<h2 class="fs-20 fw-600 mb-5">
							<?php the_content(); ?>
						</h2>
						<a class="col-12 col-sm-9 col-lg-6 btn fs-20 fw-600 px-3 py-3 btn-danger mb-5" data-popup="#callback" href="#callback" role="button" title="Оставить заявку">Оставить заявку</a>
						<div class="d-block mt-4">
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

					</div>
				</div>
				<div class="col-12 col-lg-6">
					<div class="promo__map" id="map"></div>

					<div class="promo__map">
						<div style="position: relative; overflow: hidden">
							<a href="https://yandex.by/maps/2/saint-petersburg/?utm_medium=mapframe&utm_source=maps" style="color: #eee; font-size: 12px; position: absolute; top: 0px">Санкт‑Петербург</a><a href="https://yandex.by/maps/2/saint-petersburg/house/territoriya_volny_ostrov_1/Z0kYdARhSkUGQFtjfXR4dHhqZw==/?ll=30.231301%2C59.895493&utm_medium=mapframe&utm_source=maps&z=16" style="
                color: #eee;
                font-size: 12px;
                position: absolute;
                top: 14px;
              ">Территория Вольный Остров, 1 на карте Санкт‑Петербурга —
								Яндекс Карты</a><iframe src="https://yandex.by/map-widget/v1/?ll=30.231301%2C59.895493&mode=whatshere&whatshere%5Bpoint%5D=30.231301%2C59.895493&whatshere%5Bzoom%5D=17&z=16" width="540" height="540" allowfullscreen="true" style="position: relative; border-radius: 10px;"></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="contacts py-5">
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-6 col-lg-3 mb-3">
        <div class="d-block mb-5">
          <span
            class="d-block fs-14 text-info contacts__span span span--black position-relative ps-4"
            >Черный лом</span
          >
          <a href="tel:89990099603" class="d-block fs-16 fw-700">
            <span class="contacts__span">8(999) 009 96 03 </span>
          </a>
        </div>
        <div class="d-block mb-5">
          <span
            class="d-block fs-14 text-info contacts__span span span--office position-relative ps-4"
            >Офис</span
          >
          <a href="tel:89213200011" class="d-block fs-16 fw-700">
            <span class="contacts__span">8(921) 320 00 11</span>
          </a>
        </div>
        <div class=" d-block">
          <span
            class="d-block fs-14 text-info contacts__span span span--mail position-relative ps-4"
            >Почта</span
          >
          <a href="mailto:info@metexim.spb.ru" class="d-block fs-16 fw-700">
            <span class="contacts__span">info@metexim.spb.ru</span>
          </a>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3 mb-3">
        <div class="d-block mb-5">
          <span
            class="d-block fs-14 text-info contacts__span span span--color position-relative ps-4"
            >Цветной лом</span
          >
          <a href="tel:89213207676" class="d-block fs-16 fw-700">
            <span class="contacts__span">8(921) 320 76 76 </span>
          </a>
        </div>
        <div class=" d-block mb-5">
          <span class="d-block fs-14 text-info contacts__span">Мессенджеры</span>
          <ul class="contacts__social-list social d-flex gap-2 ps-0 m-0">
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
        <div class="d-block">
          <span
            class="d-block fs-14 text-info contacts__span span span--map position-relative ps-4"
            >Адрес офиса</span
          >
          <a href="#" class="d-block fs-16 fw-700">
            <span class="contacts__span"
              >г. Санкт-Петербург ул. Гапсальская, д.1, кор.2, лит. О, оф.
              307</span
            >
          </a>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <span
          class="d-block fs-14 text-info contacts__span span span--map position-relative ps-4 mb-3"
          >Пункты приема</span
        >
        <ul class="contacts__list">
          <li class="mb-2">
            <a href="#" class="fs-16 fw-700"
              >Площадка г. Санкт-Петербург вн. тер. г. Морские ворота, остров
              Вольный, д. 1
            </a>
          </li>
          <li class="mb-2">
            <a href="#" class="fs-16 fw-700"
              >Площадка г. Санкт-Петербург проспект Большевиков, 56к4
            </a>
          </li>
          <li class="mb-2">
            <a href="#" class="fs-16 fw-700"
              >Площадка г Колпино, тер. Ижорский завод, участок 20 (южнее дома
              60), литера МГ
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

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
</main>

<?php
get_footer();
?>