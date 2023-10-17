<?php
/*
Template Name: Шаблон О компании
*/

get_header();
?>
<main>
	<section class="promo">
		<div class="container">
			<div class="row gy-3">
				<div class="col-12 col-lg-6">
					<div class="bg-secondary py-4 px-5 rounded-3 h-100 d-flex flex-column">
						<div class="d-flex align-items-center mb-4">
							<? if (isset($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], $_SERVER['SERVER_NAME']) !== false) : ?>
								<a href="javascript:history.back();" class="fs-14 fw-500 btn btn-transparent btn-outline-danger px-5 py-3 position-relative btn__arrow btn__arrow--back me-4" title="Назад">Назад</a>
							<? endif; ?>
							<?php
							if (function_exists('yoast_breadcrumb')) {
								yoast_breadcrumb('<nav class="breadcrumb">', '</nav>');
							}
							?>
						</div>

						<?php
						$title_words = explode(' ', get_the_title());
						$title_class = (count($title_words) > 2) ? 'fs-40' : 'fs-50';
						?>
						<div class="h1 <?php echo esc_attr($title_class); ?> fw-900 mb-4"><?php the_title(); ?></div>


						<div class="fs-20 fw-600 mb-4">
							<?php
							$content = get_the_content();
							$content = preg_replace('/<img[^>]+>/', '', $content);
							echo $content;
							?>

						</div>
						<a class="col-12 col-sm-9 col-lg-6 btn fs-20 fw-600 px-3 py-3 btn-danger mb-5" data-popup="#callback" href="#callback" role="button" title="Оставить заявку">Оставить заявку</a>
					</div>
				</div>
				<div class="col-12 col-lg-6">
					<div class="promo__box-img h-100 rounded-3" style="
    background: url('<?= get_field('izobrazhenie'); ?>') 50% 50% no-repeat;
    background-size: cover;
">
						<img src="<?php echo get_field('izobrazhenie'); ?>" alt="foto" width="540" class="promo__img w-100 rounded-3 opacity-0">

					</div>

				</div>
			</div>
		</div>
	</section>
	<section class="content py-5">
		<div class="container">


			<div class="row" data-sticky data-sticky-header>
				<div class="col-12 col-md-8">
					<div class="mb-5" id="description">
						<div class="col-4 col-lg-2">

						</div>
						<h2 class="fs-30 fw-800 mb-3"> <?php echo get_field('zagolovok-opisanija'); ?></h2>
						<p class="fs-16 fw-500 mb-4">
							<?php echo get_field('opisanie-nad-izobrazheniem'); ?>
						</p>


					</div>



				</div>
				<div class="col-12 col-md-4">
					<div class="content__sticky rounded-3 border p-4 bg-secondary" data-sticky-item>
						<p class="fs-24 fw-800 text-center mb-1">Остались вопросы?</p>
						<p class="fs-16 text-center mb-4">Проконсультируем вас!</p>
						<?php echo do_shortcode('[contact-form-7 id="102" title="Консультация"]'); ?>
					</div>
				</div>
			</div>
		</div>
	</section>




</main>

<?php
get_footer();
?>