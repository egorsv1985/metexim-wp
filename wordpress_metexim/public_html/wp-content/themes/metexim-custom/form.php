<div class="rounded-3 border px-3 px-sm-5 py-4 bg-secondary h-100">
  <ul class="nav nav-tabs justify-content-between position-relative mb-5" id="valuationTab" role="tablist">
    <li class="nav-item position-relative bg-secondary" role="presentation">
      <button class="nav-link active py-3 px-4 fs-20 fw-600" id="one-tab" data-bs-toggle="tab" data-bs-target="#one" type="button" role="tab" aria-controls="one" aria-selected="true">
        1
      </button>
    </li>
    <li class="nav-item position-relative bg-secondary" role="presentation">
      <button class="nav-link py-3 px-4 fs-20 fw-600 disabled " id="two-tab" data-bs-toggle="tab" data-bs-target="#two" type="button" role="tab" aria-controls="two" aria-selected="false">
        2
      </button>
    </li>
    <li class="nav-item position-relative bg-secondary" role="presentation">
      <button class="nav-link py-3 px-4 fs-20 fw-600 disabled  " id="three-tab" data-bs-toggle="tab" data-bs-target="#three" type="button" role="tab" aria-controls="three" aria-selected="false">
        3
      </button>
    </li>
  </ul>
  <div class="tab-content" id="valuationTabContent">
    <div class="tab-pane fade show active" id="one" role="tabpanel" aria-labelledby="one-tab">
      <div class="row g-2 mb-5">
        <div class="col-6">
          [select* vid-metal class:form-select class:py-3 class:px-2 class:p-sm-3
          class:fs-14 class:fw-500 class:text-info id:vid-metal "Вид металла"
          "Черный лом" "Аккумуляторы" "Медь" "Бронза" "Латунь" "Алюминий"
          "Нержавейка" "Свинец" "Титан" "Редкоземелы" "Легир. сталь"
          "Оборудование"]
        </div>
        <div class="col-6">
          [select* tip-izdeliya class:form-select class:py-3 class:px-2
          class:p-sm-3 class:fs-14 class:fw-500 class:text-info id:tip-izdeliya "Тип изделия"
          "Трубы" "Кабель" "Батареи" "АКБ" "Бочка" "Автомобиль" "Станок"
          "Двигатель" "Стружка" "Другое"]
        </div>
      </div>
      <div class="d-flex justify-content-between gap-2">
        <button class="col-6 col-md-4 fs-16 fw-500 btn d-block btn-transparent btn-outline-danger px-3 py-3 disabled position-relative btn__arrow btn__arrow--back" disabled title="Назад">
          Назад
        </button>
        <a id="next-one" class="col-6 col-md-4 btn fs-16 fw-500 px-3 py-3 btn-transparent btn-outline-danger disabled  position-relative btn__arrow btn__arrow--next" href="#" onclick="document.getElementById('two-tab').click();console.log('next'); return false;">
          Далее
        </a>
      </div>
    </div>

    <div
      class="tab-pane fade"
      id="two"
      role="tabpanel"
      aria-labelledby="two-tab"
    >
      <div class="row g-2 mb-5">
        <div class="col-6">         
          [text* ves id:ves class:form-control class:py-3 class:px-2 class:p-sm-3
          class:fs-14 class:fw-500 class:text-info placeholder "Объем металла,
          кг"]
        </div>
        <div class="col-6">
          <p class="fs-14 fw-500 text-info mb-2">Вывоз необходим?</p>
          <div class="row">
              [radio no use_label_element default:1 "Нет" "Да"]              
              <div class="col-6">
               <div class="form-check">
                [radio no id:no class:form-check-input class:fs-14 class:fw-500 class:text-info class:me-2 "Нет"]                
               </div>
               </div>
              <div class="col-6">
               <div class="form-check">
                [radio no id:yes class:form-check-input class:fs-14 class:fw-500 class:text-info class:me-2 "Да"]                
               </div>              
            </div>           
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between gap-2">
        <a class="col-6 col-md-4 btn fs-16 fw-500 px-3 py-3 btn-danger position-relative btn__arrow btn__arrow--next-back" href="#" onclick="document.getElementById('one-tab').click();return false;">
          Назад
        </a>
        <a id="next-two" class="col-6 col-md-4 btn fs-16 fw-500 px-3 py-3 btn-transparent btn-outline-danger disabled position-relative btn__arrow btn__arrow--next" href="#" onclick="document.getElementById('three-tab').click();return false;">
          Далее
        </a>
      </div>
    </div>
    <div
      class="tab-pane fade"
      id="three"
      role="tabpanel"
      aria-labelledby="three-tab"
    >
      <div class="row g-2 mb-5">
        <div class="col-6 position-relative">
          [text name-valuation id:name-valuation class:form-control class:py-3
          class:px-2 class:p-sm-3 class:fs-14 class:fw-500 class:text-info
          placeholder "Ваше имя"]
        </div>
        <div class="col-6 position-relative">
          [tel* tel-valuation id:tel-valuation class:form-control class:py-3
          class:px-2 class:p-sm-3 class:fs-14 class:fw-500 class:text-info
          placeholder "Телефон"]
        </div>
      </div>
      <div class="d-flex justify-content-between gap-2">
        <a class="col-6 col-md-4 btn fs-16 fw-500 px-3 py-3 btn-danger position-relative btn__arrow btn__arrow--next-back" href="#" onclick="document.getElementById('two-tab').click();return false;">
          Назад
        </a>
        <button
          class="col-6 col-md-4 btn fs-16 fw-500 px-3 py-3 btn-transparent btn-outline-danger disabled position-relative btn__arrow btn__arrow--next"
          id="three-tab-submit"
          type="submit"
        >
          Отправить
        </button>
      </div>
    </div>
  </div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function() {
    var vidMetalSelect = document.getElementById('vid-metal');
    var tipIzdeliyaSelect = document.getElementById('tip-izdeliya');
    var vesInput = document.getElementById('ves');
    var telValuation = document.getElementById('tel-valuation');
    var twoTabButton = document.getElementById('two-tab');
    var nextOneButton = document.getElementById('next-one');
    var nextTwoButton = document.getElementById('next-two');
    var threeTabButton = document.getElementById('three-tab');
    var threeTabSubmit = document.getElementById('three-tab-submit');

    function updateFirstStepButtons() {
        if (vidMetalSelect.value !== 'Вид металла' && tipIzdeliyaSelect.value !== 'Тип изделия') {
            twoTabButton.classList.remove('disabled');
            nextOneButton.classList.remove('disabled');
            nextOneButton.classList.add('btn-danger');
            nextOneButton.classList.remove('btn-transparent');
            nextOneButton.classList.remove('btn-outline-danger');
        } else {
            twoTabButton.classList.add('disabled');
            nextOneButton.classList.add('disabled');            
        }
    }

    function updateSecondStepButtons() {
        if (vesInput.value.trim() !== '' && (document.getElementById('no').checked || document.getElementById('yes').checked)) {
            threeTabButton.classList.remove('disabled');
            nextTwoButton.classList.remove('disabled');
            nextTwoButton.classList.add('btn-danger');
            nextTwoButton.classList.remove('btn-transparent');
            nextTwoButton.classList.remove('btn-outline-danger');            
        } else {
            threeTabButton.classList.add('disabled');
            nextTwoButton.classList.add('disabled');
        }
    }

    function updateThirdStepButtons() {
        if (telValuation.value.trim() !== '') {
            threeTabSubmit.classList.remove('disabled');
            threeTabSubmit.classList.add('btn-danger');
            threeTabSubmit.classList.remove('btn-transparent');
            threeTabSubmit.classList.remove('btn-outline-danger');  
        } else {
            threeTabSubmit.classList.add('disabled');
        }
    }

    vidMetalSelect.addEventListener('change', updateFirstStepButtons);
    tipIzdeliyaSelect.addEventListener('change', updateFirstStepButtons);
    vesInput.addEventListener('change', updateSecondStepButtons);
    telValuation.addEventListener('change', updateThirdStepButtons);

    // Инициализация состояния кнопок
    updateFirstStepButtons();
    updateSecondStepButtons();
    updateThirdStepButtons();

    // Программное добавление атрибута checked к радиокнопке "Нет"
    document.getElementById('no').checked = true;
});
</script>