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

  const handleChange= (e)=>{
    console.log(e.target.name,e.target.value);

  }

  const handleSubmit =()=>{

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
      <h1>Our Own Authentication</h1>
      <form onSubmit={handleSubmit}>
      <span>Your Email</span> :<input type="text" name="email" onBlur={handleChange} required placeholder="Enter Your email or phone"/><br/><br/>

      <span>Password</span>:<input type="password" onBlur={handleChange} required placeholder="{"name="password" id="" placeholder="Enter Your Password"/><br/><br/>
      <input type="submit" value="submit"/><br/><br/>
      </form>
      
    </div>
  );
}

export default App;
