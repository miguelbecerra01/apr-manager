const person = {
    name: 'Miguel',
    age: 32,
    profesion: 'software',
    location: {
        city: 'Chimbarongo',
        temp: 29
    }
};

//usual way
console.log(`${person.name} is ${person.age}`);
console.log(`it's ${person.location.temp} in ${person.location.city}`);

//destructuring
const { name, age } = person;
console.log(`${name} is ${age}`);

const { city, temp } = person.location;
console.log(`it's ${temp} in ${city}`);

const { temp: temperature } = person.location;
console.log(`it's ${temperature} in ${city}`);

//define defaults if value no exists in the object
const { profession: carreer = 'No profession' } = person;
console.log(`It's profession is ${carreer}`);

const book = {
    title: 'Ego is the ennemy',
    author: 'Ruam Demo',
    publisher: {
        name: 'Penguin'
    }
};

const { name: publisherName = 'Self-published' } = book.publisher;
console.log(publisherName);

//Array Destructuring

const address = ['puente la cabra', 'chimbarigo', 'vi region', '29100000'];
console.log(`You are in ${address[1]} ${address[2]}`);


//to desctructure an array is used a [] and it's asigned per order
const [street, comuna, state, zip] = address;
console.log(`You are in ${comuna} ${state}`);

//you can skip items on the array, but you have to keep the comma
const [, comuna2, state2,] = address;
console.log(`You are in ${comuna2} ${state2}`);

const address3 = ['puente la cabra', 'chimbarigo',undefined,''];
//set defaults if the value is empty
const [, comuna3, state3='Santiago',] = address3;
console.log(`You are in ${comuna3} ${state3}`);

const item = ['Coffe (hot)','$2.00','$2.50','$3'];
const [itemName, , valueMedium, ] = item;

console.log(`A medium ${itemName} costs ${valueMedium}` );


//destructuring of an object
const add = ({ a, b }, c) => {
    return a + b + c;
};

console.log(add({ a: 1, b: 12 }, 100));