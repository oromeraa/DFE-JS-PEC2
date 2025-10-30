"use strict";
/**
 * @class View
 *
 * Visual representation of the model.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoView = void 0;
class TodoView {
    constructor() {
        this._temporaryTodoText = "";
        this.app = this.getElement("#root"); // as HTMLElement;
        this.form = this.createElement("form"); // as HTMLFormElement;
        this.input = this.createElement("input"); // as HTMLInputElement;
        this.input.type = "text";
        this.input.placeholder = "Add todo";
        this.input.name = "todo";
        this.submitButton = this.createElement("button"); // as HTMLButtonElement;
        this.submitButton.textContent = "Submit";
        this.form.append(this.input, this.submitButton);
        this.title = this.createElement("h1"); // as HTMLHeadingElement;
        this.title.textContent = "Todos";
        this.todoList = this.createElement("ul", "todo-list"); // as HTMLUListElement;
        this.app.append(this.title, this.form, this.todoList);
        this._initLocalListeners();
    }
    get _todoText() {
        return this.input.value;
    }
    _resetInput() {
        this.input.value = "";
    }
    // estructura similar al lim.dom.d.ts
    // asigna el tipo correcto directamente sin ponerle el tipo
    // className opcional
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className)
            element.classList.add(className);
        return element;
    }
    ;
    // estructura similar al lim.dom.d.ts
    // hay que ponerle el tipo que queramos
    // asigna el tipo correcto directamente
    getElement(selector) {
        const element = document.querySelector(selector);
        if (element == null) {
            throw new Error(`Could not find element with selector: ${selector}`);
        }
        return element;
    }
    ;
    displayTodos(todos) {
        // Delete all nodes
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }
        // Show default message
        if (todos.length === 0) {
            const p = this.createElement("p"); // as HTMLParagraphElement;
            p.textContent = "Nothing to do! Add a task?";
            this.todoList.append(p);
        }
        else {
            // Create nodes
            todos.forEach(todo => {
                const li = this.createElement("li"); // as HTMLLIElement;
                li.id = todo.id;
                const checkbox = this.createElement("input"); // as HTMLInputElement;
                checkbox.type = "checkbox";
                checkbox.checked = todo.complete;
                const span = this.createElement("span"); // as HTMLSpanElement;
                span.classList.add("editable");
                if (todo.complete) {
                    const strike = this.createElement("s");
                    strike.textContent = todo.text;
                    span.append(strike);
                }
                else {
                    span.textContent = todo.text;
                }
                const deleteButton = this.createElement("button", "delete"); // as HTMLButtonElement;
                deleteButton.textContent = "Delete";
                li.append(checkbox, span, deleteButton);
                // Append nodes
                this.todoList.append(li);
            });
        }
        // Debugging
        console.log(todos);
    }
    ;
    _initLocalListeners() {
        this.todoList.addEventListener("input", (event) => {
            const eventTarget = event.target; // garantiza que es un HTMLElement
            if (!eventTarget)
                return; // si es null, salimos
            if (eventTarget.className === "editable") {
                this._temporaryTodoText = eventTarget.innerText;
            }
        });
    }
    ;
    // el handler debe tener el mismo tipo que la función del service
    bindAddTodo(handler) {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (this._todoText) {
                handler(this._todoText); // valor del input
                this._resetInput();
            }
        });
    }
    ;
    // el handler debe tener el mismo tipo que la función del service
    bindDeleteTodo(handler) {
        this.todoList.addEventListener("click", (event) => {
            const eventDelete = event.target; // garantiza que es un HTMLElement
            if (!eventDelete)
                return; // si es null, salimos
            if (eventDelete.className === "delete") {
                const parent = eventDelete.parentElement;
                if (!parent)
                    return; // si es null, salimos
                const id = parent.id;
                handler(id);
            }
        });
    }
    ;
    // el handler debe tener el mismo tipo que la función del service
    bindEditTodo(handler) {
        this.todoList.addEventListener("focusout", (event) => {
            const eventEdit = event.target; // garantiza que es un HTMLElement
            if (!eventEdit)
                return; // si es null, salimos
            if (this._temporaryTodoText) {
                const parent = eventEdit.parentElement;
                if (!parent)
                    return; // si es null, salimos
                const id = parent.id;
                handler(id, this._temporaryTodoText);
                this._temporaryTodoText = "";
            }
        });
    }
    ;
    // el handler debe tener el mismo tipo que la función del service
    bindToggleTodo(handler) {
        this.todoList.addEventListener("change", (event) => {
            const eventToggle = event.target; // igual que arriba, checkbox es HTMLInputElement
            if (!eventToggle)
                return; // si es null, salimos
            if (eventToggle.type === "checkbox") {
                const parent = eventToggle.parentElement;
                if (!parent)
                    return; // si es null, salimos
                const id = parent.id;
                handler(id);
            }
        });
    }
    ;
}
exports.TodoView = TodoView;
