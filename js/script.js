// Валидация номера телефона в форме НАЧАЛО

document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll("input[data-tel-input]");
  
    var getInputNumbersValue = function (input) {
      // Return stripped input value — just numbers
      return input.value.replace(/\D/g, "");
    };
  
    var onPhonePaste = function (e) {
      var input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
      var pasted = e.clipboardData || window.clipboardData;
      if (pasted) {
        var pastedText = pasted.getData("Text");
        if (/\D/g.test(pastedText)) {
          // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
          // formatting will be in onPhoneInput handler
          input.value = inputNumbersValue;
          return;
        }
      }
    };
  
    var onPhoneInput = function (e) {
      var input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = "";
  
      if (!inputNumbersValue) {
        return (input.value = "");
      }
  
      if (input.value.length != selectionStart) {
        // Editing in the middle of input, not last symbol
        if (e.data && /\D/g.test(e.data)) {
          // Attempt to input non-numeric symbol
          input.value = inputNumbersValue;
        }
        return;
      }
  
      if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == "9")
          inputNumbersValue = "7" + inputNumbersValue;
        var firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
        formattedInputValue = input.value = firstSymbols + " ";
        if (inputNumbersValue.length > 1) {
          formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
          formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
          formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
          formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
        }
      } else {
        formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
      }
      input.value = formattedInputValue;
    };
    var onPhoneKeyDown = function (e) {
      // Clear input after remove last symbol
      var inputValue = e.target.value.replace(/\D/g, "");
      if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = "";
      }
    };
    for (var phoneInput of phoneInputs) {
      phoneInput.addEventListener("keydown", onPhoneKeyDown);
      phoneInput.addEventListener("input", onPhoneInput, false);
      phoneInput.addEventListener("paste", onPhonePaste, false);
    }
  });

// Валидация номера телефона в форме КОНЕЦ

const studentButton = document.getElementById("contactFormStudentButton");
const parentButton = document.getElementById("contactFormParentButton");
const studentName = document.getElementById("studentName");
const studentPhoneNumber = document.getElementById("studentPhoneNumber");

// я не знаю что это :D
document.addEventListener("DOMContentLoaded", () => {
  parentButton.checked = true;
  studentName.style.display = "none";
  studentPhoneNumber.style.display = "none";
});


// Переключение формы родитель/ученик НАЧАЛО
// переключение по кнопке РОДИТЕЛЬ
parentButton.addEventListener("change", () => {
    let inputsBlock = document.querySelector(".section-form__block-left-inputs");
    console.log(inputsBlock)
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

// переключение по кнопке УЧЕНИК
studentButton.addEventListener("change", () => {
    let inputsBlock = document.querySelector(".section-form__block-left-inputs");
    console.log(inputsBlock)
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

// Переключение формы родитель/ученик КОНЕЦ

const buttons = document.querySelector(".section-form__block-left__button");
const chekedPersonalData = document.querySelector(".checkbox");
const parentName = document.querySelector("#parentName");
const parentPhoneNumber = document.querySelector("#parentPhoneNumber");
const parentEmail = document.querySelector("#parentEmail");

// функция отправки данных из формы в бота
function SendFormInfo() {
  let klientInformation = document.querySelectorAll(".section-form__block-left__info-line");
  let klientClass = document.querySelector(".section-form__block-left__select");
  let order = JSON.stringify({
    parent_name: klientInformation[0].value,
    parent_number: klientInformation[1].value,
    student_name: klientInformation[2].value,
    student_number: klientInformation[3].value,
    student_comment: klientInformation[4].value,
    student_class: klientClass.value
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
  alert("Заявка успешно отправлена!");
}

// Отправка формы НАЧАЛО 
buttons.addEventListener("click", (e) => {
  e.preventDefault();
  // проверка полей при заполнение РОДИТЕЛЕМ
  if (parentButton.checked) {
    if (
      // проверка чекбокса и полей родителя (когда всё заполнено)
      chekedPersonalData.checked &&
      parentName.value != "" &&
      parentPhoneNumber.value != "" 
    //   && parentEmail.value != ""
    ) {
      SendFormInfo();
    } else if (
      // проверка полей родителя (когда не заполнены поля)
      parentName.value == "" ||
      parentPhoneNumber.value == "" 
    // || parentEmail.value == ""
    ) {
      alert("Заполнены не все обязательные поля");
    } else if (!chekedPersonalData.checked) {
      // проверка чекбокса (когда он не нажат)
      alert("Вы не приняли условия обработки персональных данных");
    }

    // проверка полей при заполнение УЧЕНИКОМ
  } else if (studentButton.checked) {
    if (
      // проверка чекбокса и полей родителя (когда всё заполнено)
      chekedPersonalData.checked &&
      parentName.value != "" &&
      parentPhoneNumber.value != "" &&
    //   && parentEmail.value != "" 
      studentName.value != "" &&
      studentPhoneNumber.value != ""
    ) {
      SendFormInfo();
    } else if (
      // проверка полей родителя (когда не заполнены поля)
      parentName.value == "" ||
      parentPhoneNumber.value == "" ||
    //   parentEmail.value == "" ||
      studentName.value == "" ||
      studentPhoneNumber.value == ""
    ) {
      alert("Заполнены не все обязательные поля");
    } else if (!chekedPersonalData.checked) {
      // проверка чекбокса (когда он не нажат)
      alert("Вы не приняли условия обработки персональных данных");
    }
  }
});
// Отправка формы КОНЕЦ