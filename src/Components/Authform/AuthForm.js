import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import classes from "./AuthForm.module.css";
import { authActions } from "../Store/Authreducer";


const AuthForm = () => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [resetMail, setresetMail] = useState('');
  const [isforgetform, setforgetform] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation
    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3voA8EkjYeR8xR8xnlrrUU5K-SeKDSqY";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3voA8EkjYeR8xR8xnlrrUU5K-SeKDSqY";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        dispatch(authActions.login({token:data.idToken, email:enteredEmail}))
       // authCntxt.login(data.idToken);
       dispatch() 
       console.log(data.idToken);
      })
      .catch((err) => {
        alert(err.message);
      });
    console.log("user login succesfully");
  };
  const ForgetformHandler=(e)=>{
    setforgetform((current) => !current);
  }
  async function PasswordResetmailHandler() {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD3voA8EkjYeR8xR8xnlrrUU5K-SeKDSqY",
      {
        method: "POST",
        body: JSON.stringify({
          requestType:"PASSWORD_RESET",
          email:resetMail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
   // const data = await response.json();

      console.log('kundan555');
  }
  const resetMailHandler =(e)=>{
    e.preventDefault();
    setresetMail(e.target.value)
    }










  return (
    <section className={classes.auth}>
      {!isforgetform && (<>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div >
          <button onClick={ForgetformHandler}>forget password</button>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
 </>)}
      {isforgetform &&(
        <div>
          <h4 className={classes.control}>Enter the mail which u have entered</h4>
          <div className={classes.control}>
          <label htmlFor="email">Registered Email</label>
          <input type="email" id="email" value={resetMail} onChange={resetMailHandler} required  />
        </div>
        <div className={classes.actions}>
          <button onClick={PasswordResetmailHandler}>send link</button>
          <button onClick={ForgetformHandler}>already a user Sign in</button>
        </div>
        </div>
      )}
    </section>
  );
};

export default AuthForm;