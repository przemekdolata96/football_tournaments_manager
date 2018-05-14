import * as firebase from 'firebase';

let config = {
    apiKey: 'AIzaSyDNab6T2t5XKikNqVYZ6greXA6fenyJvLw',
    authDomain: 'react-fire-f018d.firebaseapp.com',
    databaseURL: 'https://react-fire-f018d.firebaseio.com',
    projectId: 'react-fire-f018d',
    storageBucket: 'react-fire-f018d.appspot.com',
    messagingSenderId: '355267734364'
};

export const firebaseApp = firebase.initializeApp(config);
export const auth = firebase.auth;
export const provider = new firebase.auth.FacebookAuthProvider();
export const database = firebaseApp.database();