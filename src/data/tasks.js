

export default class Task {
    #_id;
    #_priority;

    constructor(id = crypto.randomUUID(), title = "title", description = "optional", dueDate, priority = "none", checked = false) {
        if (!new.target)
            throw new Error("use the new keyword");

        this.#_id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
    }

    toggleCheck() {
        this.checked = !this.checked;
    }

    editTask(title = this.title, description = this.description, dueDate = this.dueDate, priority = this.priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    set priority(p) {
        if (p == "low" || p == "medium" || p == "high") {
            this.#_priority = p;
            return;
        }

        throw new Error("Priority should be low, medium or high !");
    }

    get priority() {
        return this.#_priority;
    }

    get id() {
        return this.#_id;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            checked: this.checked
        };
    }
}

