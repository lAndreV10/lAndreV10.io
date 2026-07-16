const projects = [
    {
        title: "ReservaPro",
        category: ["python", "web"],
        image: "assets/reservapro-preview.png",
        description:
            "Sistema de gestión de citas para negocios. Permite crear, consultar y cancelar reservas desde una interfaz web con Flask y también desde una versión CLI.",
        technologies: ["Python", "Flask", "Bootstrap", "Jinja", "JSON"],
        repo: "https://github.com/lAndreV10/ReservaPro_CLI",
        demo: ""
    }
];

const projectsGrid = document.querySelector("#projectsGrid");
const filterButtons = document.querySelectorAll(".filter-button");

function renderProjects(filter = "todos") {
    const visibleProjects = projects.filter((project) => {
        return filter === "todos" || project.category.includes(filter);
    });

    projectsGrid.innerHTML = visibleProjects
        .map((project) => {
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
                            <a class="button small primary" href="${project.repo}" target="_blank" rel="noreferrer">Repositorio</a>
                            ${demoLink}
                        </div>
                    </div>
                </article>
            `;
        })
        .join("");
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((currentButton) => currentButton.classList.remove("active"));
        button.classList.add("active");
        renderProjects(button.dataset.filter);
    });
});

renderProjects();
