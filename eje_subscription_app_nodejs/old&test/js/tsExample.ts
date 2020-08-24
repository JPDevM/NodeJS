const sumar = function (n1: number, n2: number): number {
	return n1 + n2;
}

console.log( sumar(10, 20) );

type Animal = "perro" | "gato" | "pájaro";

const saludarMascota = function (mascota: Animal) {
	return `Hola ${mascota}`;
}

console.log( saludarMascota('perro') );
console.log( saludarMascota('gato') );
