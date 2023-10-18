<?
// Подключение стилей
function metexim_custom_enqueue_styles()
{
	// wp_enqueue_style('fancybox', 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css');
	wp_enqueue_style('fancybox', get_stylesheet_directory_uri() . '/css/fancybox.css');
	// wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css');
	wp_enqueue_style('bootstrap', get_stylesheet_directory_uri() . '/css/bootstrap.min.css');
	// wp_enqueue_style('swiper', 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css');
	wp_enqueue_style('swiper', get_stylesheet_directory_uri() . '/css/swiper-bundle.min.css');

	wp_enqueue_style('style', get_stylesheet_directory_uri() . '/style.css');
}
add_action('wp_enqueue_scripts', 'metexim_custom_enqueue_styles');


// Подключение скриптов
function metexim_custom_enqueue_scripts()
{	
	// wp_enqueue_script('popper', 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js', array('jquery'), null, false);
	wp_enqueue_script('popper', get_stylesheet_directory_uri() . '/js/popper.min.js', array('jquery'), null, false);
	wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.6.0.js', array(), null, false);
	// wp_enqueue_script('fancybox', 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js', array('jquery'), null, false);
	wp_enqueue_script('fancybox', get_stylesheet_directory_uri() . '/js/fancybox.umd.js', array('jquery'), null, false);
	// wp_enqueue_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js', array('jquery'), null, false);
	wp_enqueue_script('bootstrap', get_stylesheet_directory_uri() . '/js/bootstrap.min.js', array('jquery'), null, false);
	// wp_enqueue_script('inputmask', 'https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.5/jquery.inputmask.min.js', array('jquery'), null, false);
	wp_enqueue_script('inputmask', get_stylesheet_directory_uri() . '/js/jquery.inputmask.min.js', array('jquery'), null, false);
	// wp_enqueue_script('swiper', 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js', array('jquery'), null, false);
	wp_enqueue_script('swiper', get_stylesheet_directory_uri() . '/js/swiper-bundle.min.js', array('jquery'), null, false);
	wp_enqueue_script('app', get_stylesheet_directory_uri() . '/js/app.min.js');
}
add_action('wp_enqueue_scripts', 'metexim_custom_enqueue_scripts');



// Регистрация меню
function metexim_custom_register_menus()
{
	register_nav_menus(array(
		'primary-menu' => 'Основное меню',
		'secondary-menu' => 'Дополнительное меню',
		'vidy-priema-metallov' => 'Виды приема металлов',
		'uslugi' => 'Услуги',
		'oborudovanie' => 'Оборудование',
	));
}
add_action('init', 'metexim_custom_register_menus');

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

add_filter('wpcf7_autop_or_not', '__return_false');

//add_filter('wpcf7_form_elements', 'custom_wpcf7_form_elements');

function custom_wpcf7_form_elements($form)
{
    // Удалите или измените ненужные вам теги формы
    $form = str_replace('<br />', '', $form); // Удалить автоматически добавляемые теги <br />
    $form = str_replace('<span class="wpcf7-form-control-wrap">', '', $form); // Удалить открывающий тег <span>
    $form = str_replace('</span>', '', $form); // Удалить закрывающий тег </span>
    return $form;
}

function allow_svg_upload($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'allow_svg_upload');

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
            });

            // Добавляем класс для выделения активной секции
            add_action('admin_enqueue_scripts', function () use ($section) {
                global $pagenow;
                if (($pagenow === 'post-new.php' || $pagenow === 'edit.php') && isset($_GET['post_type']) && $_GET['post_type'] === $section['slug']) {
                    echo '<style>#toplevel_page_' . $section['slug'] . ' > a { color: #00f !important; }</style>';
                }
            });

            $position += 1; // Увеличиваем позицию для следующей секции
        }
    }
}

add_action('admin_menu', 'create_category_sections');


// Регистрируем функцию my_theme_customize_register для работы с настройками темы WordPress
add_action('customize_register', 'my_theme_customize_register');

