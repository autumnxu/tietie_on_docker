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
import { getSession } from "next-auth/client";

import classes from "./add_feedback_form.module.css";

function AddCommentsFrom(props) {
  var { post_id } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();

  useEffect(() => {
    getSession().then((session) => {
      setLoadedSession(session);
      setIsLoading(false);
    });
  }, []);

  const commentsInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();
    const enteredCourseComment = commentsInputRef.current.value;
    var reqBody = {
      comment: enteredCourseComment,
      posterId: loadedSession.user.email,
      postId: post_id,
    };
    console.log(reqBody);
    fetch(`${server}/api/course/course_feedback_comments`, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    alert("comments added!");

    location.reload();
  }
  return (
    <Container>
      <form onSubmit={submitFormHandler} className={classes.actions}>
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

export default AddCommentsFrom;
