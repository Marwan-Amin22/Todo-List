import './sidebar.css';
import myTodoList from "../data/todoList";

import buildHomeSection from './sidebar/homeSection';
import buildProjectsSection, { createProjectListItem } from './sidebar/projectsSection';
import buildThemeSection from './sidebar/themeSection';

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


export function setSidebarEventListeners() {

    const sidebarButton = document.querySelector("#hamburger-btn");                 //
    const sidebar = document.querySelector("#sidebar");                             //
    const openProjectModal = document.querySelector("#project-modal-btn");          //
    const projectForm = document.querySelector("#project-form");                    //
    const projectNameInput = document.querySelector("#project-name");               //
    const cancelProject = document.querySelector("#project-cancel-btn");            //
    const addProjectBtn = document.querySelector("#project-add-btn");               //
    const dialog = document.querySelector("#dialog-add-project");                   //
    const projectsUl = document.querySelector("#projects-group>ul");                //
    const downArrowProjects = document.querySelector("#down-arrow-projects");       //
    const upArrowProjects = document.querySelector("#up-arrow-projects");           //



    sidebarButton.addEventListener('click', () => {
        sidebar.classList.toggle("show");
    })

    sidebar.addEventListener('click', (e) => {
        const clickedLink = e.target.closest('.nav-link > h3');
        const clickedEditProject = e.target.closest('.three-dots-project-btn');

        if (clickedLink) {
            const oldSelectedLink = document.querySelector(".selected-link");
            oldSelectedLink?.classList.toggle("selected-link");
            clickedLink.classList.toggle("selected-link");

            const clickListItem = clickedLink.parentElement;

            if (clickListItem === document.querySelector("#all-tasks")) {
                //allTasksPage
            }
            else if (clickListItem === document.querySelector("#due-tasks")) {
                //dueTasksPage
            }
            else if (clickListItem === document.querySelector("#inbox")) {
                //inboxPage
            }
            else {
                //loadProjectPage(clickListItem.dataset.id);
            }
        }

        if (clickedEditProject) {
            handelEditProject(clickedEditProject.parentElement.dataset.id);
        }

    })


    function addProject(name) {
        myTodoList.createNewProject(name);
    }

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
    })

    openProjectModal.addEventListener('click', (e) => {
        if (dialog.classList.contains("edit"))
            dialog.classList.toggle("edit");
        if (!dialog.classList.contains("new"))
            dialog.classList.toggle("new");
        addProjectBtn.innerText = "";
        addProjectBtn.innerText = "Add";
        dialog.dataset.id = "";

        dialog.showModal();
    })


    projectNameInput.addEventListener('click', () => {
        //the text area 
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
        //just validates the input name 

        if (projectNameInput.value == "") {
            projectNameInput.placeholder = "Name is Required...";
            projectNameInput.classList.toggle("error-placeholder");

        }
        else if (projectNameInput.value.length > 20) {
            projectNameInput.value = "";
            projectNameInput.placeholder = "Name Length Can't Exceed 20 Characters...";
            projectNameInput.classList.toggle("error-placeholder");
        }
        else {
            if (dialog.classList.contains("new")) {
                addProject(projectNameInput.value);
                projectNameInput.value = "";
                updateProjectToUl();
            }
            else if (dialog.classList.contains("edit")) {
                const projectId = dialog.dataset.id;
                myTodoList.editProjectName(projectId, projectNameInput.value);                              // this updates the array
                const liToUpdate = [...projectsUl.children].find(item => item.dataset.id === projectId);        // looping the li array to get the one with matching id 

                if (liToUpdate) {
                    liToUpdate.getElementsByTagName("h3")[0].innerText = projectNameInput.value;
                }
            }
            dialog.close();

        }
    })

    function updateProjectToUl() {
        if (myTodoList.allTodos.length === 1)
            return;

        const newProject = myTodoList.allTodos[myTodoList.allTodos.length - 1];
        const projectLi = createProjectListItem(newProject);
        projectsUl.appendChild(projectLi);
    }


    downArrowProjects.addEventListener('click', () => {
        if (upArrowProjects.classList.contains("active")) {
            upArrowProjects.classList.toggle("active")
        }


        if (downArrowProjects.classList.contains("active")) {
            //sort by date created returnDefaultListOrder
        }
        else {
            sortProjectList("asc");
        }

        downArrowProjects.classList.toggle("active");
    })

    upArrowProjects.addEventListener('click', () => {

        if (downArrowProjects.classList.contains("active")) {
            downArrowProjects.classList.toggle("active")
        }

        if (upArrowProjects.classList.contains("active")) {
            //sort by date created returnDefaultListOrder
        }
        else {
            sortProjectList("desc");
        }

        upArrowProjects.classList.toggle("active");

    })

    function sortProjectList(typeOfSort) {
        if (typeOfSort != "desc" && typeOfSort != "asc") {
            return;
        }
        const projectsArray = projectsUl.children;      //this is an array of li 
        const toSort = [];                              //this contains the number of tasks and the li itself 

        for (let i = 0; i < projectsArray.length; i++) {
            toSort.push({
                taskCount: projectsArray[i].getElementsByClassName("unchecked-tasks-count")[0].innerText,
                listItem: projectsArray[i],
            })
        }

        let sorted;
        if (typeOfSort == "desc") {
            sorted = toSort.sort((a, b) => b.taskCount - a.taskCount);
        }
        else if (typeOfSort == "asc") {
            sorted = toSort.sort((a, b) => a.taskCount - b.taskCount);
        }

        projectsUl.innerHTML = "";

        for (let i = 0; i < sorted.length; i++) {
            projectsUl.appendChild(sorted[i].listItem);
        }

    }

    function returnDefaultListOrder() {

    }

    function handelEditProject(projectID) {

        const projectsLiArray = [...projectsUl.children];
        const ProjectToEdit = projectsLiArray.filter(item => item.dataset.id === projectID)[0];
        const smallDialog = ProjectToEdit.getElementsByTagName("dialog")[0];


        projectsLiArray.forEach(item => {
            if (item.getElementsByTagName("dialog")[0] === smallDialog) { }
            else if (item.getElementsByTagName("dialog")[0].open) {
                item.getElementsByTagName("dialog")[0].close();
            }
        })

        if (smallDialog.open) {
            smallDialog.close();
        }
        else {
            smallDialog.show();
        }

        smallDialog.addEventListener('click', (e) => {
            const clickedBtn = e.target.closest("button");

            if (clickedBtn) {
                smallDialog.close();
                const projectListItem = clickedBtn.closest("li");
                if (clickedBtn.classList.contains("edit-btn")) {
                    editProject(projectListItem);
                }
                else if (clickedBtn.classList.contains("delete-btn")) {
                    deleteProject(projectListItem);
                }
            }
        }, { once: true })

    }

    function editProject(projectLi) {
        const projectId = projectLi.dataset.id;
        const projectName = projectLi.getElementsByTagName('h3')[0].innerText;

        if (!dialog.classList.contains("edit"))
            dialog.classList.toggle("edit");
        if (dialog.classList.contains("new"))
            dialog.classList.toggle("new");

        addProjectBtn.innerText = "";
        addProjectBtn.innerText = "Confirm";

        dialog.showModal();
        dialog.dataset.id = projectId;
        projectNameInput.value = projectName;
    }

    function deleteProject(projectListItem) {

        if (projectListItem.querySelector("h3").classList.contains("selected-link")) {
            const allTasks = document.querySelector("#all-tasks > h3");
            allTasks.classList.toggle("selected-link");
        }
        const projectId = projectListItem.dataset.id;
        myTodoList.deleteProject(projectId);
        projectListItem.remove();
    }
}
