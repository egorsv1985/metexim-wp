(function($) {
	$(document).ready(function() {
	  // Добавляем обработчики на изменение иконки контакта
	  $('.contact-field').on('change', '.contact-icon-select', function() {
		var iconSelect = $(this);
		var icon = iconSelect.val();
		iconSelect.css('background-image', 'url(' + icon + ')');
	  });
	});
  })(jQuery);