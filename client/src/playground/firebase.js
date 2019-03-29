//https://firebase.google.com/docs/web/setup?authuser=0
//https://firebase.google.com/docs/reference/js/firebase.database?authuser=0
//https://firebase.google.com/docs/reference/js/firebase.database.Reference?authuser=0

//* is take all the named functions and call it firebase, its because it doesnt have
//a function as default
import * as firebase from 'firebase';

// Initialize Firebase 

const config = {
    apiKey: "AIzaSyBlATvcxT5TS_NB8Gv62ZlFmQ4x-4jbefY",
    authDomain: "expensify-a035a.firebaseapp.com",
    databaseURL: "https://expensify-a035a.firebaseio.com",
    projectId: "expensify-a035a",
    storageBucket: "expensify-a035a.appspot.com",
    messagingSenderId: "1039097332036"
};

firebase.initializeApp(config);

const database = firebase.database();




// Store to the Real Time Database
// ref is short for reference, it's like a table or a collection , this is the root reference
//Insert Data
// database.ref().set({
//     name: 'Miguel Becerra',
//     age: 21,
//     stressLevel: 6,
//     isSingle: true,
//     job: {
//         title: 'Software developer',
//         company: 'Google'
//     },
//     location: {
//         city: 'Santiago',
//         country: 'Chile'
//     }
// }).then(() => {
//     console.log('Data saved');
// }).catch((error) => {
//     console.log('Data not saved: ', error)
// });


//Remove data
// database.ref('isSingle')
//     .remove()
//     .then(() => {
//         console.log('IsSingle Removed!');
//     }).catch((error) => {
//         console.log('IsSingle NOT Removed!', error)
//     });

////remove the age property, is like removed when is value set to null, it deletes the property.
//database.ref('age').set(null);


////Update data, only updates at root level (location is overwritten)
// database.ref().update({
//     job: 'Farmer',
//     location: {
//         city: 'Chimbarongo'
//     }
// });


////Update data, to update the child element the property must be with quotes and with the /
// database.ref().update({
//     job: 'Farmer',
//     'location/city': 'Chimbarongo'
// });

////Update child root values
// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle',
//     'location/country': 'USA'
// }).then(() => {
//     console.log('Data Updated');
// }).catch((error) => {
//     console.log('Data not updated', error);
// });

////GET all data 
////ref(job/company) retrieves a single property
//A 'snapshot' is just a string that represents the rendered output of a React component.
//We use snapshots to make testing React components fast and easy.
// database.ref()
//     .once('value') //is default event type
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((error) => {
//         console.log('Error fetching data', error)
//     });

////Suscribes and retrives data listening to changes events
////we uses callback because promises is resolve or reject a single time
// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log('Data changes Listening', snapshot.val());
// }, (e) => {
//     console.log('Error  with data fetching', e);
// });

// setTimeout(() => {
//     database.ref('age').set(28).then(() => { console.log('Age changed!') });
// }, 3500);


// setTimeout(() => {
//     //Cancels suscription to retrieve data.
//     database.ref().off('value', onValueChange);
// }, 7000);


// setTimeout(() => {
//     database.ref('age').set(32).then(() => { console.log('Age changed!') });
// }, 10500);


////subscribe to retrieve data, then change the name and the job position
// const changeData = database.ref().on('value', (snapshot) => {
//     const data = snapshot.val();
//     console.log(`${data.name} is a ${data.job.title} at ${data.job.company}`);
// });

// database.ref().update({
//     'job/title': 'Farmer',
//     'job/company': 'AgroLibre'
// }).then(() => {
//     console.log('Job Changed');
// });


// setTimeout(() => {
//     //Cancels suscription to retrieve data.
//     database.ref().off('value', changeData);
// }, 7000);


//INSERT array list
const expenses = [{
    description: 'Groceries',
    note: 'Lider supermarket',
    amount: 10000,
    createdAt: 10000200200
},
{
    description: 'Bus Ticket',
    note: 'To Santiago',
    amount: 5000,
    createdAt: 20000200200
},
{
    description: 'Soda',
    note: 'Minimarket San Fernando',
    amount: 5000,
    createdAt: 40000200200
}]

expenses.map((expense) => {
    //  database.ref('expenses').push(expense);
});

////UPDATE an specific node 
// database.ref('expenses/-LaHu0V1Txycqtkc8bDn').update({
//     note: 'To Santiago and Chimba'
// });

////READ data list
database.ref('expenses')
    .once('value')
    .then((snapshot) => {
        const expenses = [];
        snapshot.forEach((childSnapShot) => {
            //push the values from snapshot, and set the id as the key that firebase made
            //and spread the properties
            expenses.push({
                id: childSnapShot.key,
                ...childSnapShot.val()
            });
        });

        console.log(expenses);
    }).catch((e) => {
        console.log(e);
    });

////subscribe to retrieve the list
// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapShot) => {
//         expenses.push({
//             id: childSnapShot.key,
//             ...childSnapShot.val()
//         });
//     });
//     console.log(expenses);
// });

////CHILD_REMOVED -> execute when a child element of the ref is removed
database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(`Child ${snapshot.key} removed: `, snapshot.val());
});

////CHILD_CHANGED -> execute when a child element of the ref is changed
database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(`Child ${snapshot.key} changed: `, snapshot.val());
});

////CHILD_ADDED -> execute when a child element of the ref is added
database.ref('expenses').on('child_added', (snapshot) => {
    console.log(`A new child ${snapshot.key} is added!: `, snapshot.val());
});

database.ref('expenses').push(expenses[2]);

// //this overrides the previous set. 
// //database.ref().set('this is mmy data');

// //update only the reference age, without overriding the previous values
// //database.ref('age').set(32);

// //with / access the child value
//  //database.ref('location/city').set('San Francisco');

// database.ref('attributes').set({
//     height: 1.69,
//     weight: 84
// }).then(() => {
//     console.log('Attributes saved');
// }).catch((error) => {
//     console.log('Attributes not saved', error);
// });

