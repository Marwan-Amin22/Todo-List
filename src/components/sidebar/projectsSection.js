
export default function buildProjectsSection(projects) {
    const projectDiv = document.createElement('div');
    projectDiv.setAttribute("class", "nav-group");
    projectDiv.setAttribute("id", "projects-group");

    projectDiv.innerHTML += `
    <dialog id="dialog-add-project">
        <form id="project-form">
            <div>
                <textarea id="project-name" name="project-name" placeholder="Name..."></textarea>
            </div>
            <div>
                <button type="submit" id="project-add-btn" class="text-button">Add</button>
                <button type="button" id="project-cancel-btn" class="text-button">Cancel</button>
            </div>
        </form>
    </dialog>
    `;

    const h2 = document.createElement("h2");
    h2.innerText = "Projects";
    projectDiv.appendChild(h2);

    projectDiv.innerHTML += `
    <div id="project-add-sort-div">
        <button id="project-modal-btn" class="text-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                <path
                    d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z">
                </path>
            </svg>
            Add Project
        </button>

        <div id="sorting-arrows">
            <button id="up-arrow-projects" class="icon-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                    <path
                        d="M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z">
                    </path>
                </svg>
            </button>
            <button id="down-arrow-projects" class="icon-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                    <path
                        d="M208.49,152.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,187V40a12,12,0,0,1,24,0V187l51.51-51.52a12,12,0,0,1,17,17Z">
                    </path>
                </svg>
            </button>
        </div>
    </div>
    `;

    const projectsUL = document.createElement("ul");
    if (projects.allTodos.length <= 1) {
        projectDiv.append(projectsUL);
    }
    else {
        const allProjects = [...projects.allTodos.slice(1)]

        allProjects.forEach(item => {
            const li = createProjectListItem(item);
            projectsUL.appendChild(li);
        })
        projectDiv.append(projectsUL);
    }
    return projectDiv;

}

export function createProjectListItem(project) {
    const li = document.createElement("li");
    li.setAttribute("class", "nav-link");

    const h3 = document.createElement("h3");
    h3.innerText = project.name;
    li.appendChild(h3);

    const unchecked = document.createElement("div");
    unchecked.setAttribute("class", "unchecked-tasks-count");
    unchecked.innerText = project.tasks.length;
    li.appendChild(unchecked);

    li.innerHTML += `
        <button class="icon-button three-dots-project-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"  viewBox="0 0 256 256">
                <path
                    d="M112,60a16,16,0,1,1,16,16A16,16,0,0,1,112,60Zm16,52a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,68a16,16,0,1,0,16,16A16,16,0,0,0,128,180Z">
                </path>
            </svg>
        </button>
        <dialog class="edit-project-dialog">
            <div>
                <button class="text-button delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                        <path 
                            d="M216,48H180V36A28,28,0,0,0,152,8H104A28,28,0,0,0,76,36V48H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM100,36a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4V48H100Zm88,168H68V72H188ZM116,104v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm48,0v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z">
                        </path>
                    </svg>
                    Delete
                </button>
                <button class="text-button edit-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                        <path 
                            d="M232.49,55.51l-32-32a12,12,0,0,0-17,0l-96,96A12,12,0,0,0,84,128v32a12,12,0,0,0,12,12h32a12,12,0,0,0,8.49-3.51l96-96A12,12,0,0,0,232.49,55.51ZM192,49l15,15L196,75,181,60Zm-69,99H108V133l56-56,15,15Zm105-7.43V208a20,20,0,0,1-20,20H48a20,20,0,0,1-20-20V48A20,20,0,0,1,48,28h67.43a12,12,0,0,1,0,24H52V204H204V140.57a12,12,0,0,1,24,0Z">
                        </path>
                    </svg>
                    Edit
                </button>
            </div>
        </dialog>
    `;

    li.dataset.id = project.id;
    return li;
}