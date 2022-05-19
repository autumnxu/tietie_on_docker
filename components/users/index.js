import {
  Flex,
  Spacer,
  Text,
  Center,
  Container,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import UserPosts from "./user_posts";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import { getCourses_poster } from "../../requests/course/course";
import { getExp } from "../../requests/course/course";
import { Fragment } from "react";
import Link from "next/link";
import { server } from "../../config";
function UserDisplay() {
  // currently database has user id, email, password
  // the database should have measured interactivity, username, profile picture, somehow link blocks of posts
  // some payment functionality
  // now add delete functionalities

  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  const [post, setpost] = useState();
  const [exp, setExp] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  useEffect(() => {
    getSession().then((session) => {
      setLoadedSession(session);

      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const poster = getCourses_poster(loadedSession?.user.email);
    poster.then((data) => {
      // console.log(data.courses);
      setpost(data.courses);
    });
  }, [loadedSession?.user.email]);

  useEffect(() => {
    const experience = getExp(loadedSession?.user.email);
    experience.then((data) => {
      if (data.user) {
        setExp(data.user.exp);
        setFirstName(data.user.firstName);
        setLastName(data.user.lastName);
      }
    });
  }, [loadedSession?.user.email]);

  return (
    <Container maxW="10000ch" bg="white" color="grey">
      <Flex color="black">
        <Container centerContent>
          <Text> </Text>
        </Container>

        <Spacer />
        <Container centerContent>
          <h1> Welcome Back!</h1>

          <Text>
            {firstName} {lastName}
          </Text>

          <Link href={`${server}/profile `}>
            <Button mt={2} mb={2}>
              {" "}
              Account Setting
            </Button>
          </Link>
          <ul>{<UserPosts posts={post} />} </ul>
        </Container>

        <Spacer />
        <Container centerContent></Container>
      </Flex>
    </Container>
  );
}

export default UserDisplay;
