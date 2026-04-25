document.addEventListener('DOMContentLoaded', () => {
    // Находим нужные элементы в DOM
    const burgerMenu = document.getElementById('burger-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const body = document.body;

    // Функция для открытия меню
    const openMenu = () => {
        mobileNav.classList.add('active');
        // Блокируем прокрутку страницы под меню
        body.style.overflow = 'hidden'; 
    };

    // Функция для закрытия меню
    const hideMenu = () => {
        mobileNav.classList.remove('active');
        // Возвращаем прокрутку
        body.style.overflow = 'auto'; 
    };

    // Слушатель на иконку бургера
    if (burgerMenu) {
        burgerMenu.addEventListener('click', openMenu);
    }

    // Слушатель на кнопку закрытия (крестик)
    if (closeMenu) {
        closeMenu.addEventListener('click', hideMenu);
    }

    // Дополнительно: закрываем меню при клике на любую ссылку внутри него
    // Это полезно для одностраничных сайтов (anchor links)
    const navLinks = document.querySelectorAll('.mobile-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', hideMenu);
    });

    // Закрытие меню клавишей Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            hideMenu();
        }
    });
});