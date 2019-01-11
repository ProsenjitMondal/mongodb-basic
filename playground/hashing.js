// const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data, 'somesecret');
console.log(`Token: ${token}`);

var decoded = jwt.verify(token, 'somesecret');
console.log('Decoded', decoded);



// var message = 'I am user 3';
// var hash = SHA256(message);

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

    // // token.data.id = 5;
    // // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var hashResult = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(hashResult === token.hash) {
//     console.log('Data was not changed');
// }else{
//     console.log('Data was changed. Do not trust!');
// }