import { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/client";
import { useSession, getSession, signOut } from "next-auth/client";
import classes from "./AuthForm.module.css";
import { useToast } from "@chakra-ui/react";
import { server } from "../../config";

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
const AuthForm = () => {
  const toast = useToast();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const userNameInputRef = useRef();

  const [isLogin, setIsLogin] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!isLogin) {
      const enteredUserName = userNameInputRef.current.value;
      const enteredFirstName = firstNameInputRef.current.value;
      const enteredLastName = lastNameInputRef.current.value;
    }

    if (enteredPassword.trim().length < 7) {
      toast({
        title: "invaild pasword.",
        description: "Password length needs to be longer than 7",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    // console.log(enteredEmail);
    // console.log("show password" + enteredPassword);
    // console.log(isLogin);

    // console.log(enteredEmail);
    if (isLogin) {
      // console.log("here");
      const result = signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      result.then((data) => {
        // console.log(data.error);
        if (data.error == "could not log you in") {
          toast({
            title: "Wrong Password",
            description: "Try again",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Logged in successfully",
            description: "transfering to the main page",
            status: "success",
            duration: 2000,
            isClosable: true,
          });

          delay(2000).then(() => (window.location.href = `${server}/ `));
        }
      });
    } else {
      // alert(enteredPassword);
      fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          userName: enteredUserName,
          firstName: enteredFirstName,
          lastName: enteredLastName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          switchAuthModeHandler();
        } else {
          return res.json().then((data) => {
            if (data.message == "user exists already") {
              toast({
                title: "user exists already.",
                description: "please change a different email",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
            }
          });
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="LastName">User Name</label>
            <input id="LastName" required ref={userNameInputRef} />
          </div>
        )}

        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="FirstName">First Name</label>
            <input id="FirstName" required ref={firstNameInputRef} />
          </div>
        )}

        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="LastName">Last Name</label>
            <input id="LastName" required ref={lastNameInputRef} />
          </div>
        )}

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
    </section>
  );
};

export default AuthForm;
