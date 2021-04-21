import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import './App.css';
import firebaseConfig from './firebase.config';
firebase.initializeApp(firebaseConfig);

function App() {
  const [user,setUser] = useState({
    isSignIn : false,
    name:'',
    email: '',
    photo:''
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn =()=>{
  firebase.auth().signInWithPopup(provider)
  .then(res =>{
    const {displayName,photoURL,email}= res.user;
    const signInUser = {
      isSignIn:true,
      name: displayName,
      email:email,
      photo:photoURL
    }
    setUser(signInUser);
    
  })
  .catch(err =>{
    console.log(err);
    console.log(err.message);
  })
  }
  const handleSignOut= ()=>{
    firebase.auth().signOut()
    .then(res =>{
const signOutUser = {
  isSignIn:false,
  name: '',
  photoURL: '',
  email : ''
}
setUser(signOutUser);
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message);
    })
    // console.log('signOut Clicked');
  }

  return (
    <div className="App">
      {
        user.isSignIn ? <button onClick={handleSignOut}>Sign Out</button>:<button onClick={handleSignIn}>Sign In</button>
        
        }
      {
        user.isSignIn && 
        <div>
          <p>  welcome , {user.name}</p>
          <p>Your Emai : {user.email}</p>
          <img src={user.photo}/>
          </div>
      }
    </div>
  );
}

export default App;
