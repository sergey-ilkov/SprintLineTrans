//
// ---------------------------------------------------------------------- burger menu
//
const body = document.querySelector('body');
const burgerMenu = document.querySelector('.burger__menu');
const nav = document.querySelector('.nav');
const menuLinks = document.querySelectorAll('.header__menu-link');
const logo = document.querySelector('.header__logo');
const headerTopBtn = document.querySelector('.header__top-btn');
const links = [...menuLinks, logo, headerTopBtn];

burgerMenu.classList.add('toggled');
burgerMenu.addEventListener('click', (e) => {
    burgerMenu.classList.toggle('active');
    burgerMenu.classList.toggle('toggled');

    let width1 = wrapper.offsetWidth;

    nav.classList.toggle('active');
    body.classList.toggle('fixed');

    let width2 = wrapper.offsetWidth;
    let margin = width2 - width1;
    wrapper.style.marginRight = `${margin}px`;
});

links.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        burgerMenu.classList.remove('active');
        burgerMenu.classList.add('toggled');
        nav.classList.remove('active');
        body.classList.remove('fixed');
        wrapper.style.marginRight = `0px`;
    });
});

// -------------------------------------------------------------------- THE END

// Функция переход по ссылке к нужному элементу
function scrollToElement(el) {
    let offsetPositon = el.getBoundingClientRect().top - 20;
    window.scrollBy({
        top: offsetPositon,
        behavior: 'smooth',
    });
}

//
// -----------------------------------------------------------------------------------   WINDOW. onload
//

const header = document.querySelector('.header');
const preloader = document.querySelector('.preloader');
const preloaderSvg = document.querySelector('.preloader__svg');

function onloadSite() {
    preloaderSvg.classList.add('hidden');
    // для анимации headera после прогрузки шрифтов отключаем preloader
    header.classList.add('active');
    preloader.classList.add('hidden');
}
let preloaderTimeout;

window.onload = () => {
    preloaderTimeout = setTimeout(onloadSite, 300);

    animHeaderTitle();

    //
    //  -------------------------------------------------------------------------------   CLICK на странице
    //

    const linksArray = document.querySelectorAll('.services__link');
    const tabsArray = document.querySelectorAll('.services__item');

    document.addEventListener('click', (e) => {
        if (e.target.closest('.services__link')) {
            e.preventDefault();
            linksArray.forEach((item) => item.classList.remove('active'));

            const link = e.target.closest('.services__link');

            link.classList.add('active');
            // поднять табы к верху страницы
            scrollToElement(link);

            const id = link.getAttribute('href');

            const tab = document.querySelector(id);
            tabsArray.forEach((item) => item.classList.remove('active'));

            if (tab) {
                tab.classList.add('active');
            }
        }

        // обработка клика по меню
        if (e.target.closest('.header__menu-link')) {
            e.preventDefault();
            const id = e.target.getAttribute('href');
            const el = document.querySelector(id);
            scrollToElement(el);
        }

        // обработка клика по кнопке вверх
        if (e.target.closest('.button-fixed__top')) {
            e.preventDefault();
            const link = document.querySelector('.button-fixed__top');
            const id = link.getAttribute('href');
            const el = document.querySelector(id);
            scrollToElement(el);
        }

        //  закрытие модального окна по клику вне модального окна
        if (e.target.closest('.modal') && !e.target.closest('.modal-box') && modal.classList.contains('active')) {
            closeModal();
        }
    });

    //
    // отслеживание событий скролла на странице    -----------------------------------------------  SCROLL
    //

    const services = document.querySelector('.services');
    const servicesTitle = document.querySelector('.services__title');
    const fixedBtn = document.querySelector('.button-fixed__top');

    const about = document.querySelector('.about');

    window.addEventListener('scroll', (e) => {
        function scrollTo() {
            let heightWindow = window.innerHeight;

            // появления кнопки top при прокрутки

            let servicesTitleHeight = servicesTitle.getBoundingClientRect().top;
            servicesTitleHeight < 0 ? fixedBtn.classList.add('active') : fixedBtn.classList.remove('active');

            // запуск анимации svg иконок
            let aboutHeight = about.getBoundingClientRect().top;
            if (aboutHeight < Math.ceil(heightWindow / 2 + heightWindow / 3) && aboutHeight > -Math.ceil(heightWindow / 3) && !aboutItems.classList.contains('active')) {
                animSvg();
            }

            // запуск анимации табов

            if (servicesTitleHeight < Math.ceil(heightWindow / 2 + heightWindow / 3) && servicesTitleHeight > -Math.ceil(heightWindow / 3) && !services.classList.contains('active')) {
                services.classList.add('active');
            }
        }

        setTimeout(() => {
            scrollTo();
        }, 300);
    });
};

//
// ------------------------------------------------------------------------------   SLIDER
//

const itemsArray = document.querySelectorAll('.reviews-slider .reviews-slider__item');
const sliderLine = document.querySelector('.reviews-slider__line');

