<?php
/*
Template Name: Шаблон страницы контактов
*/

get_header(); ?>

<script type="text/javascript">
	// Загрузка Яндекс.Карт и вызов функции инициализации
	ymaps.ready(init);

	function init() {
		// Создание карты
		var myMap = new ymaps.Map('map', {
			center: [59.949879, 30.212306], // Координаты центра карты
			zoom: 9, // Уровень масштабирования
		});
		// Обновленный массив с адресами и координатами
		var locations = [{
				address: 'Площадка г. Санкт-Петербург вн. тер. г. Морские ворота, остров Вольный, д. 1 работает круглосуточно',
				coordinates: [59.895493, 30.231301]
			},
			{
				address: 'Площадка г. Санкт-Петербург проспект Большевиков, 56к4',
				coordinates: [59.880708, 30.495235]
			},
			{
				address: 'Площадка г Колпино, тер. Ижорский завод, участок 20 (южнее дома 60), литера МГ',
				coordinates: [59.751565, 30.596870]
			}

		];
		// Добавление меток на карту
		locations.forEach(function(location) {
			var placeMark = new ymaps.Placemark(location.coordinates, {
				hintContent: location.address,
				balloonContent: location.address
			});
			myMap.geoObjects.add(placeMark);
		});
		// Добавление масштабирования карты при наведении мыши
		myMap.behaviors.enable('scrollZoom');
	}
</script>
<main>
	<section class="promo">
		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-6 mb-3 mb-lg-0">
					<div class="bg-secondary py-4 px-5 rounded-3 h-100 d-flex flex-column">
						<div class="d-flex align-items-center mb-4">
							<?
							if (
								isset($_SERVER['HTTP_REFERER'])
								&&
								strpos($_SERVER['HTTP_REFERER'], $_SERVER['SERVER_NAME']) !== false
							) : ?>
								<a href="javascript:history.back();" class="fs-14 fw-500 btn btn-transparent btn-outline-danger px-5 py-3 position-relative btn__arrow btn__arrow--back me-4" title="Назад">Назад</a>
							<? endif; ?>
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
					<div class="promo__map" id="map" style="height:540px"></div>
				</div>
			</div>
		</div>
	</section>

	<section class="contacts py-5">
		<div class="container">
			<div class="row">
				<div class="col-12 col-sm-6 col-lg-3 mb-3">
					<?php
					$title = get_theme_mod('contacts_title_1', '');
					$phone = get_theme_mod('contact_phone_1', '');
					$icon = get_theme_mod('contact_icon_1', '');

					$phone_clean = preg_replace('/\D/', '', $phone);
					?>

					<?php if (!empty($title) && !empty($phone)) : ?>
						<div class="d-block mb-5">
							<span class="d-block fs-14 text-info contacts__span span ps-4" style="background: url('<?php echo esc_url($icon); ?>') 0 center / 15px 15px no-repeat;"><?php echo esc_html($title); ?></span>
							<a href="tel:<?php echo $phone_clean; ?>" class="d-block fs-16 fw-700"><?php echo esc_html($phone); ?></a>
						</div>
					<?php endif; ?>


					<?php
					$title = get_theme_mod('contacts_title_3', '');
					$phone = get_theme_mod('contact_phone_3', '');
					$icon = get_theme_mod('contact_icon_3', '');

					$phone_clean = preg_replace('/\D/', '', $phone);
					?>

					<?php if (!empty($title) && !empty($phone)) : ?>
						<div class="d-block mb-5">
							<span class="d-block fs-14 text-info contacts__span span ps-4" style="background: url('<?php echo esc_url($icon); ?>') 0 center / 15px 15px no-repeat;"><?php echo esc_html($title); ?></span>
							<a href="tel:<?php echo $phone_clean; ?>" class="d-block fs-16 fw-700"><?php echo esc_html($phone); ?></a>
						</div>
					<?php endif; ?>

					<div class=" d-block">
						<span class="d-block fs-14 text-info contacts__span span span--mail position-relative ps-4">Почта</span>
						<?php if (get_theme_mod('emails')) : ?>
							<div class="emails">
								<a class="d-block fs-16 fw-700" href="mailto:<?php echo esc_html(get_theme_mod('emails')); ?>"><?php echo esc_html(get_theme_mod('emails')); ?></a>
							</div>
						<?php endif; ?>
					</div>
				</div>
				<div class="col-12 col-sm-6 col-lg-3 mb-3">
					<?php
					$title = get_theme_mod('contacts_title_2', '');
					$phone = get_theme_mod('contact_phone_2', '');
					$icon = get_theme_mod('contact_icon_2', '');

					$phone_clean = preg_replace('/\D/', '', $phone);
					?>

					<?php if (!empty($title) && !empty($phone)) : ?>
						<div class="d-block mb-5">
							<span class="d-block fs-14 text-info contacts__span span ps-4" style="background: url('<?php echo esc_url($icon); ?>') 0 center / 15px 15px no-repeat;"><?php echo esc_html($title); ?></span>
							<a href="tel:<?php echo $phone_clean; ?>" class="d-block fs-16 fw-700"><?php echo esc_html($phone); ?></a>
						</div>
					<?php endif; ?>

					<div class="d-block mb-5">
						<span class="d-block fs-14 text-info contacts__span">График работы ежедневно с 8:00 до 19:00</span>



					</div>

					<div class="d-block">
						<span class="d-block fs-14 text-info contacts__span span span--map position-relative ps-4">Адрес офиса</span>
						<?php if (get_theme_mod('adress')) : ?>
							<div class="adress">
								<a class="d-block fs-16 fw-700" href="#"><?php echo esc_html(get_theme_mod('adress')); ?></a>
							</div>
						<?php endif; ?>
					</div>
				</div>
				<div class="col-12 col-lg-6">
					<span class="d-block fs-14 text-info contacts__span span span--map position-relative ps-4 mb-3">Пункты приема</span>
					<ul class="contacts__list">
						<li class="mb-2">
							<a href="#" class="fs-16 fw-700">Площадка г. Санкт-Петербург вн. тер. г. Морские ворота, остров Вольный, д. 1 <strong>работает круглосуточно.</strong>
							</a>
						</li>
						<li class="mb-2">
							<a href="#" class="fs-16 fw-700">Площадка г. Санкт-Петербург проспект Большевиков, 56к4
							</a>
						</li>
						<li class="mb-2">
							<a href="#" class="fs-16 fw-700">Площадка г Колпино, тер. Ижорский завод, участок 20 (южнее дома
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