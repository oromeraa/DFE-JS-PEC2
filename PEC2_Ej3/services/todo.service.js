"use strict";
/**
 * @class Service
 *
 * Manages the data of the application.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
// =======================================================================
// --- Fake localStorage temporal (para test en Node) Está hardcoreado ---
// =======================================================================
const fakeLocalStorage = {
    store: new Map(),
    getItem(key) {
        return this.store.has(key) ? this.store.get(key) : null;
    },
    setItem(key, value) {
        this.store.set(key, value);
    },
    removeItem(key) {
        this.store.delete(key);
    },
    clear() {
        this.store.clear();
    },
};
// Guardamos datos simulados
fakeLocalStorage.setItem("todos", JSON.stringify([
    { text: "Arduino", complete: true },
    { text: "ESP32", complete: true },
]));
// ===================================================================
const todo_model_1 = require("../models/todo.model");
class TodoService {
    constructor() {
        this.todos = [];
        this.onTodoListChanged = () => { };
        const localTodos = fakeLocalStorage.getItem('todos');
        let parsedTodos;
        try {
            // Intentamos parsear los todos guardados en localStorage y si no hay nada, usamos una array vacia
            parsedTodos = JSON.parse(localTodos !== null && localTodos !== void 0 ? localTodos : "[]");
        }
        catch (_a) {
            // Pero si aun así falla, nos aseguramos que parsedTodos será una array vacia
            parsedTodos = [];
        }
        this.todos = parsedTodos.map((todo) => {
            return new todo_model_1.Todo(todo.text, todo.complete);
        });
    }
    ;
    // marca cambios en la lista de todos
    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }
    ;
    // sube los cambios a localStorage y notifica los cambios con el callback
    _commit(todos) {
        this.onTodoListChanged(todos);
        fakeLocalStorage.setItem('todos', JSON.stringify(todos));
        console.log("Pushed changes to localStorage.");
    }
    ;
    addTodo(todoText) {
        this.todos.push(new todo_model_1.Todo(todoText));
        console.log("Added todo");
        // pusheamos cambios
        this._commit(this.todos);
    }
    deleteTodo(_id) {
        this.todos = this.todos.filter((todo) => todo.id !== _id);
        console.log("Removed todo");
        // pusheamos cambios
        this._commit(this.todos);
    }
    editTodo(id, updatedText) {
        this.todos = this.todos
            .map(todo => todo.id === id ?
            new todo_model_1.Todo(updatedText, todo.complete) :
            todo);
        console.log("Edited todo");
        // pusheamos cambios
        this._commit(this.todos);
    }
    toggleTodo(_id) {
        this.todos = this.todos
            .map(todo => todo.id === _id ?
            new todo_model_1.Todo(todo.text, !todo.complete) :
            todo);
        console.log("Toggle todo.");
        // pusheamos cambios
        this._commit(this.todos);
    }
    ;
    // Añadimos el método para obtener los todos a través se la clase. Y hacemos privada la propiedad.
    getTodos() {
        return this.todos;
    }
    ;
}
exports.TodoService = TodoService;
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
