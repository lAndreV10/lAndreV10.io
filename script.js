const projects = [
    {
        title: "ReservaPro",
        category: ["python", "web"],
        image: "assets/reservapro-preview.png",
        description:
            "Proyecto para practicar gestión de citas. Permite crear, consultar y cancelar reservas desde una interfaz web con Flask y una versión CLI.",
        technologies: ["Python", "Flask", "Bootstrap", "Jinja", "JSON"],
        repo: "https://github.com/lAndreV10/ReservaPro_CLI",
        demo: "",
        detail:
            "ReservaPro me sirvió para practicar rutas, formularios, validaciones y guardado de datos. Tiene una versión web con Flask y otra versión para usar desde consola.",
        highlights: [
            "Rutas web con Flask y plantillas Jinja.",
            "Versión CLI para practicar lógica desde consola.",
            "Validación básica de fecha y hora.",
            "Datos guardados en archivo JSON."
        ]
    }
];

const stackContent = {
    backend: {
        title: "Backend con Python",
        body: "Estoy practicando rutas, formularios, validaciones y lectura de datos. Mi meta es escribir código claro antes de hacerlo más grande.",
        tags: ["Python", "Flask", "JSON", "Validaciones"]
    },
    languages: {
        title: "Lenguajes que uso",
        body: "Python es el lenguaje que más uso por ahora. También sigo practicando Java y SQL para fortalecer mi lógica y manejo de datos.",
        tags: ["Python", "Java", "SQL", "Lógica"]
    },
    tools: {
        title: "Herramientas de trabajo",
        body: "Uso Git para guardar avances, revisar cambios y documentar mejor lo que voy aprendiendo en cada proyecto.",
        tags: ["Git", "README", "Documentación", "Control de versiones"]
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
