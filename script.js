const projects = [
    {
        title: "ReservaPro",
        category: ["python", "web"],
        image: "assets/reservapro-preview.png",
        description:
            "Sistema de gestión de citas para negocios. Permite crear, consultar y cancelar reservas desde una interfaz web con Flask y una versión CLI.",
        technologies: ["Python", "Flask", "Bootstrap", "Jinja", "JSON"],
        repo: "https://github.com/lAndreV10/ReservaPro_CLI",
        demo: "",
        detail:
            "ReservaPro organiza el flujo completo de una cita: creación, consulta por fecha y cancelación. El proyecto separa rutas web, interfaz CLI, lógica de negocio y persistencia local.",
        highlights: [
            "Aplicación web con Flask y plantillas Jinja.",
            "Versión CLI para operar desde consola.",
            "Validación de fecha y hora antes de guardar datos.",
            "Persistencia local en archivo JSON."
        ]
    }
];

const stackContent = {
    backend: {
        title: "Backend con Python",
        body: "Construcción de rutas, validaciones, lectura y escritura de datos, y separación de responsabilidades para mantener el código claro.",
        tags: ["Python", "Flask", "JSON", "Validaciones"]
    },
    frontend: {
        title: "Interfaces web",
        body: "Maquetación responsive, páginas limpias, componentes reutilizables y experiencia visual consistente para presentar proyectos.",
        tags: ["HTML", "CSS", "Bootstrap", "Responsive"]
    },
    workflow: {
        title: "Flujo de trabajo",
        body: "Uso de GitHub para publicar repositorios, documentar proyectos y convertir avances técnicos en evidencia visible.",
        tags: ["Git", "GitHub", "README", "GitHub Pages"]
    }
};

const projectsGrid = document.querySelector("#projectsGrid");
const filterButtons = document.querySelectorAll(".filter-button");
const stackButtons = document.querySelectorAll(".stack-item");
const stackDetail = document.querySelector("#stackDetail");
const projectDialog = document.querySelector("#projectDialog");
const dialogContent = document.querySelector("#dialogContent");
const dialogClose = document.querySelector("#dialogClose");
const themeToggle = document.querySelector("#themeToggle");
const typedRole = document.querySelector("#typedRole");
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
                ? `<a class="button small ghost" href="${project.demo}" target="_blank" rel="noreferrer">Demo</a>`
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
                            <a class="button small primary" href="${project.repo}" target="_blank" rel="noreferrer">Repositorio</a>
                            ${demoLink}
                            <button class="button small ghost detail-button" type="button" data-project="${index}">Detalles</button>
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
            <a class="button small primary" href="${project.repo}" target="_blank" rel="noreferrer">Abrir repositorio</a>
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

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    themeToggle.querySelector(".toggle-label").textContent = isLight ? "Noche" : "Luz";
});

const rolePhrases = ["Python + Flask", "Interfaces limpias", "GitHub Pages", "Proyectos funcionales"];
let phraseIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeRole() {
    const phrase = rolePhrases[phraseIndex];
    typedRole.textContent = phrase.slice(0, letterIndex);

    if (!deleting && letterIndex < phrase.length) {
        letterIndex += 1;
    } else if (deleting && letterIndex > 0) {
        letterIndex -= 1;
    } else {
        deleting = !deleting;
        if (!deleting) {
            phraseIndex = (phraseIndex + 1) % rolePhrases.length;
        }
    }

    const delay = deleting ? 46 : letterIndex === phrase.length ? 1200 : 82;
    window.setTimeout(typeRole, delay);
}

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
typeRole();
