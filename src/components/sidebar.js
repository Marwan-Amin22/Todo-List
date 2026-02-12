import './sidebar.css';
import myTodoList from "../data/todoList";

import buildHomeSection from './sidebar/homeSection';
import buildProjectsSection, { createProjectListItem } from './sidebar/projectsSection';

export default function buildSidebar() {
    const sidebar = document.querySelector("#sidebar");
    sidebar.innerHTML = "";

    const homeDiv = buildHomeSection(myTodoList.allTodos[0]);
    const projectDiv = buildProjectsSection(myTodoList);
    const themeDiv = buildThemeSection();

    sidebar.appendChild(homeDiv);
    sidebar.appendChild(projectDiv);
    sidebar.appendChild(themeDiv);
    setSidebarEventListeners();
}



function buildThemeSection() {
    const themeDiv = document.createElement('div');
    themeDiv.setAttribute("id", "theme-group");
    themeDiv.setAttribute("class", "nav-group");

    const h2 = document.createElement('h2');
    h2.innerText = "Theme";

    const themeBtn = document.createElement('button');
    themeBtn.setAttribute("id", "toggle-theme-btn");
    themeBtn.setAttribute("class", "text-button");
    themeBtn.innerText = "temp"

    themeDiv.append(h2, themeBtn);
    return themeDiv;

}

function setSidebarEventListeners() {

    const sidebarButton = document.querySelector("#hamburger-btn");
    const sidebar = document.querySelector("#sidebar");
    const openProjectModal = document.querySelector("#project-modal-btn");
    const projectForm = document.querySelector("#project-form");
    const projectNameInput = document.querySelector("#project-name");
    const cancelProject = document.querySelector("#project-cancel-btn");
    const addProjectBtn = document.querySelector("#project-add-btn");
    const dialog = document.querySelector("#dialog-add-project");
    const projectsUl = document.querySelector("#projects-group>ul");



    sidebarButton.addEventListener('click', () => {
        sidebar.classList.toggle("show");
    })

    sidebar.addEventListener('click', (e) => {
        const clickedLink = e.target.closest('.nav-link > h3');

        if (clickedLink) {
            const oldSelectedLink = document.querySelector(".selected-link");
            oldSelectedLink?.classList.toggle("selected-link");

            clickedLink.classList.toggle("selected-link");
        }
    })


    function addProject(name) {
        myTodoList.createNewProject(name);
    }

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const projectName = formData.get("project-name");
        projectNameInput.value = "";

        addProject(projectName);
        dialog.close();

        updateProjectToUl();
    })
    openProjectModal.addEventListener('click', () => {
        dialog.showModal();
    })


    projectNameInput.addEventListener('click', () => {
        if (projectNameInput.classList.contains("error-placeholder")) {
            projectNameInput.placeholder = "Name...";
            projectNameInput.classList.toggle("error-placeholder");
        }
    })
    cancelProject.addEventListener('click', () => {
        projectNameInput.value = "";
        if (projectNameInput.classList.contains("error-placeholder")) {
            projectNameInput.placeholder = "Name...";
            projectNameInput.classList.toggle("error-placeholder");
        }


        dialog.close();
    })

    addProjectBtn.addEventListener('click', () => {

        if (projectNameInput.value == "") {
            projectNameInput.placeholder = "Name is Required...";
            projectNameInput.classList.toggle("error-placeholder");

        }
        else if (projectNameInput.value.length > 25) {
            projectNameInput.value = "";
            projectNameInput.placeholder = "Name Length Can't Exceed 25 Characters...";
            projectNameInput.classList.toggle("error-placeholder");
        }

    })


    function updateProjectToUl() {
        if (myTodoList.allTodos.length === 1)
            return;

        const newProject = myTodoList.allTodos[myTodoList.allTodos.length - 1];
        const projectLi = createProjectListItem(newProject);
        projectsUl.appendChild(projectLi);
    }
}
