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

import { server } from "../../../config";
import { useSession, getSession } from "next-auth/client";

import classes from "./add_feedback_form.module.css";
import { Fragment } from "react";
function AddCourseFrom() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();

  useEffect(() => {
    getSession().then((session) => {
      setLoadedSession(session);
      setIsLoading(false);
    });
  }, []);

  const titleInputRef = useRef();
  const courseNameInputRef = useRef();
  const semesterInputRef = useRef();
  const professorInputRef = useRef();
  // const difficultyInputRef = useRef();
  const [workloadInput, setWorkload] = useState(0);
  const [difficultyInput, setDifficulty] = useState(0);
  const handleWorkLoadChange = (value) => {
    setWorkload(value);
  };
  const handleDifficultyChange = (value) => {
    setDifficulty(value);
  };

  const commentsInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredCourseName = courseNameInputRef.current.value;
    const enteredProfessor = professorInputRef.current.value;
    const enteredSemester = semesterInputRef.current.value;
    const enteredWorkload = workloadInput;
    const enteredDifficulty = difficultyInput;
    const enteredCourseComment = commentsInputRef.current.value;
    var reqBody = {
      title: enteredTitle,
      courseName: enteredCourseName,
      professor: enteredProfessor,
      semester: enteredSemester,
      workload: enteredWorkload,
      difficulty: enteredDifficulty,
      comment: enteredCourseComment,
      posterId: loadedSession.user.email,
    };
    fetch("/api/course/course_feedbacks", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application.json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    alert("course added!");
    window.location.href = `${server}/course_evaluation`;
  }
  return (
    <Container>
      <form onSubmit={submitFormHandler} className={classes.actions}>
        <label htmlFor="title">Post Title</label>
        <Input
          focusBorderColor="red.400"
          placeholder="Ex: What a good course! CSE450"
          id="email"
          ref={titleInputRef}
          required="required"
        />
        <br />
        <label htmlFor="courseName">Course Name</label>
        <Input
          focusBorderColor="red.400"
          placeholder="CSE450 video game development"
          id="email"
          ref={courseNameInputRef}
        />
        <br />

        <label htmlFor="professor">Professor</label>
        <Input
          focusBorderColor="red.400"
          placeholder="Prof Wang"
          id="email"
          ref={professorInputRef}
        />
        <br />

        <label htmlFor="semester">Semester-Year </label>
        <Input
          focusBorderColor="red.400"
          placeholder="fall-2022"
          id="email"
          ref={semesterInputRef}
        />
        <br />
        <label htmlFor="workload ">work load </label>
        <NumberInput
          defaultValue={0}
          min={0}
          max={5}
          clampValueOnBlur={false}
          onChange={handleWorkLoadChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <label htmlFor="difficulty">course difficulty </label>
        <NumberInput
          defaultValue={0}
          min={0}
          max={5}
          clampValueOnBlur={false}
          onChange={handleDifficultyChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <br />

        <label htmlFor="comments">Comment</label>
        <Textarea
          focusBorderColor="red.400"
          placeholder="Let us build amazing games"
          id="comments"
          ref={commentsInputRef}
        />
        <button className={classes.toggle}>post comment</button>
      </form>
    </Container>
  );
}

export default AddCourseFrom;
