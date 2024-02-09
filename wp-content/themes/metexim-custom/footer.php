<footer class="footer py-5">
	<div class="container bg-secondary rounded-3 p-5">
		<div class="row mb-4">
			<div class="col-12 col-sm-6 col-lg-3">
				<?php if (get_theme_mod('custom_logo')) : ?>
					<a href="<?php echo esc_url(home_url('/')); ?>" class="header__logo logo d-flex align-items-center">
						<img src="<?php echo esc_url(wp_get_attachment_url(get_theme_mod('custom_logo'))); ?>" alt="<?php bloginfo('name'); ?>">
					</a>
				<?php else : ?>
					<a href="<?php echo esc_url(home_url('/')); ?>" class="header__logo logo d-flex align-items-center">
						<?php bloginfo('name'); ?>
					</a>
				<?php endif; ?>
				<?php if (get_theme_mod('inn')) : ?>
					<div class="inn">
						<span class="d-block fs-14 text-info text-nowrap">ИНН <?php echo esc_html(get_theme_mod('inn')); ?></span>
					</div>
				<?php endif; ?>
				<?php if (get_theme_mod('kpp')) : ?>
					<div class="kpp">
						<span class="d-block fs-14 text-info text-nowrap">КПП <?php echo esc_html(get_theme_mod('kpp')); ?></span>
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
					<div class="col-12 col-sm-6 col-lg-3 pt-2">
						<span class="d-block fs-14 text-dark footer__span span ps-4 mb-2" style="background-image: url('<?php echo esc_url($icon); ?>');"><?php echo esc_html($title); ?></span>
						<a href="tel:<?php echo $phone_clean; ?>" class="d-block fs-16 fw-700"><?php echo esc_html($phone); ?></a>
					</div>
				<?php endif; ?>
			<?php endfor; ?>
		</div>
		<div class="row mb-5">
			<div class="col-12 col-sm-6 col-lg-3">
				<h3 class="fs-18 fw-600 mb-3">Контакты</h3>
				<?php if (get_theme_mod('working_hours')) : ?>
					<div class="working-hours">
						<span class="d-block fs-14 text-info text-nowrap"><?php echo esc_html(get_theme_mod('working_hours')); ?></span>
					</div>
				<?php endif; ?>

				<?php if (get_theme_mod('emails')) : ?>
					<div class="emails">
						<a class="d-block fs-16 text-info text-nowrap mb-4" href="mailto:<?php echo esc_html(get_theme_mod('emails')); ?>"><?php echo esc_html(get_theme_mod('emails')); ?></a>
					</div>
				<?php endif; ?>
				<?php
				$menu_items = wp_get_nav_menu_items('Мессенджеры');
				if ($menu_items) {
					echo '<ul class="footer__social-list social d-flex gap-2 ps-0 m-0">';
					foreach ($menu_items as $item) {
						$icon_image = get_field('ikonka', $item->object_id); // Получаем изображение из поля ACF "ikonka" для текущего пункта меню
						echo '<li class="social__item">';
						echo '<a href="' . $item->url . '"  title="' . $item->title . '" class="social__link d-block" style="background-image: url(\'' . $icon_image . '\') ;">';
						echo '</a>';
						echo '</li>';
					}

					// Добавляем вручную ссылку на Вайбер в конце списка
					echo '<li class="social__item">';
					echo '<a href="viber://chat?number=+79990099603" title="viber" class="social__link d-block"  style="background-image: url(' . get_template_directory_uri() . '/img/icons/viber.svg) ;">';
					echo '</a>';
					echo '</li>';

					echo '</ul>';
				}
				?>
			</div>
			<div class="col-12 col-sm-6 col-lg-3">
				<h3 class="fs-18 fw-600 mb-3">Полезная информация</h3>
				<nav class="header__menu menu col-12 position-relative">
					<?php
					$menu_items = wp_get_nav_menu_items('Виды приема металлов');
					if ($menu_items) {
						echo '<ul class="ps-0 d-flex flex-column gap-2">';
						foreach ($menu_items as $item) {
							echo '<li>';
							echo '<a href="' . $item->url . '" class="fs-16 text-info">' . $item->title . '</a>';
							echo '</li>';
						}
						echo '</ul>';
					}
					?>
				</nav>
			</div>
			<div class="col-12 col-sm-6 col-lg-3">
				<h3 class="fs-18 fw-600 mb-3">Услуги</h3>
				<nav class="header__menu menu col-12 position-relative">
					<?php
					$menu_items = wp_get_nav_menu_items('Услуги');
					if ($menu_items) {
						echo '<ul class="ps-0 d-flex flex-column gap-2">';
						foreach ($menu_items as $item) {
							echo '<li>';
							echo '<a href="' . $item->url . '" class="fs-16 text-info">' . $item->title . '</a>';
							echo '</li>';
						}
						echo '</ul>';
					}
					?>
				</nav>
			</div>
			<div class="col-12 col-sm-6 col-lg-3">
				<h3 class="fs-18 fw-600 mb-3">Оборудование</h3>
				<nav class="header__menu menu col-12 position-relative">
					<?php
					$menu_items = wp_get_nav_menu_items('Оборудование');
					if ($menu_items) {
						echo '<ul class="ps-0 d-flex flex-column gap-2">';
						foreach ($menu_items as $item) {
							echo '<li>';
							echo '<a href="' . $item->url . '"  class="fs-16 text-info">' . $item->title . '</a>';
							echo '</li>';
						}
						echo '</ul>';
					}
					?>
				</nav>
			</div>
		</div>
		<div class="border-top border-info row py-4">
			<div class="col-12 col-sm-6 col-lg-3">
				<small class="fs-14 fw-500 text-info">© Все права защищены </small>
			</div>
			<div class="col-12 col-sm-6 col-lg-3">
				<a class="fs-14 fw-500 text-info" href="/pravovaja-informacija/" title="Правовая информация">Правовая информация</a>
				<a class="fs-14 fw-500 text-info" href="/polzovatelskoesoglashenie/" title="Пользовательское соглашение">Пользовательское соглашение</a>
			</div>
			<div class="col-12 col-sm-6 col-lg-3">
				<a href="/kontakty/" target="_blank" class="fs-14 fw-500 text-info">Вакансии</a>
			</div>
			<div class="col-12 col-sm-6 col-lg-3">
				<a href="https://target-kc.ru" target="_blank" class="fs-14 fw-500 text-info">Разработка сайта ТКК</a>
			</div>
		</div>
	</div>
</footer>
</div>
<div id="callback" aria-hidden="true" class="popup">
	<div class="popup__wrapper">
		<div class="popup__content">
			<button data-close type="button" class="popup__close">
				<svg width="45" height="46" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M22.4999 24.6545L32.7543 34.9117L34.7455 32.9232L24.4883 22.666L34.7455 12.4117L32.7571 10.4204L22.4999 20.6776L12.2455 10.4204L10.2571 12.4117L20.5115 22.666L10.2571 32.9204L12.2455 34.9117L22.4999 24.6545Z" fill="white" />
				</svg>
			</button>
			<?php echo do_shortcode('[contact-form-7 id="233" title="Попап"]'); ?>
		</div>
	</div>
</div>
<?php wp_footer(); ?>
</body>


</html>