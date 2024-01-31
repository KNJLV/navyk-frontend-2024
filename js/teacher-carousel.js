// массив имён фотографий преподавателей
let teacherPhoto = [
  "TEACHER-PHOTO-1.png",
  "TEACHER-PHOTO-3.png",
  "TEACHER-PHOTO-2.png",
];

// массив фамилий преподавателей
let teacherSurname = ["СУХОВ", "ЕБЛАНОВ", "ШУЛЬМИНА"];

// массив имён преподавателей
let teacherName = [
  "Владислав Сергеевич",
  "Еблан Ебланович",
  "Ксения Владимирова",
];

// массив строк описаний преподавателей (1 карточка - 4 строки)
let teacherDesc = [
  ' преподаватель регионального образовательного центра "Взлёт" и школьной академии главы города Королёва, учитель русского языка в одном из лучших лицеев Подмосковья',
  " победитель филологических олимпиад разных уровней, составитель и проверяющий отборочных этапов ВсОШ по русскому языку",
  " участник научных конференций по лингвистикеи лингвометодике",
  " закончил школу с золотой медалью, сдал ОГЭ на 5 и ЕГЭ на 90+ без специальной подготовки",
  "1ЕбЛан",
  "2ЕбЛан",
  "3ЕбЛан",
  "4ЕбЛан",
  'преподаватель регионального образовательного центра "Взлёт"',
  "призёр заключительного этапа ВсОШ по литературе и перечневых олимпиад по русскому языку и литературе",
  "студентка факультета гуманитарных наук Высшей школы экономики ",
  "закончила школу с золотой медалью, сдала ОГЭ на 5 и ЕГЭ на 90+ без специальной подготовки",
];

// =====================================================

// первоначальные индексы карточек
let index = 0;
let indexR = 1;
let indexL = 2;

// =====================================================

// фото центральной карточки преподавателя
let mainCardPhoto = document.querySelector(".section-teacher__card-photo");

// фамилия центральной карточки преподавателя
let mainCardSurname = document.querySelector(
  ".section-teacher__card-name-text-1"
);

// имя центральной карточки преподавателя
let mainCardName = document.querySelector(".section-teacher__card-name-text-2");

// все строки описания главной карточки
let descriptionStrings = document.querySelectorAll(
  ".section-teacher__card-description-list-el"
);

// =====================================================

// карточки преподавателей - переключатели
let leftSwitcher = document.getElementById("leftCard");
let rightSwitcher = document.getElementById("rightCard");

// =====================================================

// фото левой карточки - переключателя
let leftSwitcherPhoto = document.querySelector(
  ".section-teacher__left-card-photo"
);

// фамилия левой карточки - переключателя
let leftSwitcherSurname = document.querySelector(
  ".section-teacher__left-card-name-text-1"
);

// имя левой карточки - переключателя
let leftSwitcherName = document.querySelector(
  ".section-teacher__left-card-name-text-2"
);

// =====================================================

// фото правой карточки - переключателя
let rightSwitcherPhoto = document.querySelector(
  ".section-teacher__right-card-photo"
);

// фамилия правой карточки - переключателя
let rightSwitcherSurname = document.querySelector(
  ".section-teacher__right-card-name-text-1"
);

// имя правой карточки - переключателя
let rightSwitcherName = document.querySelector(
  ".section-teacher__right-card-name-text-2"
);

// =====================================================

// Переключение карточек "влево"
leftSwitcher.addEventListener("click", function () {
  if (index === 0) {
    index = teacherPhoto.length - 1;
  } else {
    index = index - 1;
  }
  if (indexL === 0) {
    indexL = teacherPhoto.length - 1;
  } else {
    indexL = indexL - 1;
  }
  if (indexR === 0) {
    indexR = teacherPhoto.length - 1;
  } else {
    indexR = indexR - 1;
  }
  opacityAnimation();
  updateTeacherInfo();
});

// =====================================================

// Переключение карточек "вправо"
rightSwitcher.addEventListener("click", function () {
  if (index === teacherPhoto.length - 1) {
    index = 0;
  } else {
    index = index + 1;
  }
  if (indexR === teacherPhoto.length - 1) {
    indexR = 0;
  } else {
    indexR = indexR + 1;
  }
  if (indexL === teacherPhoto.length - 1) {
    indexL = 0;
  } else {
    indexL = indexL + 1;
  }
  opacityAnimation();
  updateTeacherInfo();
});

// =====================================================

// функция обновления всех карточек
function updateTeacherInfo() {
  // обновление фото главной карточки
  mainCardPhoto.src = "./assets/section-teachers/" + teacherPhoto[index];

  // обновление фамилии главной карточки
  mainCardSurname.textContent = teacherSurname[index];

  // обновление имени главной карточки
  mainCardName.textContent = teacherName[index];

  // =====================================================

  //   обновление описания главной карточки
  for (let j = 0; j < descriptionStrings.length; j++) {
    if (index === 0) {
      descriptionStrings[j].textContent = teacherDesc[j + 4 * index];
    } else if (index === 1) {
      descriptionStrings[j].textContent = teacherDesc[j + 4 * index];
    } else if (index === 2) {
      descriptionStrings[j].textContent = teacherDesc[j + 4 * index];
    }
  }

  // =====================================================

  // обновление фото левой карточки
  leftSwitcherPhoto.src = "./assets/section-teachers/" + teacherPhoto[indexL];

  // обновление фамилии левой карточки
  leftSwitcherSurname.textContent = teacherSurname[indexL];

  // обновление имени левой карточки
  leftSwitcherName.textContent = teacherName[indexL];

  // =====================================================

  // обновление фото правой карточки
  rightSwitcherPhoto.src = "./assets/section-teachers/" + teacherPhoto[indexR];

  // обновление фамилии правой карточки
  rightSwitcherSurname.textContent = teacherSurname[indexR];

  // обновление имени правой карточки
  rightSwitcherName.textContent = teacherName[indexR];
}

// =====================================================

// функция для анимации переключателей
function opacityAnimation() {
  const switcherAnimate = [{ opacity: 0 }, { opacity: 0.5 }];
  const switcherTiming = {
    duration: 150,
    iterations: 1,
  };
  rightSwitcher.animate(switcherAnimate, switcherTiming);
  leftSwitcher.animate(switcherAnimate, switcherTiming);
}

// =====================================================

// Левая стрелка в мобильной версии
let leftArrow = document.querySelector(".section-teacher__arrow-left-icon");
// Левая правая в мобильной версии
let rightArrow = document.querySelector(".section-teacher__arrow-right-icon");

// =====================================================

// функция переключения "влево" в мобильной версии
leftArrow.addEventListener("click", function () {
  if (index === 0) {
    index = teacherPhoto.length - 1;
  } else {
    index = index - 1;
  }
  updateTeacherInfo();
});

// функция переключения "вправо" в мобильной версии
rightArrow.addEventListener("click", function () {
  if (index === teacherPhoto.length - 1) {
    index = 0;
  } else {
    index = index + 1;
  }
  updateTeacherInfo();
});
