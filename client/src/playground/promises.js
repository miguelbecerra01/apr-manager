//PROMISES 
//its a way to make sync our async operations

//the promise only can have only one call, is either resolve or reject, not twice.
const promise = new Promise((resolve, reject) => {
    //waits 5 seconds
    setTimeout(() => {
        resolve({
            name: 'MIguel',
            age: 32
        });
        //reject('error');
    }, 5000);
});

console.log('before');

//promise.then is called only when in the promise we call 'resolve'
//.catch  is called when  in the promise we call 'reject'
promise.then((data) => {
    console.log('1', data);

    return new Promise((resolve, reject) => {
        //waits 5 seconds
        setTimeout(() => {
            resolve('this is my other promise');
        }, 5000);
    });

}).then((str) => { //promises chaining!
    console.log('this will run?', str);
}).catch((error) => {
    console.log(error);
});

console.log('after');


// //called with another way -> not prefered
// promise.then((data) => {
//     console.log(data);
// }, (error) => {
//     console.log(error);
// });