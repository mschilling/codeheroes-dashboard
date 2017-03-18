import {AngularFireModule, AuthMethods} from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyA20YR_BvItuW0Xy2IXlEPTPjPjzTQrxrY",
    authDomain: "m4m-code-heroes.firebaseapp.com",
    databaseURL: "https://m4m-code-heroes.firebaseio.com",
    storageBucket: "m4m-code-heroes.appspot.com",
    messagingSenderId: "567701438863"
};

export const firebaseAuthConfig = {
  method: AuthMethods.Popup,
  remember: 'default'
};

export const FirebaseModule = AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);
