import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyAAwR783Nzbmxi8krnp3zdjUnoqvAlx6mI",
    authDomain: "banco-de-dados-e50d3.firebaseapp.com",
    databaseURL: "https://banco-de-dados-e50d3.firebaseio.com",
    projectId: "banco-de-dados-e50d3",
    storageBucket: "banco-de-dados-e50d3.appspot.com",
    messagingSenderId: "834370540971",
    appId: "1:834370540971:web:50a5f01ac1ccf2a6f02eee"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        //Referenciando a database para acessar em outros locais
        this.app = app.database()

        this.storage = app.storage()
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
        return app.auth().signOut()
    }

    async register(nome, email, password) {
        await app.auth().createUserWithEmailAndPassword(email, password)
        const uid = app.auth().currentUser.uid
        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve)
        })
    }

    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null
        }
        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
        .once('value').then(callback)
    }
}

    

export default new Firebase()