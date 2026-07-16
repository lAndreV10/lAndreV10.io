const projects = [
    {
        title: "ReservaPro",
        category: ["python", "web"],
        image: "assets/reservapro-preview.png",
        description:
            "Sistema de reservas web y CLI creado para practicar enrutamiento de Flask, peticiones HTTP y lógica de backend persistiendo datos localmente.",
        technologies: ["Python", "Flask", "Bootstrap", "Jinja", "JSON"],
        repo: "https://github.com/lAndreV10/ReservaPro_CLI",
        demo: "",
        detail:
            "Este proyecto nació con el fin de conectar una misma lógica de negocio a dos interfaces distintas: una consola de comandos (CLI) y una aplicación web. Me ayudó a comprender el flujo completo de peticiones HTTP, validación de datos en formularios y enrutamiento dinámico en Flask.",
        highlights: [
            "Arquitectura modular que comparte lógica central entre CLI y Web.",
            "Persistencia local de datos simulando una base de datos mediante archivos JSON.",
            "Algoritmo de validación de disponibilidad horaria para evitar colisiones.",
            "Renderizado dinámico de plantillas HTML con Jinja2."
        ]
    }
];

const stackContent = {
    backend: {
        title: "backend.py",
        body: "Me concentro en entender la lógica detrás de los servidores: creación de rutas (endpoints), validación de parámetros, manejo de sesiones y diseño de flujos de datos estructurados.",
        tags: ["Python", "Flask", "JSON", "APIs", "HTTP"]
    },
    languages: {
        title: "languages.json",
        body: "Uso Python para scripts y lógica backend. Utilizo Java para comprender la programación orientada a objetos en mis clases universitarias, y SQL para el diseño relacional e integridad de datos.",
        tags: ["Python", "Java", "SQL", "OOP"]
    },
    tools: {
        title: "tools.sh",
        body: "Empleo Git en todos mis repositorios para control de versiones estructurado. Me esfuerzo por redactar documentación limpia (READMEs) y clara sobre cómo instalar y correr cada proyecto.",
        tags: ["Git", "GitHub", "CLI", "Markdown"]
    }
};

const projectsGrid = document.querySelector("#projectsGrid");
const filterButtons = document.querySelectorAll(".filter-button");
const stackButtons = document.querySelectorAll(".stack-tab");
const stackDetail = document.querySelector("#stackDetail");
const projectDialog = document.querySelector("#projectDialog");
const dialogContent = document.querySelector("#dialogContent");
const dialogClose = document.querySelector("#dialogClose");
const navLinks = document.querySelectorAll(".nav-link");
const revealItems = document.querySelectorAll("[data-reveal]");
const sections = document.querySelectorAll("[data-section]");

function renderStack(key = "backend") {
    const stack = stackContent[key];
    const tags = stack.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");

    stackDetail.innerHTML = `
        <h3>${stack.title}</h3>
        <p>${stack.body}</p>
        <div class="stack-tags">${tags}</div>
    `;
}

function renderProjects(filter = "todos") {
    const visibleProjects = projects.filter((project) => {
        return filter === "todos" || project.category.includes(filter);
    });

    projectsGrid.innerHTML = visibleProjects
        .map((project, index) => {
            const tags = project.technologies
                .map((technology) => `<span class="tag">${technology}</span>`)
                .join("");

            const demoLink = project.demo
                ? `<a class="button small secondary" href="${project.demo}" target="_blank" rel="noreferrer">Demo</a>`
                : "";

            return `
                <article class="project-card">
                    <div class="project-media">
                        <img src="${project.image}" alt="Vista previa de ${project.title}">
                    </div>
                    <div class="project-body">
                        <div class="project-meta">${tags}</div>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-links">
                            <a class="button small primary" href="${project.repo}" target="_blank" rel="noreferrer">Ver código</a>
                            ${demoLink}
                            <button class="button small secondary detail-button" type="button" data-project="${index}">Detalles</button>
                        </div>
                    </div>
                </article>
            `;
        })
        .join("");
}

function openProjectDialog(index) {
    const project = projects[index];
    const highlights = project.highlights.map((item) => `<li>${item}</li>`).join("");

    dialogContent.innerHTML = `
        <img src="${project.image}" alt="Vista previa de ${project.title}">
        <h2 id="dialogTitle">${project.title}</h2>
        <p>${project.detail}</p>
        <ul>${highlights}</ul>
        <div class="project-links">
            <a class="button small primary" href="${project.repo}" target="_blank" rel="noreferrer">Ver código</a>
        </div>
    `;

    projectDialog.showModal();
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((currentButton) => currentButton.classList.remove("active"));
        button.classList.add("active");
        renderProjects(button.dataset.filter);
    });
});

stackButtons.forEach((button) => {
    button.addEventListener("click", () => {
        stackButtons.forEach((currentButton) => currentButton.classList.remove("active"));
        button.classList.add("active");
        renderStack(button.dataset.stack);
    });
});

projectsGrid.addEventListener("click", (event) => {
    const detailButton = event.target.closest(".detail-button");

    if (detailButton) {
        openProjectDialog(Number(detailButton.dataset.project));
    }
});

dialogClose.addEventListener("click", () => projectDialog.close());

projectDialog.addEventListener("click", (event) => {
    if (event.target === projectDialog) {
        projectDialog.close();
    }
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    },
    { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

renderStack();
renderProjects();
