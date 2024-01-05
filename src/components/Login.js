import { useRef, useState } from 'react';
import Header from "./Header.js";
import { checkValidData } from "../utils/validate.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';

const Login = () => {
  const[isSignInForm, setIsSignInForm] = useState(true);
  const[errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const toggleSignInform = () => {
    setIsSignInForm(!isSignInForm);
  }

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              console.log("Updated auth:", auth);
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser([uid, email, displayName])
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " " + errorMessage);
      });
    }
  }

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img 
          className='bg-gradient-to-b from-black' 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/0e02f65b-1ff3-49ba-a033-e7fd8f851a38/GB-en-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
          alt="logo">
        </img>
      </div>
      <form 
        onSubmit={(e) => e.preventDefault()} 
        className='absolute my-24 p-12 bg-black w-3/12 mx-auto right-0 left-0 text-white bg-opacity-80'
      >
        <h1 className='text-white py-4 font-bold text-3xl'>
          {isSignInForm? "Sign In": "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input ref={name} type="text" placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 rounded-lg'/>
        )}
        <input 
          ref={email} 
          type="text" 
          placeholder='Email or phone number' 
          className='p-4 my-4 w-full bg-gray-700 rounded-lg'
        /> 
        <input 
          ref={password} 
          type='password' 
          placeholder='Password' 
          className='p-4 my-4 w-full bg-gray-700 rounded-lg'
        />
        <p className='text-red-800'>
          {errorMessage}
        </p>
        <button 
          className="p-4 my-6 bg-red-700 w-full rounded-lg" 
          onClick={handleButtonClick}
        >
          {isSignInForm? "Sign In": "Sign Up"}
        </button> 
        <p 
          className='hover:underline m-1 cursor-pointer inline' 
          onClick={toggleSignInform}
        >
          {isSignInForm? "New to Netflix? Sign up now": "Already registered. Sign In"}
        </p>
      </form>
    </div>
  )
}

export default Login