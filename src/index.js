import './styles.css';
import buildSidebar from './components/sidebar';
import myTodoList from './data/todoList';


// buildSidebar();

const sideBarButton = document.querySelector("#hamburger-btn");
const sideBar = document.querySelector("#sidebar");

sideBarButton.addEventListener('click', () => {
    sideBar.classList.toggle("show");
})

sideBar.addEventListener('click', (e) => {
    const clickedLink = e.target.closest('.nav-link');

    if (clickedLink) {
        const oldSelectedLink = document.querySelector(".selected-link");
        oldSelectedLink?.classList.toggle("selected-link");
        
        clickedLink.classList.toggle("selected-link");
    }
})

const openProjectModal = document.querySelector("#project-modal-btn");
const projectForm = document.querySelector("#project-form");
const projectNameInput = document.querySelector("#project-name");
const cancelProject = document.querySelector("#project-cancel-btn");
const addProjectBtn = document.querySelector("#project-add-btn");
const dialog = document.querySelector("#dialog-add-project");
const projectsUl = document.querySelector("#projects-list");

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


