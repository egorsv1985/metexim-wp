(function($) {
	$(document).ready(function() {
	  var contactCount = 1;
  
	  var addContactButton = $('.add-contact-button');
	  var removeContactButton = $('.remove-contact-button');
	  var contactWrapper = $('.contact-wrapper');
	  var emptyContact = $('.empty-contact');
	  var contactFieldPrototype = $('.contact-field-prototype');
	  
	  // Добавляем обработчик событий для кнопки "Добавить контакт"
	  addContactButton.on('click', function(e) {
		e.preventDefault();
		contactCount++;
		
		// Добавляем новое поле контакта
		var newContact = contactFieldPrototype.clone();
		newContact.removeClass('contact-field-prototype');
		newContact.addClass('contact-field');
		newContact.find('.contact-name').attr('name', 'contact_' + contactCount + '_name');
		newContact.find('.contact-phone').attr('name', 'contact_' + contactCount + '_phone');
		newContact.find('.contact-icon').attr('name', 'contact_' + contactCount + '_icon');
		contactWrapper.append(newContact);
		
		// Скрываем пустое сообщение, если список контактов не пуст
		if (emptyContact.is(':visible')) {
		  emptyContact.hide();
		}
		
		// Если это первый контакт, скрываем кнопку удаления контакта
		if (contactCount > 1) {
		  removeContactButton.show();
		}
	  });
	  
	  // Добавляем обработчик событий для кнопки "Удалить контакт"
	  removeContactButton.on('click', function(e) {
		e.preventDefault();
		
		// Удаляем последний поле контакта, если их больше одного
		if (contactCount > 1) {
		  contactCount--;
		  contactWrapper.children().last().remove();
		}
		
		// Отображаем пустое сообщение, если список контактов пуст
		if (contactCount == 1) {
		  removeContactButton.hide();
		  emptyContact.show();
		}
	  });
	});
  })(jQuery);