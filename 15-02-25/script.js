let person = {
    name: 'Ansh',
    age: 18,
    location: 'Mumbai',
    
    myName: function() {
        console.log(`My name is ${this.name}`);
    }
}

// console.log(person);
person.collegeName = 'VIT';
// console.log(person);
// delete person.age;
// console.log(person);
// person.myName();

for (let i in person) {
    console.log(person[i]);
}