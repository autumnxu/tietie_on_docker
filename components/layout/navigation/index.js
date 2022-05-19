import { Fragment } from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Breadcrumb,
  Flex,
  Spacer,
  Button,
  Switch,
  IconButton,
  Progress,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  ChakraProvider,
} from "@chakra-ui/react";

import theme from "../../theme";
import Head from "next/head";
import { useSession, getSession, signOut } from "next-auth/client";
import { server } from "../../../config";
import { useState, useEffect } from "react";
import { getExp } from "../../../requests/course/course";
import Splash from "../../splash";

function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  const [display, changeDisplay] = useState("none");

  useEffect(() => {
    getSession().then((session) => {
      setLoadedSession(session);
      setIsLoading(false);
    });
  }, []);

  const [exp, setExp] = useState();

  useEffect(() => {
    const experience = getExp(loadedSession?.user.email);
    experience.then((data) => {
      if (data.user) {
        setExp(data.user.exp);
      }
    });
  }, [loadedSession?.user.email]);

  if (isLoading) {
    return <Progress size="xs" colorScheme="red" isIndeterminate />;
  }

  function logoutHandler() {
    signOut();
  }

  return (
    <Fragment>
      <Container maxW="10000ch" bg="red.600" color="white">
        <Flex display={["none", "none", "flex", "flex"]}>
          <Link href={`${server}/ `}>我在华大 @ I am in Washu</Link>
          <Spacer />
          <Link href={`${server}/ `}>Home</Link>
          <p> / </p>
          <Link href={`${server}/course_evaluation `}>Course Evaluations</Link>
          <p> / </p>
          <Link href={`${server}/course_evaluation2 `}>Course Evaluations2</Link>

          <Spacer />
          {!loadedSession && !isLoading && (
            <Link href={`${server}/log_sign_in `}>login</Link>
          )}
          {loadedSession && (
            <Menu>
              <MenuButton as={Button} colorScheme="red" size="s">
                exp:{exp} {loadedSession?.user.email}
              </MenuButton>
              <MenuList>
                <MenuItem color="black">
                  <Link href={`${server}/user_dashboard `}>My Account</Link>
                </MenuItem>
                {loadedSession && (
                  <MenuItem color="black" onClick={logoutHandler}>
                    Logout
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          )}
        </Flex>
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon color="red" />}
          display={["flex", "flex", "none", "none"]}
          onClick={() => changeDisplay("flex")}
        ></IconButton>
        <Flex
          w="100vw"
          bgColor="gray.50"
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
          display={display}
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Close Menu"
              size="lg"
              icon={<CloseIcon />}
              onClick={() => changeDisplay("none")}
            />
          </Flex>
          <Flex flexDir="column" align="center" color="black">
            <Link href={`${server}/ `}>
              <Button colorScheme="red" size="lg">
                Home
              </Button>
            </Link>

            <Link href={`${server}/course_evaluation `}>
              <Button colorScheme="red" size="lg" mt={2}>
                Course Evaluations
              </Button>
            </Link>
            <Spacer />
            <Link href={`${server}/resell `}>
              <Button colorScheme="red" size="lg" mt={2}>
                Resell
              </Button>
            </Link>
            <Spacer />
            {!loadedSession && !isLoading && (
              <Link href={`${server}/log_sign_in`}>
              <Button colorScheme="red" size="lg" mt={2}>
              login
              </Button>
            </Link>
            )}
            {loadedSession && (
              <Menu>
                <MenuButton as={Button} colorScheme="red" size="lg" mt={2}>
                  exp:{exp} {loadedSession?.user.email}
                </MenuButton>
                <MenuList>
                  <MenuItem color="black">
                    <Link href={`${server}/user_dashboard `}>My Account</Link>
                  </MenuItem>
                  {loadedSession && (
                    <MenuItem color="black" onClick={logoutHandler}>
                      Logout
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Container>
    </Fragment>
  );
}
export default Navigation;
