jQuery(function($) {
    $(document).ready(function() {
        // Добавление поля телефона
        $('.button-add-contact').click(function() {
            var index = $('#contacts_table tr').length - 1;
            var newRow = '<tr>' +
                '<td><input type="text" name="contacts_field[' + index + '][name]" value="" class="contact-name" /></td>' +
                '<td><input type="text" name="contacts_field[' + index + '][link]" value="" class="contact-link" /></td>' +
                '<td><input type="text" name="contacts_field[' + index + '][text]" value="" class="contact-text" /></td>' +
                '<td><input type="text" name="contacts_field[' + index + '][icon]" value="" class="contact-icon" /></td>' +
                '<td><button type="button" class="button button-remove-contact">Удалить</button></td>' +
                '</tr>';
            $('#contacts_table').append(newRow);
        });

        // Удаление поля телефона
        $(document).on('click', '.button-remove-contact', function() {
            $(this).closest('tr').remove();
        });
    });
});
