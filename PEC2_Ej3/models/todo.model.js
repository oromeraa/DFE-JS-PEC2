/**
 * @class Model
 *
 * Manages the data of the application.
 */
var Todo = /** @class */ (function () {
    function Todo(text, complete) {
        if (text === void 0) { text = ''; }
        if (complete === void 0) { complete = false; }
        this.id = this.uuidv4();
        this.text = text;
        this.complete = complete;
    }
    Todo.prototype.uuidv4 = function () {
        var base = [1e7, 1e3, 4e3, 8e3, 1e11].join('-');
        var replaced = base.toString().replace(/[018]/g, function (c) {
            var rand = crypto.getRandomValues(new Uint8Array(1))[0];
            rand = rand & (15 >> (parseInt(c) / 4));
            return (parseInt(c) ^ rand).toString(16);
        });
        return replaced;
    };
    return Todo;
}());
console.log(new Todo('Arduino', true));
