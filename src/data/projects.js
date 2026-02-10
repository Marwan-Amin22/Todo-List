import Task from "./tasks";

export default class Project {
    #_id;
    constructor(id = crypto.randomUUID(), name = "name", tasks = []) {
        this.#_id = id;
        this.name = name;
        this.hydrateTasks(tasks)
    }

    editName(newName) {
        this.name = newName;
    }

    addTaskToProject(newTask) {
        this.tasks.push(newTask);
    }

    editTask(taskId) {
        const taskToEdit = this.tasks.filter(item => item.id === taskId);

        if (taskToEdit) {
            taskToEdit[0].editTask;
        }
    }

    hydrateTasks(tasks) {
        this.tasks = tasks.map((item) => {
            return new Task(item.id, item.title, item.description, item.dueDate, item.priority);
        })
    }

    get id() {
        return this.#_id;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            tasks: this.tasks
        }
    }
}