import todoList from "../data/todoList";

const myTodoList = new todoList();

export default function buildSidebar() {
    const sidebar = document.querySelector("#sidebar");
    sidebar.innerHTML = "";
    const home = buildHomeSection();
    sidebar.appendChild(home);
}

function buildHomeSection(){

    const home = document.createElement('div');
    home.setAttribute("class", "nav-group");

    const homeHeader = document.createElement('h2');
    homeHeader.innerText = "Home";
    home.appendChild(homeHeader);

    const ul = document.createElement('ul');
    const allTasksLi = document.createElement('li');
    allTasksLi.setAttribute("id", "all-tasks");
    allTasksLi.setAttribute("class", "nav-link");
    allTasksLi.innerHTML = "<h3>All Tasks</h3>";
    allTasksLi.click();

    const dueTasksLi = document.createElement('li');
    dueTasksLi.setAttribute("id", "due-tasks");
    dueTasksLi.setAttribute("class", "nav-link");
    dueTasksLi.innerHTML = "<h3>Due Tasks</h3>";

    const inboxLi = document.createElement('li');
    inboxLi.setAttribute("id", "inbox");
    inboxLi.setAttribute("class", "nav-link");
    inboxLi.innerHTML = "<h3>Inbox</h3>";

    inboxLi.dataset.id = myTodoList.allTodos[0].id;

    ul.append(allTasksLi, dueTasksLi, inboxLi);
    home.appendChild(ul);

    return home;
}

function buildProjectsSection(){
    
}