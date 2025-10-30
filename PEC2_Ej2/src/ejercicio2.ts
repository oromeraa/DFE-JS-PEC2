//Sustituye /***/ por las instrucciones adecuadas que cumplan las operaciones 
//y salidas indicadas en los comentarios.


interface Plane{
    model:string,
    npassengers:number
}

interface HangarHash{
    [reference:string]:Plane
}

let myHangar:HangarHash = {}

myHangar['123Z']={
    model:'airbus',
    npassengers:200
}
myHangar['H789']={ 
    model:'boeing',
    npassengers:151
}

/** Print following lines (going through the object)
 * 123Z:airbus(200)
 * H789:boeing(151)
 */
for(let ref in myHangar){
    let plane = myHangar[ref];
    console.log(`${ref}:${plane.model}(${plane.npassengers})`);
}
