import Auth from './auth.js';
import {Errors} from './authHelpers.js';
// const request1 = makeRequest('login', 'POST', {
//     password: 'user1',
//     email: 'user1@email.com'
// });
// const token = await request1.then()
// console.log(token)
const myErrors = new Errors('errors');
const auth = new Auth(myErrors)
document.getElementById('submit').addEventListener('click', () => auth.login());
// auth.getCurrentUser('user1@email.com');