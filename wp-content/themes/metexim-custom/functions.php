<?php
// Подключение стилей
function metexim_custom_enqueue_styles()
{
    wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.css');
    wp_enqueue_style('swiper', 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css');
    wp_enqueue_style('style', get_stylesheet_directory_uri() . '/style.css');
}
add_action('wp_enqueue_scripts', 'metexim_custom_enqueue_styles');


// Подключение скриптов
function metexim_custom_enqueue_scripts()
{
    wp_enqueue_script('popper', 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js', array('jquery'), null, false);
    wp_enqueue_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js', array('jquery'), null, false);
    wp_enqueue_script('swiper', 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js', array(''), null, false);
    wp_enqueue_script('app', get_stylesheet_directory_uri() . '/js/app.js');
}
add_action('wp_enqueue_scripts', 'metexim_custom_enqueue_scripts');



// Регистрация меню
function metexim_custom_register_menus()
{
    register_nav_menus(array(
        'primary-menu' => 'Основное меню',
    ));
}
add_action('init', 'metexim_custom_register_menus');
?>


<?php
// Создание типа записи "Галерея"
function create_gallery_post_type()
{
    $labels = array(
        'name'               => 'Галерея',
        'singular_name'      => 'Слайд',
        'menu_name'          => 'Галерея',
        'name_admin_bar'     => 'Слайд',
        'add_new'            => 'Добавить новый',
        'add_new_item'       => 'Добавить новый слайд',
        'new_item'           => 'Новый слайд',
        'edit_item'          => 'Редактировать слайд',
        'view_item'          => 'Просмотреть слайд',
        'all_items'          => 'Все слайды',
        'search_items'       => 'Искать слайды',
        'parent_item_colon'  => 'Родительский слайд:',
        'not_found'          => 'Слайды не найдены.',
        'not_found_in_trash' => 'В корзине слайды не найдены.'
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'menu_icon'          => 'dashicons-images-alt2',
        'supports'           => array('title', 'editor', 'thumbnail'),
        'has_archive'        => false,
        'rewrite'            => array('slug' => 'gallery'),
    );

    register_post_type('gallery', $args);
}
add_action('init', 'create_gallery_post_type');

// Добавление метабокса для выбора фонового изображения
function add_gallery_meta_box()
{
    add_meta_box('gallery_background', 'Фоновое изображение', 'render_gallery_background_meta_box', 'gallery', 'normal', 'high');
}
add_action('add_meta_boxes', 'add_gallery_meta_box');

function render_gallery_background_meta_box($post)
{
    $background_image = get_post_meta($post->ID, 'gallery_background_image', true);

    wp_nonce_field(basename(__FILE__), 'gallery_background_nonce');
?>
    <p>
        <label for="gallery_background_image">Выберите фоновое изображение:</label><br>
        <?php if ($background_image) : ?>
            <img src="<?php echo esc_url($background_image); ?>" alt="Background Image" style="max-width: 200px; margin-bottom: 10px;">
        <?php endif; ?>
        <input type="hidden" id="gallery_background_image" name="gallery_background_image" value="<?php echo esc_attr($background_image); ?>">
        <br>
        <button id="gallery_background_image_button" class="button"><?php echo $background_image ? 'Изменить изображение' : 'Выбрать изображение'; ?></button>
    </p>
    <script>
        jQuery(document).ready(function($) {
            var mediaUploader;
            $('#gallery_background_image_button').click(function(e) {
                e.preventDefault();
                if (mediaUploader) {
                    mediaUploader.open();
                    return;
                }
                mediaUploader = wp.media({
                    title: 'Выберите изображение',
                    button: {
                        text: 'Выбрать'
                    },
                    multiple: false
                }).on('select', function() {
                    var attachment = mediaUploader.state().get('selection').first().toJSON();
                    $('#gallery_background_image').val(attachment.url);
                    $('#gallery_background_image_button').html('Изменить изображение');
                    $('#gallery_background_image').siblings('img').attr('src', attachment.url).show();
                }).open();
            });
        });
    </script>
<?php
}


function save_gallery_background_meta_box($post_id)
{
    if (!isset($_POST['gallery_background_nonce']) || !wp_verify_nonce($_POST['gallery_background_nonce'], basename(__FILE__))) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (isset($_POST['post_type']) && 'gallery' == $_POST['post_type']) {
        if (!current_user_can('edit_page', $post_id)) {
            return;
        }
    } else {
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
    }

    if (isset($_POST['gallery_background_image'])) {
        update_post_meta($post_id, 'gallery_background_image', sanitize_text_field($_POST['gallery_background_image']));
    }
}
add_action('save_post', 'save_gallery_background_meta_box');


?>


<?php
function acf_generate_field_name($field)
{
    // Проверяем, задано ли поле Field Label
    if (isset($field['label']) && !empty($field['label'])) {
        // Заменяем символы пробела и знаков препинания на дефисы
        $field_name = sanitize_title($field['label']);

        // Удаляем возможные повторяющиеся дефисы
        $field_name = preg_replace('/-+/', '-', $field_name);

        // Устанавливаем полученное значение в Название поля (Name)
        $field['name'] = $field_name;
    }

    return $field;
}
add_filter('acf/load_field', 'acf_generate_field_name');
?>


<?php
add_filter('wpcf7_autop_or_not', '__return_false');
add_filter('wpcf7_form_elements', 'custom_wpcf7_form_elements');

function custom_wpcf7_form_elements($form)
{
    // Удалите или измените ненужные вам теги формы
    $form = str_replace('<br />', '', $form); // Удалить автоматически добавляемые теги <br />
    $form = str_replace('<span class="wpcf7-form-control-wrap">', '', $form); // Удалить открывающий тег <span>
    $form = str_replace('</span>', '', $form); // Удалить закрывающий тег </span>



    return $form;
}
?>





<?php
function allow_svg_upload($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'allow_svg_upload');
?>

<?php
function create_category_sections()
{
    $categories = get_categories(); // Получаем все рубрики
    $position = 25; // Позиция новых секций

    foreach ($categories as $category) {
        // Проверяем, что рубрика не является "без рубрики"
        if ($category->slug !== 'uncategorized') {
            // Создаем новую секцию на основе названия рубрики
            $section = array(
                'title' => $category->name,
                'icon'  => 'dashicons-admin-post', // Иконка секции (можете изменить на другую)
                'slug'  => 'edit.php?category_name=' . $category->slug . '&post_type=post',
            );

            // Добавляем секцию в административную панель
            $page = add_menu_page(
                $category->name,
                $category->name,
                'edit_posts',
                $section['slug'],
                '',
                $section['icon'],
                $position
            );

            // Добавляем подменю с созданием новых записей
            add_action('admin_menu', function () use ($section) {
                add_submenu_page(
                    $section['slug'],
                    'Добавить новую',
                    'Добавить новую',
                    'edit_posts',
                    'post-new.php?post_type=' . $section['slug']
                );

                // Добавляем класс для выделения активной секции
                add_action('admin_enqueue_scripts', function () use ($section) {
                    global $pagenow;

                    if (($pagenow === 'post-new.php' || $pagenow === 'edit.php') && isset($_GET['post_type']) && $_GET['post_type'] === $section['slug']) {
                        echo '<style>#toplevel_page_' . $section['slug'] . ' > a.wp-has-submenu { font-weight: bold; }</style>';
                    }
                });
            });

            $position += 1; // Увеличиваем позицию для следующей секции
        }
    }
}

add_action('admin_menu', 'create_category_sections');






?>


<?php



?>