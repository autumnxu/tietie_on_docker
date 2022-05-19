import { Box, Container } from "@chakra-ui/react";
import CoursesList from "./course_list";
import { useState, useEffect } from "react";
import AddFeedbackDrawer from "../add_feedback_form/add_feedback_drawer";

// getUser();

import { Fragment } from "react";
function Courses(props) {
  const { courses } = props;

  return (
    <Fragment>
      <Container centerContent>
        <h1>Course Evaluations</h1>
        <AddFeedbackDrawer></AddFeedbackDrawer>
        <ul>{<CoursesList course={courses} />}</ul>
      </Container>
    </Fragment>
  );
}

export default Courses;
