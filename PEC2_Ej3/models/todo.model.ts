/**
 * @class Model 
 * 
 * Manages the data of the application.
 */


class Todo {
    id: string;
    text: string;
    complete: boolean;

    constructor(text: string = '', complete: boolean = false) {
        this.id = this.uuidv4();
        this.text = text;
        this.complete = complete;
    }

    private uuidv4(): string {
        const base: string = [1e7, 1e3, 4e3, 8e3, 1e11].join('-');
        let replaced: string = base.toString().replace(/[018]/g, (c: string) => {
            let rand: number = crypto.getRandomValues(new Uint8Array(1))[0];
            rand = rand & (15 >> (parseInt(c) / 4));
            return (parseInt(c) ^ rand).toString(16);
        });
        return replaced;
    }
}

console.log(new Todo('Arduino', true));