/**
 * @class View
 *
 * Visual representation of the model.
 */

import { Todo, TodoModel } from '../models/todo.model.js';

export class TodoView {
    private app: HTMLElement;
    private form: HTMLFormElement;
    private input: HTMLInputElement;
    private submitButton: HTMLButtonElement;
    private title: HTMLHeadingElement;
    private todoList: HTMLUListElement;

    private _temporaryTodoText = "";

    constructor() {
        this.app = this.getElement<HTMLElement>("#root"); // as HTMLElement;

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

    private get _todoText(): string {
        return this.input.value;
    }

    private _resetInput(): void {
        this.input.value = "";
    }

    // estructura similar al lim.dom.d.ts
    // asigna el tipo correcto directamente sin ponerle el tipo
    // className opcional
    private createElement<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string): HTMLElementTagNameMap[K] {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    };

    // estructura similar al lim.dom.d.ts
    // hay que ponerle el tipo que queramos
    // asigna el tipo correcto directamente
    private getElement<E extends Element = Element>(selector: string): E {
        const element = document.querySelector<E>(selector);
        if (element == null) {
            throw new Error(`Could not find element with selector: ${selector}`);
        }
        return element;
    };

    public displayTodos(todos: TodoModel[]): void {
        // Delete all nodes
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }

        // Show default message
        if (todos.length === 0) {
            const p = this.createElement("p"); // as HTMLParagraphElement;
            p.textContent = "Nothing to do! Add a task?";
            this.todoList.append(p);
        } else {
            // Create nodes
            todos.forEach(todo => {
                const li = this.createElement("li"); // as HTMLLIElement;
                li.id = todo.id;

                const checkbox = this.createElement("input") // as HTMLInputElement;
                checkbox.type = "checkbox";
                checkbox.checked = todo.complete;

                const span = this.createElement("span"); // as HTMLSpanElement;
                span.classList.add("editable");

                if (todo.complete) {
                    const strike = this.createElement("s");
                    strike.textContent = todo.text;
                    span.append(strike);
                } else {
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
    };


    private _initLocalListeners(): void {
        this.todoList.addEventListener("input", (event: Event) => {
            const eventTarget = event.target as HTMLElement; // garantiza que es un HTMLElement
            if (!eventTarget) return; // si es null, salimos
            if (eventTarget.className === "editable") {
                this._temporaryTodoText = eventTarget.innerText;
            }
        });
    };

    // el handler debe tener el mismo tipo que la función del service
    public bindAddTodo(handler: (text: string) => void): void {
        this.form.addEventListener("submit", (event: SubmitEvent) => {
            event.preventDefault();
            if (this._todoText) {
                handler(this._todoText); // valor del input
                this._resetInput();
            }
        });
    };

    // el handler debe tener el mismo tipo que la función del service
    public bindDeleteTodo(handler: (id: string) => void): void {
        this.todoList.addEventListener("click", (event: Event) => {
            const eventDelete = event.target as HTMLElement; // garantiza que es un HTMLElement
            if (!eventDelete) return; // si es null, salimos
            if (eventDelete.className === "delete") {
                const parent = eventDelete.parentElement as HTMLElement;
                if (!parent) return; // si es null, salimos
                const id = parent.id;

                handler(id);
            }
        });
    };

    // el handler debe tener el mismo tipo que la función del service
    public bindEditTodo(handler: (id: string, text: string) => void): void {
        this.todoList.addEventListener("focusout", (event: FocusEvent) => {
            const eventEdit = event.target as HTMLElement; // garantiza que es un HTMLElement
            if (!eventEdit) return; // si es null, salimos
            if (this._temporaryTodoText) {
                const parent = eventEdit.parentElement as HTMLElement;
                if (!parent) return; // si es null, salimos
                const id = parent.id;

                handler(id, this._temporaryTodoText);
                this._temporaryTodoText = "";
            }
        });
    };

    // el handler debe tener el mismo tipo que la función del service
    public bindToggleTodo(handler: (id: string) => void): void {
        this.todoList.addEventListener("change", (event: Event) => {
            const eventToggle = event.target as HTMLInputElement; // igual que arriba, checkbox es HTMLInputElement
            if (!eventToggle) return; // si es null, salimos
            if (eventToggle.type === "checkbox") {
                const parent = eventToggle.parentElement as HTMLElement;
                if (!parent) return; // si es null, salimos
                const id = parent.id;

                handler(id);
            }
        });
    };
}
