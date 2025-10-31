/**
 * @class Service
 *
 * Manages the data of the application.
 */

/* =======================================================================
// --- Fake localStorage temporal (para test en Node) Está hardcoreado ---
// =======================================================================
const fakeLocalStorage = {
  store: new Map<string, string>(),

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  },

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  },

  removeItem(key: string): void {
    this.store.delete(key);
  },

  clear(): void {
    this.store.clear();
  },
};

// Guardamos datos simulados
fakeLocalStorage.setItem(
  "todos",
  JSON.stringify([
    { text: "Arduino", complete: true },
    { text: "ESP32", complete: true },
  ])
);

// =================================================================== */

import { TodoModel, Todo } from "../models/todo.model.js";

export class TodoService {
    private todos: TodoModel[] = [];
    private onTodoListChanged: (todos: TodoModel[]) => void = () => {};

    constructor() {
        const localTodos: (string | null) = localStorage.getItem('todos');
        let parsedTodos: TodoModel[];

        try {
            // Intentamos parsear los todos guardados en localStorage y si no hay nada, usamos una array vacia
            parsedTodos = JSON.parse(localTodos ?? "[]");
        }
        catch {
            // Pero si aun así falla, nos aseguramos que parsedTodos será una array vacia
            parsedTodos = [];
        }

        this.todos = parsedTodos.map((todo: TodoModel) => {
            return new Todo(todo.text, todo.complete);
        });
    };

    // marca cambios en la lista de todos
    public bindTodoListChanged(callback: (todos: TodoModel[]) => void): void {
        this.onTodoListChanged = callback;
    };

    // sube los cambios a localStorage y notifica los cambios con el callback
    public _commit(todos: TodoModel[]): void { // va a private?
        this.onTodoListChanged(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log("Pushed changes to localStorage.");
    };

    public addTodo(todoText: string): void {
        this.todos.push(new Todo(todoText));
        console.log("Added todo");
        // pusheamos cambios
        this._commit(this.todos);
    }

    public deleteTodo(_id: string): void {       
        this.todos = this.todos.filter((todo) => todo.id !== _id);
        console.log("Removed todo");
        // pusheamos cambios
        this._commit(this.todos);
    }

    public editTodo(id: string, updatedText: string): void {
        this.todos = this.todos
        .map(todo => todo.id === id ? 
            new Todo(updatedText, todo.complete) : 
            todo);
        console.log("Edited todo");
        // pusheamos cambios
        this._commit(this.todos);
    }

    public toggleTodo(_id: string): void {        
        this.todos = this.todos
        .map(todo => todo.id === _id ? 
            new Todo(todo.text, !todo.complete) : 
            todo);            
        console.log("Toggle todo.");
        // pusheamos cambios
        this._commit(this.todos);
    };

    // Añadimos el método para obtener los todos a través se la clase. Y hacemos privada la propiedad.
    public getTodos(): TodoModel[] {
        return this.todos;
    };
}

/*
// Test simple para el service
const service = new TodoService();
// Esto me ha ayudado a entender un poco como funcionan los callbacks
service.bindTodoListChanged((todos) => { const lista = todos.map(t => {
    const color = t.complete ? "\x1b[32m" : "\x1b[33m"; // verde / amarillo
        return `${color}${t.text}\x1b[0m`;
    }).join(", ");
    console.log("🔔 Cambios:", lista);
});

service.addTodo("Altera");
service.addTodo("Raspberry Pi");

service.deleteTodo(service.getTodos()[1].id);

service.editTodo(service.getTodos()[1].id, "BeagleBone");

service.toggleTodo(service.getTodos()[0].id);
*/
