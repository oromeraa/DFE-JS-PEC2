"use strict";
/**
 * @class Model
 *
 * Manages the data of the application.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
class Todo {
    constructor(text = '', complete = false) {
        this.id = this.uuidv4();
        this.text = text;
        this.complete = complete;
    }
    uuidv4() {
        const base = [1e7, 1e3, 4e3, 8e3, 1e11].join('-');
        let replaced = base.toString().replace(/[018]/g, (c) => {
            let rand = crypto.getRandomValues(new Uint8Array(1))[0];
            rand = rand & (15 >> (parseInt(c) / 4));
            return (parseInt(c) ^ rand).toString(16);
        });
        return replaced;
    }
}
exports.Todo = Todo;
//console.log(new Todo('Arduino', true));
