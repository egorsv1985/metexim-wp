<?php
/*
Template Name: Шаблон дополнительных страниц
*/

get_header(); ?>
<main>
  <section class="promo">
    <div class="container py-5">
      

 <h1 class="col-12  h1 fs-50 fw-900 mb-4">
                  <?php the_title(); ?>
                </h1>
                <div class="col-12 fs-20  mb-5">
                  <?php the_content(); ?>
                </div>
    </div>
  </section>
</main>
<?php
get_footer();
?>
