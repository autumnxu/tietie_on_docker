import { useRef, useState, useEffect } from "react";
import {
  Input,
  Stack,
  Container,
  Button,
  Textarea,
  useToast,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { server } from "../../config";
import { getSession, signOut } from "next-auth/client";
import classes from "./profile_form.module.css";
import { getExp } from "../../requests/course/course";

function ProfileFrom() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  useEffect(() => {
    getSession().then((session) => {
      setLoadedSession(session);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const experience = getExp(loadedSession?.user.email);
    experience.then((data) => {
      if (data.user) {
        setFirstName(data.user.firstName);
        setLastName(data.user.lastName);
      }
    });
  }, [loadedSession?.user.email]);

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    // const enteredEmail = emailInputRef.current.value;

    var reqBody = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      // email: enteredEmail,
    };
    console.log(reqBody);

    fetch(`${server}/api/users/${loadedSession?.user.email}`, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application.json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    signOut();
    // window.location.href = `${server}/log_sign_in`;

    alert("info changed please re-login");
  }
  return (
    <Container bg={"#F7FAFC"}>
      <form onSubmit={submitFormHandler} className={classes.actions}>
        <label htmlFor="title">First Name</label>
        <Input
          focusBorderColor="red.400"
          placeholder={firstName}
          id="email"
          ref={firstNameInputRef}
          required="required"
        />
        <br />
        <label htmlFor="last name">Last Name</label>
        <Input
          focusBorderColor="red.400"
          placeholder={lastName}
          id="last name"
          ref={lastNameInputRef}
          required="required"
        />
        <br />

        {/* <label htmlFor="email">Email Address</label>
        <Input
          focusBorderColor="red.400"
          value={loadedSession?.user.email}
          id="email"
          ref={emailInputRef}
          required="required"
        /> */}

        <button className={classes.toggle}>Update Profile</button>
      </form>
      <br></br>

      {/* <form onSubmit={submitFormHandler} className={classes.actions}>
        <label htmlFor="title">First Name</label>
        <Input
          focusBorderColor="red.400"
          placeholder="Ex: What a good course! CSE450"
          id="email"
          ref={titleInputRef}
          required="required"
        />
        <br />
        <label htmlFor="courseName">Last Name</label>
        <Input
          focusBorderColor="red.400"
          placeholder="CSE450 video game development"
          id="email"
          ref={courseNameInputRef}
        />
        <br />

        <label htmlFor="professor">Email Address</label>
        <Input
          focusBorderColor="red.400"
          placeholder="Prof Wang"
          id="email"
          ref={professorInputRef}
        />

        <button className={classes.toggle}>Update Profile</button>
      </form> */}
    </Container>
  );
}

export default ProfileFrom;
