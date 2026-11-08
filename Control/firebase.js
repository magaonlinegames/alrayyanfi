var db;
$(document).ready(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyAvEzPCt_k2eRqI8QjjcWw5Xdu9nPOh4Yg",
        authDomain: "notbank-962c6.firebaseapp.com",
        projectId: "notbank-962c6",
        storageBucket: "notbank-962c6.firebasestorage.app",
        messagingSenderId: "422899230142",
        appId: "1:422899230142:web:7a6f8da4e66e77908445ef"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    db = firebase.firestore();
});