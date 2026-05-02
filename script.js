document.addEventListener('DOMContentLoaded', function() {
    // --- 1. ЭЛЕМЕНТЫ ---
    const burger = document.querySelector('.header__burger');
    const menu = document.getElementById('mobileMenu');
    const close = document.getElementById('closeMenu');
    const backToTop = document.getElementById('backToTop');
    const body = document.body;

    // --- 2. ЛОГИКА МОБИЛЬНОГО МЕНЮ ---

    // Открытие меню
    function openMenu() {
        menu.classList.add('active');
        body.style.overflow = 'hidden'; // Запрет скролла основной страницы
    }

    // Закрытие меню
    function closeMenu() {
        menu.classList.remove('active');
        body.style.overflow = ''; // Возврат скролла
    }

    if (burger) {
        burger.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            openMenu();
        };
    }

    if (close) {
        close.onclick = closeMenu;
    }

    // Закрытие при клике на ссылки внутри меню (включая плавный скролл по якорям)
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.onclick = function(e) {
            const href = this.getAttribute('href');

            // Проверяем, является ли ссылка якорной (начинается с #)
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault(); 
                closeMenu(); // Сначала закрываем меню

                // Ждем окончания анимации закрытия меню (0.4 сек), прежде чем скроллить
                setTimeout(() => {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }, 400);
            } else {
                closeMenu();
            }
        };
    });

    // --- 3. КНОПКА "НАВЕРХ" С ДИНАМИЧЕСКОЙ ПРОЗРАЧНОСТЬЮ ---

    window.addEventListener('scroll', function() {
        if (!backToTop) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const startAppear = 200;  // Точка начала появления (пиксели)
        const maxAppear = 800;    // Точка максимальной яркости

        if (scrollTop > startAppear) {
            backToTop.classList.add('show');
            
            // Рассчитываем прозрачность: от 0 до 0.7
            let opacity = (scrollTop - startAppear) / (maxAppear - startAppear);
            if (opacity > 0.7) opacity = 0.7; // Оставляем эффект полупрозрачности
            
            backToTop.style.opacity = opacity;
        } else {
            backToTop.classList.remove('show');
            backToTop.style.opacity = 0;
        }
    });

    // Плавный скролл вверх при нажатии на стрелку
    if (backToTop) {
        backToTop.onclick = function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
    }

    // --- 4. ЗАКРЫТИЕ МЕНЮ ПРИ КЛИКЕ ВНЕ ЕГО ОБЛАСТИ ---
    document.addEventListener('click', function(e) {
        if (menu.classList.contains('active') && !menu.contains(e.target) && e.target !== burger) {
            closeMenu();
        }
    });
});