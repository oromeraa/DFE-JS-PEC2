"use strict";
//Sustituye /***/ por las instrucciones adecuadas que cumplan las operaciones 
//y salidas indicadas en los comentarios.
class Animal {
    constructor() {
        Animal.population++;
    }
}
Animal.population = 0;
class Dog extends Animal {
    constructor(color) {
        super(); // Llama al constructor de la clase Animal
        this.aSound = 'WOW';
        this.color = color;
    }
    sound() {
        console.log(this.aSound); // Define el sonido del perro
    }
    iamadog() {
        console.log('yes, this is a dog');
    }
}
class Cat extends Animal {
    constructor(gender) {
        super(); // Llama al constructor de la clase Animal 
        this.aSound = 'MEOW';
        this.gender = gender;
    }
    sound() {
        console.log(this.aSound); // Define el sonido del gato
    }
    iamacat() {
        console.log('yes, this is a cat');
    }
}
let animals = [];
animals.push(new Cat('male'));
animals.push(new Dog('white'));
animals.push(new Cat('female'));
animals.push(new Dog('black'));
for (let animal of animals) {
    animal.sound();
    if (animal.aSound === 'MEOW') {
        animal.iamacat();
    }
    else if (animal.aSound === 'WOW') {
        animal.iamadog();
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
