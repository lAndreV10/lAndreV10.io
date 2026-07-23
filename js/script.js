const links = document.querySelectorAll('nav [data-nav]');
const sections = document.querySelectorAll('section[id]');

function actualizarMenu() {
    let id = '';

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 90) id = section.id;
    });

    links.forEach((link) => link.classList.toggle('activo', link.hash === `#${id}`));
}

window.addEventListener('scroll', actualizarMenu);
actualizarMenu();