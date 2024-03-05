// Слайдер в форме - Родитель
const parentButton = document.getElementById("contactFormParentButton");

// Слайдер в форме - Ученик
const studentButton = document.getElementById("contactFormStudentButton");

// Имя ученика в форме
const studentName = document.getElementById("studentName");

// Номер ученика в форме
const studentPhoneNumber = document.getElementById("studentPhoneNumber");

// Кнопка отправки в форме
const button = document.querySelector(".section-form__block-left__button");

// Чекбокс в форме
const chekedPersonalData = document.querySelector(".checkbox");

// Имя родителя в форме
const parentName = document.querySelector("#parentName");

// Номер родителя в форме
const parentPhoneNumber = document.querySelector("#parentPhoneNumber");

// ====================================================

// я не знаю что это :D
document.addEventListener("DOMContentLoaded", () => {
  parentButton.checked = true;
  studentName.style.display = "none";
  studentPhoneNumber.style.display = "none";
});

// ====================================================

// Переключение по кнопке РОДИТЕЛЬ
parentButton.addEventListener("change", () => {
  let inputsBlock = document.querySelector(".section-form__block-left-inputs");
  console.log(inputsBlock);
  if (this.checked) {
    studentName.style.display = "inline";
    studentPhoneNumber.style.display = "inline";
    inputsBlock.style.height = "62%";
  } else {
    studentName.style.display = "none";
    studentPhoneNumber.style.display = "none";
    inputsBlock.style.height = "45%";
  }
});

// Переключение по кнопке УЧЕНИК
studentButton.addEventListener("change", () => {
  let inputsBlock = document.querySelector(".section-form__block-left-inputs");
  console.log(inputsBlock);
  if (this.checked) {
    studentName.style.display = "none";
    studentPhoneNumber.style.display = "none";
    inputsBlock.style.height = "45%";
  } else {
    studentName.style.display = "inline";
    studentPhoneNumber.style.display = "inline";
    inputsBlock.style.height = "62%";
  }
});

// ====================================================

// Функция отправки данных из формы
function SendFormInfo() {
  let klientInformation = document.querySelectorAll(
    ".section-form__block-left__info-line"
  );
  let klientClass = document.querySelector(".section-form__block-left__select");
  let order = JSON.stringify({
    parent_name: klientInformation[0].value,
    parent_number: klientInformation[1].value,
    student_name: klientInformation[2].value,
    student_number: klientInformation[3].value,
    student_comment: klientInformation[4].value,
    student_class: klientClass.value,
  });
  fetch("/api/callback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: order,
  })
    .then((response) => response.json())
    .then((result) => {
      document.dispatchEvent(new CustomEvent("modalclose"));
    });
  klientInformation.forEach((e) => {
    e.value = "";
  });
}

// ====================================================

// Функция по нажатию кнопки "Оставить заявку"
button.addEventListener("click", (e) => {
  e.preventDefault();
  // Проверка полей при заполнение РОДИТЕЛЕМ
  if (parentButton.checked) {
    if (
      // Проверка чекбокса и полей родителя (когда всё заполнено)
      chekedPersonalData.checked &&
      parentName.value != "" &&
      parentPhoneNumber.value != ""
    ) {
      SendFormInfo();
      backgroundStyleChange();
    } else if (
      // Проверка полей родителя (когда не заполнены поля)
      parentName.value == "" ||
      parentPhoneNumber.value == ""
    ) {
      alert("Заполнены не все обязательные поля");
    } else if (!chekedPersonalData.checked) {
      // Проверка чекбокса (когда он не нажат)
      alert("Вы не приняли условия обработки персональных данных");
    }

    // Проверка полей при заполнение УЧЕНИКОМ
  } else if (studentButton.checked) {
    if (
      // Проверка чекбокса и полей родителя (когда всё заполнено)
      chekedPersonalData.checked &&
      parentName.value != "" &&
      parentPhoneNumber.value != "" &&
      studentName.value != "" &&
      studentPhoneNumber.value != ""
    ) {
      SendFormInfo();
      backgroundStyleChange();
    } else if (
      // Проверка полей родителя (когда не заполнены поля)
      parentName.value == "" ||
      parentPhoneNumber.value == "" ||
      studentName.value == "" ||
      studentPhoneNumber.value == ""
    ) {
      alert("Заполнены не все обязательные поля");
    } else if (!chekedPersonalData.checked) {
      // Проверка чекбокса (когда он не нажат)
      alert("Вы не приняли условия обработки персональных данных");
    }
  }
});

