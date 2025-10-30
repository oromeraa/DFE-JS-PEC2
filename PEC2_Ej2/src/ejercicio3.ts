//Sustituye /***/ por las instrucciones adecuadas que cumplan las operaciones 
//y salidas indicadas en los comentarios.

abstract class Animal {
    static population: number = 0;
    constructor() {
        Animal.population++;
    }
    public abstract sound(): void;
}

class Dog extends Animal {
    color: string;
    aSound: string = 'WOW';

    constructor (color: string){
        super(); // Llama al constructor de la clase Animal
        this.color = color;
    }

    public sound(): void {
        console.log(this.aSound); // Define el sonido del perro
    }

    public iamadog() {
        console.log('yes, this is a dog');
    }
}

class Cat extends Animal {
    gender: string;    
    aSound: string = 'MEOW';

    constructor (gender: string){
        super(); // Llama al constructor de la clase Animal 
        this.gender = gender;
    }

    public sound(): void {
        console.log(this.aSound); // Define el sonido del gato
    }

    public iamacat() {
        console.log('yes, this is a cat');
    }
}

let animals: Animal[] = [];
animals.push(new Cat('male'));
animals.push(new Dog('white'));
animals.push(new Cat('female'));
animals.push(new Dog('black'));

for(let animal of animals){
    animal.sound();
    if((animal as Cat).aSound === 'MEOW'){
        (animal as Cat).iamacat();
    } else if((animal as Dog).aSound === 'WOW'){
        (animal as Dog).iamadog();
    }
}
/**  loop prints these lines
MEOW
yes, this is a cat
WOW
yes, this is a dog
MEOW
yes, this is a cat
WOW
yes, this is a dog
*/

console.log(Animal.population); //4