/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */

import { Todo, TodoModel } from '../models/todo.model.js';
import { TodoService } from '../services/todo.service.js';
import { TodoView } from '../views/todo.views.js';

export class TodoController {
    private view: TodoView;
    private service: TodoService;

    constructor(service: TodoService, view: TodoView) {
        this.view = view;
        this.service = service;        

        // Explicit this binding
        this.service.bindTodoListChanged(this.onTodoListChanged);
        this.view.bindAddTodo(this.handleAddTodo);
        this.view.bindEditTodo(this.handleEditTodo);
        this.view.bindDeleteTodo(this.handleDeleteTodo);
        this.view.bindToggleTodo(this.handleToggleTodo);

        // Display initial todos
        this.onTodoListChanged(this.service.getTodos());
    };

    private onTodoListChanged = (todos: TodoModel[]): void => {
        this.view.displayTodos(todos);
    };

    private handleAddTodo = (text: string): void => {
        this.service.addTodo(text);
    };
    
    private handleEditTodo = (id: string, text: string): void => {
        this.service.editTodo(id, text);
    };

    private handleDeleteTodo = (id: string): void => {
        this.service.deleteTodo(id);
    };

    private handleToggleTodo = (id: string): void => {
        this.service.toggleTodo(id);
    };
}