function my_theme_customize_register($wp_customize)
{
    // Добавляем раздел "Настройки темы"
    $wp_customize->add_section('my_theme_settings', array(
        'title' => 'Логотип',
        'priority' => 200,
    ));

    // Добавляем поле "Логотип"
    $wp_customize->add_setting('custom_logo', array(
        'default' => '',
        'sanitize_callback' => 'absint',
    ));

    $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'custom_logo_control', array(
        'label' => 'Логотип',
        'section' => 'my_theme_settings',
        'settings' => 'custom_logo',
        'mime_type' => 'image',
    )));

    // Добавляем поле "Режим работы"
    $wp_customize->add_setting('working_hours', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('working_hours_control', array(
        'label' => 'Режим работы',
        'section' => 'my_theme_settings',
        'settings' => 'working_hours',
        'type' => 'text',
    ));

    // Добавляем поле "Почта"
    $wp_customize->add_setting('emails', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('emails_control', array(
        'label' => 'Почта',
        'section' => 'my_theme_settings',
        'settings' => 'emails',
        'type' => 'text',
    ));
    // Добавляем поле "Адрес"
    $wp_customize->add_setting('adress', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('adress_control', array(
        'label' => 'Адрес',
        'section' => 'my_theme_settings',
        'settings' => 'adress',
        'type' => 'text',
    ));

    // Добавляем поле "ИНН"
    $wp_customize->add_setting('inn', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('inn_control', array(
        'label' => 'ИНН',
        'section' => 'my_theme_settings',
        'settings' => 'inn',
        'type' => 'text',
    ));

    // Добавляем поле "КПП"
    $wp_customize->add_setting('kpp', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('kpp_control', array(
        'label' => 'КПП',
        'section' => 'my_theme_settings',
        'settings' => 'kpp',
        'type' => 'text',
    ));

    // Добавляем секцию "Контакты"
    $wp_customize->add_section('contacts_section', array(
        'title' => 'Контакты',
        'priority' => 201,
    ));



    // Добавляем контакты
    for ($i = 1; $i <= 3; $i++) {
        add_contact_fields($wp_customize, $i, ($i === 1) ? true : false);
    }
}

function add_contact_fields($wp_customize, $count, $is_first = false)
{

    // Добавляем кнопку добавления контакта
    $wp_customize->add_setting('add_contact', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    // Добавляем кнопку добавления контакта
    $wp_customize->add_control('add_contact_control', array(
        'label' => 'Добавить контакт',
        'section' => 'contacts_section',
        'settings' => 'add_contact_control',
        'type' => 'button',
        'class' => 'add-contact',
    ));

    // Добавляем поле "Название контакта"
    $wp_customize->add_setting('contacts_title_' . $count, array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('contacts_title_' . $count . '_control', array(
        'label' => 'Название контакта',
        'section' => 'contacts_section',
        'settings' => 'contacts_title_' . $count,
        'type' => 'text',
        'description' => 'Введите название контакта',
    ));

    // Добавляем поле "Телефон контакта"
    $wp_customize->add_setting('contact_phone_' . $count, array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));


    $wp_customize->add_control('contact_phone_' . $count . '_control', array(
        'label' => 'Телефон контакта',
        'section' => 'contacts_section',
        'settings' => 'contact_phone_' . $count,
        'type' => 'tel',
        'description' => 'Введите телефон контакта',
    ));

    // Добавляем поле "Иконка контакта"
    $wp_customize->add_setting('contact_icon_' . $count, array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'contact_icon_' . $count . '_control', array(
        'label' => 'Иконка контакта',
        'section' => 'contacts_section',
        'settings' => 'contact_icon_' . $count,
        'mime_type' => 'image',
        'description' => 'Выберите изображение для использования в качестве иконки контакта',
    )));

    if (!$is_first) {
        // Добавляем кнопку удаления контакта, если этот контакт не первый
        $wp_customize->add_control('remove_contact_' . $count . '_control', array(
            'label' => 'Удалить контакт',
            'section' => 'contacts_section',
            'type' => 'button',
            'class' => 'remove-contact',
            'data-contact-number' => $count,
        ));
    }
}

// Добавляем скрипт для обработки добавления и удаления контактов
$script = "
    var contacts_count = " . $count . ";

    jQuery(document).on('click', '.add-contact', function() {
        if (contacts_count >= 10) {
            alert('Максимальное количество контактов - 10');
            return;
        }
        contacts_count++;
        var new_contact_fields = jQuery(this).parent().parent().append('<div class=\"contact-' + contacts_count + '\"></div>');
        var new_contact = jQuery('.contact-' + contacts_count);
        new_contact.append('<label for=\"contacts_title_' + contacts_count + '_control\">Название контакта</label><br>' +
            '<input type=\"text\" name=\"contacts_title_' + contacts_count + '\" id=\"contacts_title_' + contacts_count + '_control\" /><br>' +
            'Телефон контакта<br>' +
            '<input type=\"tel\" name=\"contact_phone_' + contacts_count + '\" id=\"contact_phone_' + contacts_count + '_control\" /><br>' +
            'Иконка контакта<br>' +
            '<img src=\"\" class=\"icon-preview-' + contacts_count + '\" style=\"max-width:100px;display:none\"/>' +
            '<input type=\"hidden\" name=\"contact_icon_' + contacts_count + '\" id=\"contact_icon_' + contacts_count + '_control\" />' +
            '<button class=\"remove-contact\" data-contact-number=\"' + contacts_count + '\">Удалить контакт</button>');
        new_contact.find('input[type=\"file\"]').change(function() {
            var input = jQuery(this),
                img = input.next('.icon-preview-' + contacts_count),
                file = input[0].files[0],
                reader = new FileReader();

            reader.onload = function(e) {
                img.attr('src', e.target.result);
            };

            reader.readAsDataURL(file);
            img.show();
        });

        return false;
    });

    jQuery(document).on('click', '.remove-contact', function() {
        var contact_number = jQuery(this).data('contact-number');

        if (contact_number > 1) {
            jQuery('.contact-' + contact_number).remove();
        }

        return false;
    });
";

wp_add_inline_script('customize-controls', $script);

function add_custom_classes_to_breadcrumbs($output)
{


    // Добавление дополнительных классов к каждому <nav> элементу
    $output = str_replace('<nav', '<nav class="d-inline-flex mb-0"', $output);
    $output = str_replace('</nav>', '</nav>', $output);

    // Регулярное выражение для поиска <span> элементов в выводе Yoast SEO
    $pattern = '/<span[^>]+>/';

    // Добавление дополнительных классов к каждому <span> элементу
    $output = preg_replace_callback($pattern, function ($matches) {
        $class_attr = 'class="text-danger fs-14 fw-500"';
        return str_replace('<span ', '<span ' . $class_attr . ' ', $matches[0]);
    }, $output);

    // Регулярное выражение для поиска <a> элементов в выводе Yoast SEO
    $pattern = '/<a[^>]+>/';

    // Добавление дополнительных классов к каждому <a> элементу
    $output = preg_replace_callback($pattern, function ($matches) {
        $class_attr = 'class="fs-14 fw-500"';
        return str_replace('<a ', '<a ' . $class_attr . ' ', $matches[0]);
    }, $output);



    return $output;
}

add_filter('wpseo_breadcrumb_output', 'add_custom_classes_to_breadcrumbs');


add_filter('gettext', 'translate_text');
add_filter('ngettext', 'translate_text');

function translate_text($translated) {
    $translated = str_ireplace('Электронное письмо отправлено', 'Спасибо за заявку!', $translated);
    $translated = str_ireplace('Спасибо за ваше сообщение. Оно отправлено.', 'Мы свяжемся с Вами в ближайшее время!', $translated);
    return $translated;
}

?>