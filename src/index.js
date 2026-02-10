import './styles.css';
import buildSidebar from './components/sidebar';


// buildSidebar();

const sideBarButton = document.querySelector("#hamburger-btn");
const sideBar = document.querySelector("#sidebar");

sideBarButton.addEventListener('click', () => {
    sideBar.classList.toggle("show");
})

sideBar.addEventListener('click', (e) => {
    const clickedLink = e.target.closest('.nav-link');
    const allTasksBtn = document.querySelector("#all-tasks");
    const dueTasksBtn = e.target.closest('#due-tasks');
    const inboxBtn = document.querySelector("#inbox");


    const projectsArray = [];

    if (clickedLink) {
        const oldSelectedBtn = document.querySelector(".selected-link");
        oldSelectedBtn?.classList.toggle("selected-link");
        clickedLink.classList.toggle("selected-link");

        if (clickedLink === allTasksBtn) {
            //load all tasks
            // have 1 function for load and give all project array
        }
        else if (clickedLink === dueTasksBtn) {
            //have a function in project that returns tasks with less than a week , a day , and expired 
        }
        else if (clickedLink === inboxBtn) {
            //get all tasks from projectArray[0] which will be for inbox tasks 
        }
        else {
            //maybe do the dataset.id to compare all project with the clicked one 

        }
    }
})