let counterSlider = 0; // счетчик слайдов
let numberLimit = 0; // число ограничение для прокрутки слайдов
let widthSlider; // ширина слайда с отступом
const sliderBox = document.querySelector('.reviews-slider'); // ширина слайда с отступом
let windowWidth; //  ширина экрана

// Функция иницилизации слайдера
// выстраиваем количество слайдов в зависимости от размера экрана

let timeOut;
function initSlider() {
    // console.log('recize');

    // определяем ширину экрана
    windowWidth = document.documentElement.offsetWidth;

    if (windowWidth <= 600) {
        itemsArray.forEach((item) => (item.style.flex = '1 0 100%'));
        numberLimit = 0;
        correctionSlider();

        return;
    }
    if (windowWidth <= 1000) {
        itemsArray.forEach((item) => (item.style.flex = '1 0 45%'));
        sliderLine.style.gap = '10%';
        numberLimit = 1;
        correctionSlider();

        return;
    }
    if (windowWidth >= 1000) {
        itemsArray.forEach((item) => (item.style.flex = '1 0 30%'));
        sliderLine.style.gap = '5%';
        numberLimit = 2;
        correctionSlider();

        return;
    }
}

window.requestAnimationFrame(initSlider);

//  функция коррекция слайдов
function correctionSlider() {
    // clearTimeout(timeOut);
    widthSlider = getWidthShift();

    sliderLine.style.transform = `translateX(${-widthSlider * counterSlider}px)`;
}

// вычисляем ширину слайда с отступом
function getWidthShift() {
    const widthElement = document.querySelector('.reviews-slider__item').offsetWidth;
    const margin = itemsArray[1].getBoundingClientRect().left - itemsArray[0].getBoundingClientRect().left - widthElement;
    const widthSliderBox = sliderBox.offsetWidth;

    let width = widthSliderBox + margin;

    if (numberLimit == 1) {
        width = widthSliderBox / 2 + margin / 2;
    }
    if (numberLimit == 2) {
        width = widthSliderBox / 3 + margin / 3;
    }

    return width;
}

// Отслеживаем изменение размера страницы
window.addEventListener('resize', () => {
    window.requestAnimationFrame(initSlider);
});

// функция движения слайдера
function moveSlider() {
    widthSlider = getWidthShift();

    sliderLine.style.transform = `translateX(${-widthSlider * counterSlider}px)`;
}

//  движение слайдов при клике на кнопки
const prevBtn = document.querySelector('.reviews-slider__prev');
const nextBtn = document.querySelector('.reviews-slider__next');

prevBtn.setAttribute('disabled', true);

nextBtn.addEventListener('click', () => {
    clearTimeout(timeout);
    nextSlider();
});

prevBtn.addEventListener('click', () => {
    clearTimeout(timeout);
    prevSlider();
});

//  движение слайдов при клике NEXT
function nextSlider() {
    counterSlider++;
    if (counterSlider >= itemsArray.length - 1 - numberLimit) {
        counterSlider = itemsArray.length - 1 - numberLimit;
        nextBtn.setAttribute('disabled', '');
    }
    moveSlider();
    opacitySlider();
    prevBtn.removeAttribute('disabled');
}

//  движение слайдов при клике PREV
function prevSlider() {
    counterSlider--;

    if (counterSlider <= 0) {
        counterSlider = 0;
        prevBtn.setAttribute('disabled', '');
    }
    moveSlider();
    opacitySlider();
    nextBtn.removeAttribute('disabled');
}

//
//  движение слайдов на смартфоне при помощи «смахивания» (swipe)
//

let touchDownX;
let flagTouch = false;
sliderLine.addEventListener('touchstart', (e) => {
    flagTouch = true;

    touchDownX = e.touches[0].pageX;
    clearTimeout(timeout);
});

sliderLine.addEventListener('touchend', () => {
    timeout = setTimeout(autoMoveSlider, 2000);
});

sliderLine.addEventListener('touchmove', (e) => {
    if (e.touches[0].pageX < touchDownX && flagTouch) {
        nextSlider();
        flagTouch = false;
    }
    if (e.touches[0].pageX > touchDownX && flagTouch) {
        prevSlider();
        flagTouch = false;
    }
});

//
//  движение слайдов на компьютере при помощи мышки  «смахивания» (swipe)
//

let mouseDownX;
let flagMouse = false;

sliderLine.addEventListener('mousedown', (e) => {
    mouseDownX = e.pageX;
    flagMouse = true;
});

sliderLine.addEventListener('mousemove', (e) => {
    if (e.pageX + 100 < mouseDownX && flagMouse) {
        flagMouse = false;
        nextSlider();
    }
    if (e.pageX - 100 > mouseDownX && flagMouse) {
        flagMouse = false;
        prevSlider();
    }
});

// Функция для автоматического смена слайдов
let timeout;

