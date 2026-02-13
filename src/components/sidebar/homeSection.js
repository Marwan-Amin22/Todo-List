
export default function buildHomeSection(inbox) {

    const homeDiv = document.createElement('div');
    homeDiv.setAttribute("class", "nav-group");
    homeDiv.setAttribute("id", "home-group");

    const homeHeader = document.createElement('h2');
    homeHeader.innerText = "Home";
    homeDiv.appendChild(homeHeader);

    const ul = document.createElement('ul');
    const allTasksLi = document.createElement('li');
    allTasksLi.setAttribute("id", "all-tasks");
    allTasksLi.setAttribute("class", "nav-link");
    allTasksLi.innerHTML = "<h3 class='selected-link' >All Tasks</h3>";
    allTasksLi.click();

    const dueTasksLi = document.createElement('li');
    dueTasksLi.setAttribute("id", "due-tasks");
    dueTasksLi.setAttribute("class", "nav-link");
    dueTasksLi.innerHTML = "<h3>Due Tasks</h3>";

    const inboxLi = document.createElement('li');
    inboxLi.setAttribute("id", "inbox");
    inboxLi.setAttribute("class", "nav-link");
    inboxLi.innerHTML = "<h3>Inbox</h3>";

    inboxLi.dataset.id = inbox.id;

    ul.append(allTasksLi, dueTasksLi, inboxLi);
    homeDiv.appendChild(ul);

    return homeDiv;
}