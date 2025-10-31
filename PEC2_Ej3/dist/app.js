import { TodoController } from './controllers/todo.controller.js';
import { TodoService } from './services/todo.service.js';
import { TodoView } from './views/todo.views.js';
const app = new TodoController(new TodoService(), new TodoView());
