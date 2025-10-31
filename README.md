oromeraa

Omar Romera Aller

## Ejercicio 1 
Superado sin problemas. Sencillo.

## Ejercicio 2 
Superado. He tenido que revisar, uno a uno, todos los atributos de Array para poder realizarlo. Me parece que está muy bien planteado el ejercicio. Me ha gustado.

## Ejercicio 3 
Superado pero casi llorando sangre. `todo.model` y `todo.service` no me ha costado, hasta me he podido recrear simulando una localStorage para poder testear el correcto funcionamiento una vez transpilado. Aunque me ha costado conseguir entender el funcionamiento de las callbacks (no podría la mano en el fuego que las entiendo del todo pero lo suficiente para resolver el ejercicio). 

Pero ya `todo.views` se me ha empezado a torcer un poco. No estoy familiarizado demasiado con HTML y de primera me costaba tipear variables, luego ya he ido revisando las librerias donde se definen los tipos y he ido cribando hasta conseguir utilizar los types correctos. Esto también me ha permitido ver como se definen ciertos atributos o métodos y replicarlo. 

`todo.controller` se ha vuelto a aplanar la dificultad (sobre todo por haberme peleado con el tema de las callbacks `todo.service`). 

He ido transpilando uno a uno y haciendo test donde podía. Para hacerlo de manera individual he tenido que general tsconfig individuales. Luego ya una vez tenía todo picado, con el tsconfig general ya he podido pasarlo todo simultaneamente. De primeras no me ha funcionado por hacer los imports de manera indebida. Hasta que he llegado a la conclusión que era por no darles extensión. El entorno `Node` y el entorno `Browser` son cosas distintas. No todo lo que me funcionó con uno me servía para el resto. Los imports ejecutando en `Browser` necesitan de la extensión `.js` para importar correctamente.

No he intentado transpilar con `webpack` porque he padecido bastante es ejericio 3. Como finalmente me ha funcionado y no era obligatorio he preferido no hacerlo. Pero no descarto en absoluto, con más calma, mirar como hacerlo y llegar a utilizarlo más adelante.