// ====================================================

// Ширина окна браузера
let screenWidth = window.screen.width;

// Функция появления алерта об отправке формы
function backgroundStyleChange() {
  // Контейнер для алерта
  let a = document.querySelector(".good__attention");

  // Стили для мобильной версии
  if (screenWidth <= 960) {
    a.innerHTML = `<div class="modal_window" style="
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0px;
      left: 0px;
      background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2.5px);
      z-index: 999;
      ">
	  
      <div class="model_form" style="
      display:flex;
      width: 90%;
      height: 100%;
      align-items: center;
      justify-content: center;
      margin: auto;
    ">
	
	<div class="scroll" style="position: relative">
	<img src="./assets/section-form/ALERT-BANNER.png" />
	<div class="modalClose" style="
      position: absolute;
      cursor: pointer;
      top: 3vw;
      right: 6vw;
      font-size: 7vw;
	">✕</div>

	</div>
	</div>
	</div>`;

    // Стили для ПК версии
  } else {
    a.innerHTML = `<div class="modal_window" style="
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0px;
      left: 0px;
      background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2.5px);
      z-index: 999;
      ">
	  
      <div class="model_form" style="
      display:flex;
      width: 90%;
      height: 100%;
      align-items: center;
      justify-content: center;
      margin: auto;
    ">
	
	<div class="scroll" style="position: relative">
	<img src="./assets/section-form/ALERT-BANNER.png" />
	<div class="modalClose" style="
      position: absolute;
      cursor: pointer;
      top: 30px;
      right: 40px;
      font-size: 40px;
	">✕</div>

	</div>
	</div>
	</div>`;
  }

  let close_attention = document.querySelector(".modalClose");
  close_attention.addEventListener("click", (e) => {
    let modal_window = document.querySelector(".modal_window");
    modal_window.style.display = "none";
  });
}

// ====================================================

// Кнопки в курсах "Записаться"
let courses_button = document.querySelectorAll(
  ".section-courses__card-button-2"
);

// Названия курсов
let courses_name = document.querySelectorAll(
  ".section-courses__card-header-left-title"
);

// ====================================================

// Перенос названия курса в комментарий формы
for (let i = 0; i < courses_button.length; i++) {
  courses_button[i].addEventListener("click", (e) => {
    let id_pole = document.querySelector("#formComment");
    if (i != 3) {
      id_pole.value = `${courses_name[i].textContent} КУРС`;
    } else if (i == 3) {
      id_pole.value = `ОНЛАЙН-ЛЕКТОРИЙ`;
    }
  });
}

//  ====================================================

let subjectButtons = document.querySelectorAll(".section-subjects__list-el");

let subjectIcon = document.querySelectorAll(".section-subjects__list-el-icon");
let subjectTitle = document.querySelectorAll(
  ".section-subjects__list-el-title"
);

// Focus и Hover для кнопок выбора предметов
for (let i = 0; i < subjectButtons.length; i++) {
  subjectButtons[0].classList.add("section-subjects__list-el-focus");
  // убрать IF чтобы разблокировать предметы (!)
  if (i < 0) {
    subjectButtons[i].addEventListener("click", function () {
      for (let i = 0; i < subjectButtons.length; i++) {
        subjectButtons[i].classList.remove("section-subjects__list-el-focus");
      }
      subjectButtons[i].classList.add("section-subjects__list-el-focus");
    });

    subjectButtons[i].addEventListener("mouseover", function () {
      if (
        !subjectButtons[i].classList.contains("section-subjects__list-el-hover")
      ) {
        subjectButtons[i].classList.add("section-subjects__list-el-hover");
      }
    });
    subjectButtons[i].addEventListener("mouseout", function () {
      if (
        subjectButtons[i].classList.contains("section-subjects__list-el-hover")
      ) {
        subjectButtons[i].classList.remove("section-subjects__list-el-hover");
      }
    });
  }
}
