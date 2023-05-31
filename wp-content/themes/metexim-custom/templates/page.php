<?php
/*
Template Name: Шаблон основных страниц
*/

get_header();
?>
<main>
	<section class="promo">
		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-6">
					<div class="bg-secondary py-4 px-5 rounded-3 h-100 d-flex flex-column">
						<div class="d-flex align-items-center mb-4">
							<button class="fs-14 fw-500 btn btn-transparent btn-outline-danger px-5 py-3 position-relative btn__arrow btn__arrow--back me-4" disabled title="Назад">Назад</button>
							<?php
							if (function_exists('yoast_breadcrumb')) {
								yoast_breadcrumb('<nav class="breadcrumb">', '</nav>');
							}
							?>
						</div>

						<div class="h1 fs-50 fw-900 mb-4"><?php the_title(); ?></div>
						<h2 class="fs-20 fw-600 mb-5">
							<?php the_content(); ?>
						</h2>
						<a class="col-12 col-sm-9 col-lg-6 btn fs-20 fw-600 px-3 py-3 btn-danger mb-5" data-popup="#callback" href="#callback" role="button" title="Оставить заявку">Оставить заявку</a>
					</div>
				</div>
				<div class="col-12 col-lg-6">
					<div class="promo__box-img">
						<img src="<?php echo get_field('izobrazhenie'); ?>" alt="foto" width="540" class="promo__img w-100">
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="content py-5">
		<div class="container">
			<nav class="menu col-12 position-relative">
				<?php
				$menu_items = wp_get_nav_menu_items('Дополнительное меню');
				if ($menu_items) {
					echo '<ul class="menu__list d-none d-lg-flex h-100 align-items-center justify-content-between text-nowrap ps-0 gap-3 border-bottom border-secondary">';
					foreach ($menu_items as $item) {
						echo '<li class="menu__item d-flex justify-content-center pb-4">';
						echo '<a href="' . $item->url . '" class="menu__link d-inline-block">' . $item->title . '</a>';
						echo '</li>';
					}
					echo '</ul>';
				}
				?>
			</nav>

			<div class="row" data-sticky data-sticky-header>
				<div class="col-12 col-md-8">
					<div class="mb-5" id="description">
						<div class="col-4 col-lg-2">
							<div class="bg-secondary text-danger text-center px-3 py-2 fs-16 fw-500 mb-4 rounded-2">
								<span>Описание</span>
							</div>
						</div>
						<h2 class="fs-30 fw-800 mb-3"> <?php echo get_field('zagolovok-opisanija'); ?></h2>
						<p class="fs-16 fw-500 mb-4">
						<?php echo get_field('opisanie-nad-izobrazheniem'); ?>
						</p>
						<div class="d-block rounded-3">
						<img src="<?php echo get_field('izobrazhenie-opisanija'); ?>" alt="Описание" width="730" class="w-100">
							
						</div>
						<p class="fs-16 fw-500 mb-4">
						<?php echo get_field('opisanie-pod-izobrazheniem'); ?>
						</p>
					</div>
					<div class="mb-5" id="price">
						<div class="col-4 col-lg-2">
							<div class="bg-secondary text-danger text-center px-3 py-2 fs-16 fw-500 mb-4 rounded-2">
								<span>Цены</span>
							</div>
						</div>
						<h2 class="fs-30 fw-800 mb-3">
							Ценообразование на прием лома черных металлов
						</h2>
						<p class="fs-16 fw-500 mb-4">
							Черные металлы играют значимую роль в современном строительстве,
							освоении космоса, производстве и пр. В связи с тем, что добыча руд и
							выплавка такого металла обходится дорого, куда рациональнее
							осуществлять вторичную обработку столь востребованного ресурса.
							Потому-то прием черного металла в СПб пользуется такой
							популярностью. Хотя многие «по старинке» выбрасывают мусор на
							свалку.
						</p>

						<table class="table table-striped table-hover border border-secondary rounded-3">
							<thead class="table-danger border-0 fs-16 fw-600">
								<tr>
									<th class="py-4 ps-4 align-middle">Наименование лома</th>
									<th class="py-4 align-middle">0 кг. – 100 кг.</th>
									<th class="py-4 align-middle">100 кг. – 1 т.</th>
									<th class="py-4 align-middle">от 1 т.</th>
								</tr>
							</thead>
							<tbody class="fs-14  border-0">
								<tr class="border border-secondary">
									<td class="py-4 ps-4">Лом 3А (габаритная сталь)</td>
									<td class="py-4">12 руб./кг</td>
									<td class="py-4">12 руб./кг</td>
									<td class="py-4">13,5 руб./кг</td>
								</tr>
								<tr class="border border-secondary">
									<td class="py-4 ps-4">Лом 5А (негабаритная сталь)</td>
									<td class="py-4">12 руб./кг</td>
									<td class="py-4">12 руб./кг</td>
									<td class="py-4">13,5 руб./кг</td>
								</tr>								
							</tbody>
						</table>
						<?php echo do_shortcode('[table id=3 /]'); ?>
					</div>
					<div class="mb-5" id="steps">
						<div class="col-5 col-lg-3">
							<div class="bg-secondary text-danger text-center px-3 py-2 fs-16 fw-500 mb-4 rounded-2">
								<span>Этапы работы</span>
							</div>
						</div>
						<h2 class="fs-30 fw-800 mb-3">Развиваем отрасль вместе</h2>
						<div class="row mb-4">
							<div class="col-12 col-lg-6 h-100">
								<div class="swiper contentSwiper">
									<div class="swiper-control position-absolute d-flex">
										<div class="swiper-button-prev position-relative end-0"></div>
										<div class="swiper-pagination"></div>
										<div class="swiper-button-next position-relative end-0"></div>
									</div>
									<div class="swiper-wrapper">
										<div class="swiper-slide border border-success rounded-3 p-5">
											<h3 class="fs-20 fw-600 mb-2">Оставляете заявку</h3>
											<p class="fs-16 fw-500 text-info">
												Свяжитесь с нами по средства формы на сайте или позвоните
												по телефону
												<a href="tel:+89213200011">8(921) 320 00 11</a>
											</p>
										</div>
										<div class="swiper-slide border border-success rounded-3 p-5">
											<h3 class="fs-20 fw-600 mb-2">Оставляете заявку</h3>
											<p class="fs-16 fw-500 text-info">
												Свяжитесь с нами по средства формы на сайте или позвоните
												по телефону
												<a href="tel:+89213200011">8(921) 320 00 11</a>
											</p>
										</div>
										<div class="swiper-slide border border-success rounded-3 p-5">
											<h3 class="fs-20 fw-600 mb-2">Оставляете заявку</h3>
											<p class="fs-16 fw-500 text-info">
												Свяжитесь с нами по средства формы на сайте или позвоните
												по телефону
												<a href="tel:+89213200011">8(921) 320 00 11</a>
											</p>
										</div>
										<div class="swiper-slide border border-success rounded-3 p-5">
											<h3 class="fs-20 fw-600 mb-2">Оставляете заявку</h3>
											<p class="fs-16 fw-500 text-info">
												Свяжитесь с нами по средства формы на сайте или позвоните
												по телефону
												<a href="tel:+89213200011">8(921) 320 00 11</a>
											</p>
										</div>
										<div class="swiper-slide border border-success rounded-3 p-5">
											<h3 class="fs-20 fw-600 mb-2">Оставляете заявку</h3>
											<p class="fs-16 fw-500 text-info">
												Свяжитесь с нами по средства формы на сайте или позвоните
												по телефону
												<a href="tel:+89213200011">8(921) 320 00 11</a>
											</p>
										</div>
									</div>
								</div>
							</div>
							<div class="col-12 col-lg-6">
								<div class="rounded-3">
									<img src="@img/steps.png" alt="steps" class="w-100" width="350">
								</div>
							</div>
						</div>
						<p class="fs-16 fw-500 mb-4">
							Как смогли убедиться наши постоянные Клиенты, которые приехали сдать
							черный металл на площадку (приемку), все было выполнено по
							максимально высоким расценкам в городе. Основное, что Вам нужно
							сделать – это просто набрать наш номер телефона и заказать услугу по
							вывозу материала на
							<a href="#" class="text-danger">пункт приема металла</a>. Как
							вариант, Вы можете доставить лом самостоятельно.
						</p>
						<p class="fs-16 fw-500 mb-4">
							Итак, если у Вас есть какие-то трубы, ненужные или вышедшие из строя
							станки, отходы производства, металлоконструкции, офсетные пластины –
							звоните и сдавайте их. Мы принимаем от одного килограмма до
							нескольких тонн. Всю дополнительную информацию о том, как проводится
							прием черного лома в Санкт-Петербурге и Ленинградской области на
							приемке, Вы можете уточнить у наших сотрудников.
						</p>
					</div>
					<div class="mb-5" id="advantages">
						<div class="col-5 col-lg-3">
							<div class="bg-secondary text-danger text-center px-3 py-2 fs-16 fw-500 mb-4 rounded-2">
								<span>Преимущества</span>
							</div>
						</div>
						<h2 class="fs-30 fw-800 mb-3">Особенности работы с нами</h2>

						<div class="row mb-4 overflow-hidden">
							<div class="col-12 col-lg-6 content__item position-relative">
								<div class="py-2 d-flex flex-column">
									<div class="d-flex align-items-center mb-4">
										<div class="advantages__box-svg rounded-circle me-4 d-flex bg-secondary justify-content-center align-items-center">
											<img src="@img/icons/assessment.svg" alt="assessment" class="advantages__svg" width="40" height="25">
										</div>
										<span class="fs-20 fw-600"> Выгодные цены</span>
									</div>
									<p class="fs-16 fw-500 text-info">
										Расчет стоимости осуществляется в зависимости от качества,
										типа примесей в материале и объема поставляемого лома.
									</p>
								</div>
							</div>
							<div class="col-12 col-lg-6 content__item position-relative">
								<div class="py-2 d-flex flex-column">
									<div class="d-flex align-items-center mb-4">
										<div class="advantages__box-svg rounded-circle me-4 d-flex bg-secondary justify-content-center align-items-center">
											<img src="@img/icons/priems.svg" alt="priems" class="advantages__svg" width="21" height="28">
										</div>
										<span class="fs-20 fw-600"> Несколько пунктов приема</span>
									</div>
									<p class="fs-16 fw-500 text-info">
										Расчет стоимости осуществляется в зависимости от качества,
										типа примесей в материале и объема поставляемого лома.
									</p>
								</div>
							</div>
							<div class="col-12 col-lg-6 content__item position-relative">
								<div class="py-2 d-flex flex-column">
									<div class="d-flex align-items-center mb-4">
										<div class="advantages__box-svg rounded-circle me-4 d-flex bg-secondary justify-content-center align-items-center">
											<img src="@img/icons/logistics.svg" alt="logistics" class="advantages__svg" width="30" height="30">
										</div>
										<span class="fs-20 fw-600"> Налаженая логистика</span>
									</div>
									<p class="fs-16 fw-500 text-info">
										Расчет стоимости осуществляется в зависимости от качества,
										типа примесей в материале и объема поставляемого лома.
									</p>
								</div>
							</div>

							<div class="col-12 col-lg-6 content__item position-relative">
								<div class="py-2 d-flex flex-column">
									<div class="d-flex align-items-center mb-4">
										<div class="advantages__box-svg rounded-circle me-4 d-flex bg-secondary justify-content-center align-items-center">
											<img src="@img/icons/buy.svg" alt="buy" class="advantages__svg" width="30" height="28">
										</div>
										<span class="fs-20 fw-600"> Своевременная оплата</span>
									</div>
									<p class="fs-16 fw-500 text-info">
										Расчет стоимости осуществляется в зависимости от качества,
										типа примесей в материале и объема поставляемого лома.
									</p>
								</div>
							</div>
						</div>
						<p class="fs-16 fw-500 mb-4">
							Приём черных металлов в СПб представляет собой достаточно серьезное
							дело, в котором необходимы профессиональные знания, навыки,
							специальное оборудование и современная аппаратура для анализа.
							Сотрудничая с нашей компанией, Вы сможете выгодно избавиться от
							того, что захламляет территорию или участок. Прозрачность на всех
							этапах сдачи и высокие
							<a href="#" class="text-danger">цены на черный металлолом</a>мы
							гарантируем!
						</p>
						<div class="row">
							<div class="col-12 col-lg-6">
								<img src="@img/document1.png" alt="document" class="w-100" width="350">
							</div>
							<div class="col-12 col-lg-6">
								<img src="@img/document2.png" alt="document" class="w-100" width="350">
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-4">
					<form data-sticky-item name="iblock_add" action="#" method="post" class="rounded-3 border p-4 bg-secondary">
						<p class="fs-24 fw-800 text-center mb-1">Остались вопросы?</p>
						<p class="fs-16 text-center mb-4">Проконсультируем вас!</p>
						<input type="text" id="name-content" name="form[]" placeholder="Ваше имя" class="form-control d-block w-100 mb-3 fs-14 text-info px-4 py-3" required="required" size="30" value="">

						<input type="tel" id="tel-content" size="30" name="form[]" data-error="Ошибка" placeholder="Телефон" class="form-control d-block w-100 mb-3 fs-14 text-info px-4 py-3" value="" required="required">
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
	<script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>

	<!-- Initialize Swiper -->
	<script>
		// выбираем элемент с id "promo-section" и создаем новый Swiper объект
		var contentSwiper = new Swiper(".contentSwiper", {
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
				el: ".content .swiper-scrollbar",
			},
			// включаем кнопки "вперед" и "назад" для навигации по слайдам
			navigation: {
				nextEl: ".content .swiper-button-next",
				prevEl: ".content .swiper-button-prev",
			},
			// включаем пагинацию и настраиваем внешний вид номеров слайдов
			pagination: {
				el: ".content .swiper-pagination",
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