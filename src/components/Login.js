import React, { useState } from 'react'
import Header from "./Header.js"
const Login = () => {
  const[isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInform = () => {
    setIsSignInForm(!isSignInForm);
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
      <form className='absolute my-24 p-12 bg-black w-3/12 mx-auto right-0 left-0 text-white bg-opacity-80'>
        <h1 className='text-white py-4 font-bold text-3xl'>
          {isSignInForm? "Sign In": "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input type="text" placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 rounded-lg'/>
        ) 
        }
        <input type="text" placeholder='Email or phone number' className='p-4 my-4 w-full bg-gray-700 rounded-lg'/> <br />
        <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-lg'/> <br />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg">Sign In</button> <br />
        <div className='flex'>
          <p className='inline'>{isSignInForm? "New to Netflix?": "Already registered."} 
            <p className='hover:underline m-1 cursor-pointer inline' onClick={toggleSignInform}>
              {isSignInForm? "Sign up now": "Sign In"}
            </p>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login