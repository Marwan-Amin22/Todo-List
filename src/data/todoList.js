import Project from "./projects";

export default class todoList {

    //is an array of projects with all_data[0] being the inbox
    #allTodos;

    constructor() {
        const allTodosObject = JSON.parse(localStorage.getItem('allTodos'));
        this.hydrateProjects(allTodosObject.allTodos || [{ id: undefined, name: "inbox", tasks: undefined }]);
    }

    createNewProject(name) {
        const newProject = new Project(undefined, name, undefined);
        this.#allTodos.push(newProject);
        this.save();
    }

    hydrateProjects(projects) {
        this.#allTodos = projects.map(item => {
            return new Project(item.id, item.name, item.tasks);
        })
    }

    createTaskForProject(projectId, title, description = "optional", dueDate, priority) {
        const indexToAddTo = this.#allTodos.findIndex(item => item.id === projectId);
        if (indexToAddTo == -1)
            return;
        this.#allTodos[indexToAddTo].createTaskForProject(title, description, dueDate, priority);
        this.save();
    }

    save() {
        localStorage.setItem('allTodos', JSON.stringify(this.toJSON()));
    }

    get allTodos() {
        return this.#allTodos;
    }

    get length() {
        return this.#allTodos.length;
    }

    toJSON() {
        return {
            allTodos: this.allTodos
        }
    }
}