function autoMoveSlider() {
    counterSlider++;
    if (counterSlider >= itemsArray.length - numberLimit) {
        counterSlider = 0;
    }

    moveSlider();
    prevBtn.removeAttribute('disabled');
    nextBtn.removeAttribute('disabled');
    opacitySlider();

    timeout = setTimeout(autoMoveSlider, 2000);
}
autoMoveSlider();

//
// Обработчики событий:
//                      при наведении мышки останавливаем слайдер
//                      при увода мышки запускаем слайдер
//
sliderLine.addEventListener('mouseover', () => {
    clearTimeout(timeout);
});
sliderLine.addEventListener('mouseout', () => {
    timeout = setTimeout(autoMoveSlider, 2000);
});

// Функция для отображения активных слайдов opacity 1 / не активные opacity 0
function opacitySlider() {
    itemsArray.forEach((item) => {
        item.style.opacity = '0';
    });

    const items = Array.from(itemsArray);
    let itemsNoOpacity = items.slice(counterSlider, counterSlider + numberLimit + 1);
    itemsNoOpacity.forEach((item) => {
        item.style.opacity = '1';
    });
}

//
// --------------------------------- SLIDER THE END
//

// hover phone  header
const headerPhones = document.querySelector('.header-phones');
const headerPhonesList = document.querySelector('.header-phones__list');

headerPhones.addEventListener('mouseover', (e) => {
    headerPhonesList.classList.add('active');
});
headerPhones.addEventListener('mouseout', (e) => {
    headerPhonesList.classList.remove('active');
});

//
// ----------------------------------------------------------- modal
//

const modal = document.querySelector('.modal');

const buttonsActiveModal = document.querySelectorAll('.active__modal');
const wrapper = document.querySelector('.wrapper');
const buttonsFixed = document.querySelector('.buttons-fixed');

buttonsActiveModal.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        let width1 = wrapper.offsetWidth;
        body.classList.add('fixed');
        modal.classList.add('active');
        let width2 = wrapper.offsetWidth;
        let margin = width2 - width1;
        wrapper.style.marginRight = `${margin}px`;

        buttonsFixed.style.right = `calc(5% + ${margin}px)`;
    });
});

// кнопка закрытия модального окна
const modalCloseBtn = document.querySelector('.modal__btn');
const modalSubmit = document.querySelector('.modal__form__btn');

modalCloseBtn.addEventListener('click', () => {
    closeModal();
});
modalSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape') closeModal();
});

function closeModal() {
    body.classList.remove('fixed');
    modal.classList.remove('active');
    wrapper.style.marginRight = `0px`;
    buttonsFixed.style.right = `5%`;
}

//
// ------------------------------------------------------------ animaition svg icon
//
const aboutItems = document.querySelector('.about__items');
const aboutSvg = document.querySelectorAll('.about-svg');

aboutSvg.forEach((item) => {
    const svgPath = item.querySelectorAll('path');
    svgPath.forEach((path) => {
        const len = Math.ceil(path.getTotalLength());
        path.style.strokeDasharray = `${len}px`;
        path.style.strokeDashoffset = `${len}px`;
    });
});

function animSvg() {
    aboutItems.classList.add('active');
    let delay = 1;
    let speed = 2;
    aboutSvg.forEach((item) => {
        const svgPath = item.querySelectorAll('path');
        svgPath.forEach((path) => {
            const len = Math.ceil(path.getTotalLength());
            path.style.animation = `anim-svg 2s ease ${delay}s forwards`;
            path.style.animation = `anim-svg ${speed}s ease ${delay}s forwards`;
            delay += 0.05;
        });
    });
}

//
// ----------------------------------------------------------------------  HEADER animation TITLE
//

function animHeaderTitle() {
    const headerTitle = document.querySelector('.header__title');

    const worlds = headerTitle.textContent.split('');

    let htmlTitle = '';

    // обворачиваем каждую букву тегами <span>
    worlds.forEach((item) => {
        if (item == ' ') {
            htmlTitle += `<span>&nbsp</span>`;
        } else {
            htmlTitle += `<span>${item}</span>`;
        }
    });

    headerTitle.innerHTML = htmlTitle;

    let counter = 0;

    let spans = headerTitle.querySelectorAll('span');
    let len = Math.floor(spans.length / 2);

    const widthTitle = headerTitle.offsetWidth;
    const heightTitle = headerTitle.offsetHeight;

    let speed = 2;
    let delay = 0;
    let delay2 = 0.5;

    // пробегаем по всем <span> и устанавливаем каждому transform and animation
    spans.forEach((item) => {
        item.style.display = 'inline-block';

        if (counter < len) {
            item.style.transform = `translate(${-widthTitle}px, ${-heightTitle}px)`;
            item.style.animation = `header-title ${speed}s ease-in-out ${delay}s forwards`;
            delay += 0.1;
        } else {
            item.style.transform = `translate(${-widthTitle}px, ${-heightTitle}px)`;
            item.style.animation = `header-title ${speed}s ease-in-out ${delay2}s forwards`;
            delay2 += 0.1;
        }

        counter++;
    });
}
